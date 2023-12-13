import { Button } from "primereact/button"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showToast, verifySSHAccess } from "../../../src/non-component-sharing";
import { Panel } from "primereact/panel";
import { addGitAccountActions } from "../../../store/slices/addGitAccountSlice";

export const Section_TestAndComplete = () => {
    const dispatch = useDispatch();
    let { name } = useSelector(st => st.addGitAccount);
    let [gitCon, setGitCon] = useState({
        canConnect: undefined,
        processing: false
    });
    const verifyAccess = () => {
        setGitCon(st => ({ ...st, processing: true }));
        verifySSHAccess(name).then(canConnect => {
            setGitCon(st => ({ ...st, processing: false, canConnect }));
            showToast({
                summary: 'Git Access',
                severity: canConnect ? 'success' : 'error',
                detail: `SSH Keys are ${canConnect ? '' : 'not '}configured correctly, and ${canConnect ? 'can' : 'can\'t'} access git.`,
                life: 5000,
            })
            dispatch(addGitAccountActions.markGitConnectionTested(canConnect));
        }).catch(() => {
            setGitCon(st => ({ ...st, processing: false, canConnect: false }));
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
    return <div className='flex justify-content-center flex-grow-1 fadein animation-fill-forwards animation-duration-500'
        style={{ opacity: 0 }}>
        <div className="w-9">
            <Panel header="Whats this all about?">
                <div>
                    So if you have configured the git as suggested in previous steps, now locally created keys will have access to your git repositories.
                    We will validate that now, and then you are done with SSH Key setup.<br /><br />
                    Next, whenever you want to clone any git from your account first time, you need to do it using
                    this <i className="text-primary">{appConstants.appName}</i> (<span className="font-semibold" data-custom-tooltip="It will configure the right 'git remote origin' for your local cloned repository using the correct SSH Key, you do not have to do anything for this.">🤔Why?</span>),
                    thats it. Later you can use any tool of your choice for regular git operation.<br /><br />
                    <i className="text-primary"><span className="font-semibold">Remember:</span> Your private key is still in your local system, and doesn't need to be give to anyone.</i>
                </div>
            </Panel>

            <Panel header="Verify Access" className="mt-4">
                <div className="flex align-items-center">
                    <div className="flex-1">
                        Check access
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
            </Panel>
        </div>
    </div>
}