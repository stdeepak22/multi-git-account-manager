import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SidePanelPage } from '../components/sidePanelPage';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { ScreensMapping } from './screenConfig';
import { Button } from 'primereact/button';
import { isoStringToReadable, openExternalLink } from '../src/non-component-sharing';
import { Panel } from 'primereact/panel';
import { gitProfileActions } from '../store/slices/gitProfileSlice';

export const AddedKeysList = () => {
    let { profiles } = useSelector(st => st.gitProfile);
    const dispatch = useDispatch();

    const detailsButton = (user) => {
        let { gitUserName, addedAt } = user;
        return <Button icon='pi pi-chevron-right' outlined rounded size='small'
            title='Detail page'
            onClick={() => dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.accountDetails, extra: { gitUserName, addedAt } }))}
        />
    }

    const getReadbleDate = useCallback(user => {
        const { addedAt } = user; // this is ISO string;
        return isoStringToReadable(addedAt);
    }, []);

    const githubLink = useCallback(user => {
        let { gitUserName, profileLink } = user;
        return <a title='open profile in browser' href='#' onClick={() => openExternalLink(profileLink)}>{gitUserName}</a>
    }, [])

    const connectionTested = useCallback(user => {
        let { connectionTested } = user;
        return connectionTested ? 'Yes' : 'No'
    }, [])


    useEffect(() => {
        dispatch(gitProfileActions.loadProfileAndSSHConfig());
    }, []);

    return <>
        <SidePanelPage screenTitle="Following Keys are added">
            <div className="side-panel-center">
                <Panel header='Added Git Account'>
                    <DataTable value={profiles}>
                        <Column header="Git Profile" body={githubLink} ></Column>
                        <Column header="Added At" body={getReadbleDate}></Column>
                        <Column header="Connection Tested" body={connectionTested}></Column>
                        <Column header='' body={detailsButton}></Column>
                    </DataTable>
                </Panel>
            </div>
        </SidePanelPage>
    </>
}