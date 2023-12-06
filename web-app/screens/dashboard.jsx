import { Panel } from 'primereact/panel';
import React from 'react';
import { SidePanelPage } from '../components/sidePanelPage';

export const Dashboard = () => {
    return <>
        <SidePanelPage screenTitle="Dashboard">
            <Panel header="Panel Heading">
                <p>
                    We will have data here.
                </p>
            </Panel>
        </SidePanelPage>
    </>
}