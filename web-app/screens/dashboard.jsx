import { Panel } from 'primereact/panel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidePanelPage } from '../components/sidePanelPage';
import { Button } from 'primereact/button';
import { setFullGitProfileConfig } from '../src/db_operations';

export const Dashboard = () => {
    const dispatch = useDispatch();

    let { sshConfig, profiles } = useSelector(st => st.gitProfile);
    const [state, setState] = useState({
        showImport: false,
        newProfiles: []
    })

    useEffect(() => {
        let profilesFromConfig = Object.keys(sshConfig);
        let profilesLocalDB = profiles.map(c => c.gitUserName);
        let newProfiles = profilesFromConfig.filter(c => !profilesLocalDB.includes(c));
        if (newProfiles.length > 0) {
            setState(st => ({ ...st, showImport: true, newProfiles }))
        }
    }, [sshConfig]);

    const addProfileFromSSHConfig = () => {
        setFullGitProfileConfig(dispatch, state.newProfiles);
    }

    const allowImport = () => {
        if (state.showImport) {
            return <div>
                <h3>We found {state.newProfiles.length} SSH profile configured, but not locally mapped do you want to import in tool?</h3>
                <ul>
                    {state.newProfiles.map(p => <li key={p}>{p}</li>)}
                </ul>
                <Button onClick={addProfileFromSSHConfig}>Import</Button>
            </div>
        }
        return null;
    }
    return <>
        <SidePanelPage screenTitle="Dashboard">
            <div className="side-panel-center">
                <Panel header="Panel Heading">

                    <ul>
                        {profiles.map(p => <li key={p.gitUserName}>{p.gitUserName}</li>)}
                    </ul>
                    {allowImport()}
                </Panel>
            </div>
        </SidePanelPage>
    </>
}