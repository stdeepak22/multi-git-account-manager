import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { useDispatch, useSelector } from 'react-redux';
import { SidePanelPage } from '../../components/sidePanelPage';
import { globalStuffActions } from '../../store/slices/globalStuffSlice';
import { ScreensMapping } from '../screenConfig';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputPrependText } from '../../components/inputFieldPrependText';
import { Button } from 'primereact/button';
import { cloneGitRepo, openDirPath, openNewDirectorySelector, openExternalLink, showToast } from '../../src/non-component-sharing';
import { CloneQueryField } from './cloneQueryField';
import { Message } from 'primereact/message';
import { gitRepoCloned } from '../../src/db_operations';

const cloneResultMessages = {
    "SUCCESSFUL": "Repository has been cloned and configured 💕",
    "DENIED": "Can't reach to your github account. Have you configured the public key?",
    "NOT_FOUND": "This repository not found under selected account. Check if repository name is correct."
}

const initState = {
    selectedUser: undefined,
    targetDir: '',
    repoName: ''
}

export const GitClone = ({ gitUserName, addedAt }) => {
    const prependTextRef = useRef();
    const repoNameInputRef = useRef();
    let dispatch = useDispatch();
    let { names, profiles } = useSelector(st => st.gitProfile);
    let [canClone, setCanClone] = useState({
        cloning: false,
        canClone: false,
        cloneResult: undefined,
    });

    let [state, setState] = useState(initState);

    let goBackToDetails = useCallback(() => {
        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.accountDetails, extra: { gitUserName, addedAt } }))
    }, [gitUserName, addedAt]);

    const setSelection = e => {
        let { value } = e;
        setState(st => ({ ...st, selectedUser: value }));
    }

    const makeSelection = () => {
        if (gitUserName) {
            setState(st => ({ ...st, selectedUser: gitUserName }))
        }
    }

    useEffect(() => {
        makeSelection();
    }, [gitUserName, names]);

    useEffect(() => {
        state.repoName && setPadLef();
    }, [state.selectedUser])

    useEffect(() => {
        if (state.targetDir && state.repoName && state.selectedUser) {
            setCanClone(st => ({ ...st, canClone: true }))
        }
    }, [state.targetDir, state.repoName, state.selectedUser])

    const setPadLef = () => {
        repoNameInputRef.current.style.paddingLeft = `${prependTextRef.current.getBoundingClientRect().width + 40}px`;
    }

    const targetFolderSelection = () => {
        openNewDirectorySelector().then(res => {
            if (!res) {
                return;
            }
            let { selectedPath, error } = res;
            if (error) {
                let msg = error === 'PATH_NOT_FOUND'
                    ? "Selected dir not found. Have you selected right path?"
                    : error === "PATH_NON_EMPTY"
                        ? "Selected directory is not an empty directory, please select empty directory."
                        : "Something went wrong. Make sure you are selecting empty dir.";
                showToast({ severity: 'error', summary: 'Git Clone Path', detail: msg, life: 5000 })
            }
            else {
                setState(st => ({ ...st, targetDir: selectedPath }));
            }
        });
    }

    const setGitRepoName = e => {
        let { value } = e.target;
        setState(st => ({ ...st, repoName: value }));
    }

    const cloneRepo = async () => {
        setCanClone(st => ({ ...st, cloning: true, cloneResult: undefined }));
        cloneGitRepo(state.selectedUser, state.repoName, state.targetDir)
            .then(res => {
                setCanClone(st => ({ ...st, cloning: false, cloneResult: res }));
                if (res === "SUCCESSFUL") {
                    gitRepoCloned(dispatch, state.selectedUser, state.repoName, state.targetDir)
                    setState(initState);
                    setTimeout(makeSelection);
                }
            }).catch(ex => {
                console.error('clone error', ex);
            });
    }

    const profileLink = useCallback(name => {
        let u = profiles.find(c => c.gitUserName === name);
        return u.profileLink;
    }, [profiles]);

    return <>
        <SidePanelPage screenTitle="Git Clone Screen" showBack={gitUserName && addedAt} onHeaderBackClick={goBackToDetails}>
            <div className="side-panel-center">
                <Panel header="Clone the repository for selected account">
                    <div className='flex flex-column gap-4'>
                        <div className='flex flex-column justify-content-between gap-4'>
                            <div className='flex align-items-center flex-1'>
                                <label className='w-10rem'>Git User Profile</label>
                                <Dropdown value={state.selectedUser}
                                    onChange={setSelection}
                                    options={names}
                                    placeholder="Select Profile"
                                    className='w-15rem mr-4'
                                />
                                {state.selectedUser && <Button icon='pi pi-arrow-up-right' link
                                    title='Open profile in browser'
                                    severity='secondary' iconPos='right' label='Open Profile'
                                    onClick={() => openExternalLink(profileLink(state.selectedUser))}></Button>
                                }
                            </div>
                            <div className='flex align-items-center flex-1'>
                                <label className='w-10rem'>Location</label>
                                <Button
                                    outlined
                                    onClick={targetFolderSelection}
                                    icon="pi pi-folder text-primary"
                                    label='Choose directory...'
                                    className='w-15rem border-400 text-700 focus:border-primary mr-4'
                                />
                                {state.targetDir && <Button icon='pi pi-folder-open' link
                                    pt={{ label: { style: { overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'nowrap' } } }}
                                    title='Open path' style={{ maxWidth: `calc(100% - 25rem - 2.5rem)` }}
                                    severity='secondary' iconPos='right' label={`${state.targetDir}`}
                                    onClick={() => openDirPath(state.targetDir)}></Button>
                                }
                            </div>
                        </div>
                        <div className="flex align-items-center">
                            <label className='w-10rem'>Repository name  </label>
                            <span className="p-input-icon-left flex-1">
                                <i className="pi pi-github text-primary" />
                                <InputPrependText color="var(--primary-color)" ref={prependTextRef}>https://github.com/{state.selectedUser || '________'}/</InputPrependText>
                                <InputText disabled={!state.selectedUser} value={state.repoName} ref={repoNameInputRef} onChange={setGitRepoName} onFocus={setPadLef} className='w-full' />
                            </span>
                        </div>
                        <div className='flex align-items-center'>
                            <label className='w-10rem'>Query</label>
                            <CloneQueryField
                                gitUserName={state.selectedUser}
                                repoName={state.repoName}
                                targetDir={state.targetDir}
                            />
                        </div>
                        <div className='flex align-items-center'>
                            <label className='w-10rem'></label>
                            <Button
                                disabled={!canClone.canClone}
                                className='w-8rem mr-4'
                                onClick={cloneRepo}
                                icon={canClone.cloning ? 'pi pi-spin pi-spinner' : 'pi pi-cloud-download'}
                                iconPos='right'
                                label={canClone.cloning ? 'Cloning...' : 'Clone'} />
                        </div>
                        {canClone.cloneResult !== undefined && <Message
                            severity={canClone.cloneResult === "SUCCESSFUL" ? "success" : "error"}
                            text={cloneResultMessages[canClone.cloneResult]} />}
                    </div>
                </Panel>
            </div>
        </SidePanelPage>
    </>
}