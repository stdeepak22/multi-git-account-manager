import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sshKeysActions } from '../store/slices/sshKeySlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScreenTitle } from '../components/screenTitleFooter';
import { SidePanelPage } from '../components/sidePanelPage';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { ScreensMapping } from './screenConfig';
import { Button } from 'primereact/button';

export const AddedKeysList = () => {
    let { userList } = useSelector(st => st.sshKeys);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sshKeysActions.loadSavedKeys());
    }, []);

    const detailsButton = (user) => {
        return <Button icon='pi pi-chevron-right' size='small'
            onClick={() => dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.userDetails, extra: { user: user } }))}
        />
    }

    const getReadbleDate = useCallback(user => {
        const { AddedAt } = user; // this is ISO string;
        const dt = new Date(AddedAt);
        return `${dt.toLocaleTimeString()}, ${dt.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }, []);

    const openLink = useCallback(gitUserName => e => {
        e.preventDefault();
        window.electron.openLinkInBrowser(`https://github.com/${gitUserName}`);
    }, []);

    const githubLink = useCallback(user => {
        let { gitUserName } = user;
        return <a target='_parent' href='#' onClick={openLink(gitUserName)}>GitHub.com/{gitUserName}</a>
    }, [])
    return <>
        <SidePanelPage screenTitle="Following Keys are added">
            <DataTable value={userList} tableStyle={{ minWidth: '50rem' }}>
                <Column header="Git Name" field="gitUserName" ></Column>
                <Column header="GitHub Profile" body={githubLink} ></Column>
                <Column header="Added At" body={getReadbleDate}></Column>
                <Column header="..." body={detailsButton}></Column>
            </DataTable>

        </SidePanelPage>
    </>
}