import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sshKeysActions } from '../store/slices/sshKeySlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SidePanelPage } from '../components/sidePanelPage';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { ScreensMapping } from './screenConfig';
import { Button } from 'primereact/button';
import { openExternalLink } from '../src/non-component-sharing';

export const AddedKeysList = () => {
    let { userList } = useSelector(st => st.sshKeys);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sshKeysActions.loadSavedKeys());
    }, []);

    const detailsButton = (user) => {
        let { gitUserName } = user;
        return <Button icon='pi pi-chevron-right' outlined rounded size='small'
            title='Detail page'
            onClick={() => dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.userDetails, extra: { gitUserName } }))}
        />
    }

    const getReadbleDate = useCallback(user => {
        const { AddedAt } = user; // this is ISO string;
        const dt = new Date(AddedAt);
        return `${dt.toLocaleTimeString()}, ${dt.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }, []);

    const githubLink = useCallback(user => {
        let { gitUserName } = user;
        return <a title='open profile in browser' target='_parent' href='#' onClick={() => openExternalLink(`https://github.com/${gitUserName}`)}>Github.com/{gitUserName}</a>
    }, [])

    return <>
        <SidePanelPage screenTitle="Following Keys are added">
            <DataTable value={userList} tableStyle={{ minWidth: '50rem' }}>
                <Column header="Git Name" field="gitUserName" ></Column>
                <Column header="Github Profile" body={githubLink} ></Column>
                <Column header="Added At" body={getReadbleDate}></Column>
                <Column header='' body={detailsButton}></Column>
            </DataTable>

        </SidePanelPage>
    </>
}