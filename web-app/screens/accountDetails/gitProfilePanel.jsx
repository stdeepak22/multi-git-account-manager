import { Button } from "primereact/button"
import { Panel } from "primereact/panel"
import React, { useEffect, useState } from "react"
import { ShowPublicKeyDialog, ShowSshConfigureVideoDialog } from "../../components/commonDialogComp";
import { copyToClip, getPublicKey, openExternalLink, showToast, verifySSHAccess } from "../../src/non-component-sharing";
import { addGitAccountActions } from "../../store/slices/addGitAccountSlice";
import { useDispatch } from "react-redux";
import { gitConnectedTested } from "../../src/db_operations";


export const GitProfilePanel = ({ gitUserName }) => {

    const [gitCon, setGitCon] = useState({
        canConnect: undefined,
        processing: false,
        pubKey: ''
    });

    const dispatch = useDispatch();

    const [dialogShow, setDialogShow] = useState({
        video: false,
        publicKey: false,
    });
    const copyPubKeyToClip = () => {
        copyToClip(gitCon.pubKey).then(() => {
            showToast({ severity: 'info', summary: 'Copy', detail: `Public key copied to clip!`, life: 3000 })
        });
    }

    const getAccessButtonIcon = () => {
        let icon = [`pi`];
        switch (gitCon.canConnect) {
            case undefined:
                icon.push(gitCon.processing ? 'pi-spinner pi-spin text-primary' : 'pi-refresh');
                break;
            case true:
                icon.push('pi-check text-green-400');
                break;
            case false:
                icon.push('pi-times text-red-400');
                break;
        }
        return icon.join(' ');
    }


    const toggleVideoDialog = () => {
        setDialogShow(st => ({ ...st, video: !st.video }));
    }

    const togglePublicKeyDialog = () => {
        setDialogShow(st => ({ ...st, publicKey: !st.publicKey }));
    }

    const verifyAccess = () => {
        setGitCon(st => ({ ...st, processing: true, canConnect: undefined }));
        verifySSHAccess(gitUserName).then(canConnect => {
            setGitCon(st => ({ ...st, processing: false, canConnect }));
            const hideTime = 5000;
            showToast({
                summary: 'Git Access',
                severity: canConnect ? 'success' : 'error',
                detail: `SSH Keys are ${canConnect ? '' : 'not '}configured correctly, and ${canConnect ? 'can' : 'can\'t'} access git.`,
                life: hideTime,
            })

            gitConnectedTested(gitUserName, canConnect);
            dispatch(addGitAccountActions.markGitConnectionTested(canConnect));

            !canConnect && setTimeout(() => {
                setGitCon(st => ({ ...st, processing: false, canConnect: undefined }));
            }, hideTime);
        })
    }

    useEffect(() => {
        getPublicKey(gitUserName).then(key => {
            setGitCon(st => ({ ...st, pubKey: key }));
        })
    }, []);


    return <>
        {dialogShow.video && <ShowSshConfigureVideoDialog onClose={toggleVideoDialog} />}
        {dialogShow.publicKey && <ShowPublicKeyDialog pubKey={gitCon.pubKey} onClose={togglePublicKeyDialog} onCopy={copyPubKeyToClip} />}
        <Panel header="Git Profile" className='mb-4' toggleable collapseIcon='pi pi-chevron-up' expandIcon='pi pi-chevron-down'>
            <div className='flex gap-3 justify-content-between'>
                <div className='flex flex-column gap-2 flex-1 max-w-12rem'>
                    <label>Profile Link</label>
                    <Button icon='pi pi-arrow-up-right' outlined severity='secondary' iconPos='right' label='Open' onClick={() => openExternalLink(`https://github.com/${gitUserName}`)}></Button>
                </div>
                <div className='flex flex-column gap-2 flex-1 max-w-12rem'>
                    <div className='flex align-items-center'>
                        <label>Has Git Access?</label>
                        <i className='pi pi-info-circle ml-2 cursor-pointer text-green-400'
                            title='See how to setup git access'
                            onClick={toggleVideoDialog}
                        />
                    </div>
                    <Button
                        severity={gitCon.canConnect === undefined ? `secondary` : gitCon.canConnect ? 'success' : 'danger'}
                        onClick={verifyAccess}
                        outlined
                        label={gitCon.canConnect === undefined ? (gitCon.processing ? 'Checking...' : 'Check') : gitCon.canConnect ? 'Has Access' : 'No Access'}
                        icon={getAccessButtonIcon()}
                        iconPos='right'
                    />
                </div>
                <div className='flex flex-column justify-content-end flex-1 max-w-12rem'>
                    <Button outlined severity='secondary' label='Copy Public Key' icon="pi pi-copy" onClick={copyPubKeyToClip} />
                </div>
                <div className='flex flex-column justify-content-end flex-1 max-w-12rem'>
                    <Button outlined severity='secondary' label='Show Public Key' icon="pi pi-book" onClick={togglePublicKeyDialog} />
                </div>
            </div>
        </Panel>
    </>
}