import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Panel } from 'primereact/panel';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { useDispatch } from 'react-redux';
import { ScreensMapping } from './screenConfig';
import { showToast } from '../src/non-component-sharing';

export const UserDetails = ({ gitUserName }) => {
    const [pubKey, setPubKey] = useState('');
    const dispatch = useDispatch();
    const deleteAcc = () => {
        electron.remove_sshkey(gitUserName).then(() => {
            dispatch(globalStuffActions.setScreen({
                screen: ScreensMapping.addedKeys,
                extra: {}
            }))
        });
    }

    const askConfirmation = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: deleteAcc,
        });
    };

    useEffect(() => {
        electron.readPublibKey(gitUserName).then(key => {
            setPubKey(key);
        })
    }, []);

    const copyToClip = () => {
        navigator.clipboard.writeText(pubKey).then(() => {
            showToast({ severity: 'info', summary: 'Copy', detail: `Public key copied to clip!`, life: 3000 })
        });
    }

    return <><h1>💖 User Details!</h1>
        <ConfirmDialog />
        <Panel
            header="Panel Heading"
            icons={<Button icon='pi pi-trash' severity="danger" label='Delete' title='Delete' onClick={askConfirmation} />}>

            <h3>Git Name: {gitUserName}</h3>
            <Panel header="Public key"
                icons={<Button icon='pi pi-copy' severity="success" title='Copy Key' onClick={copyToClip} />}
                style={{ overflowWrap: 'break-word' }}
            >
                <p>{pubKey}</p>
            </Panel>
        </Panel>
    </>
}