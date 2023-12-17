import { Panel } from 'primereact/panel';
import React from 'react';
import { useSelector } from 'react-redux';
import { SidePanelPage } from '../components/sidePanelPage';

export const Dashboard = () => {
    let { sshConfig } = useSelector(st => st.gitProfile);
    return <>
        <SidePanelPage screenTitle="Dashboard">
            <div className="side-panel-center">
                <Panel header="Panel Heading">
                    <pre>
                        {JSON.stringify(sshConfig, null, "  ")}
                    </pre>
                </Panel>
            </div>
        </SidePanelPage>
    </>
}