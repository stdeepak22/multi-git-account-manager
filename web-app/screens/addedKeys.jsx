import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sshKeysActions } from '../store/slices/sshKeySlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SidePanelPage } from '../components/sidePanelPage';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { ScreensMapping } from './screenConfig';
import { Button } from 'primereact/button';
import { isoStringToReadable, openExternalLink } from '../src/non-component-sharing';
import { Panel } from 'primereact/panel';

export const AddedKeysList = () => {
    let { userList } = useSelector(st => st.sshKeys);
    const dispatch = useDispatch();

    const detailsButton = (user) => {
        let { gitUserName, AddedAt: addedAt } = user;
        return <Button icon='pi pi-chevron-right' outlined rounded size='small'
            title='Detail page'
            onClick={() => dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.accountDetails, extra: { gitUserName, addedAt } }))}
        />
    }

    const getReadbleDate = useCallback(user => {
        const { AddedAt } = user; // this is ISO string;
        return isoStringToReadable(AddedAt);
    }, []);

    const githubLink = useCallback(user => {
        let { gitUserName } = user;
        return <a title='open profile in browser' href='#' onClick={() => openExternalLink(`https://github.com/${gitUserName}`)}>Github.com/{gitUserName}</a>
    }, [])

    return <>
        <SidePanelPage screenTitle="Following Keys are added">
            <div className="side-panel-center">
                <Panel header='Added Git Account'>
                    <DataTable value={userList}>
                        <Column header="Git Name" field="gitUserName" ></Column>
                        <Column header="Github Profile" body={githubLink} ></Column>
                        <Column header="Added At" body={getReadbleDate}></Column>
                        <Column header='' body={detailsButton}></Column>
                    </DataTable>
                </Panel>
            </div>
        </SidePanelPage>
    </>
}