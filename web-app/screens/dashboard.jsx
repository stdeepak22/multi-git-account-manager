import { Panel } from 'primereact/panel';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sshKeysActions } from '../store/slices/sshKeySlice';
import { SidePanelPage } from '../components/sidePanelPage';

export const Dashboard = () => {
    const dispatch = useDispatch();
    let { userList } = useSelector(st => st.sshKeys);
    useEffect(() => {
        dispatch(sshKeysActions.loadSavedKeys());
    }, []);
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