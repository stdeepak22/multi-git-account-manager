import { Panel } from 'primereact/panel';
import React from 'react';
import { useSelector } from 'react-redux';
import { SidePanelPage } from '../components/sidePanelPage';

export const Dashboard = () => {
    let { userList } = useSelector(st => st.sshKeys);
    return <>
        <SidePanelPage screenTitle="Dashboard">
            <Panel header="Panel Heading">
                <p>
                    We have {userList.length} keys configured.
                </p>
            </Panel>
        </SidePanelPage>
    </>
}