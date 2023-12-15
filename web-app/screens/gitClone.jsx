import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { useDispatch, useSelector } from 'react-redux';
import { SidePanelPage } from '../components/sidePanelPage';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { ScreensMapping } from './screenConfig';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputPrependText } from '../components/inputFieldPrependText';
import { Button } from 'primereact/button';
import { cloneGitRepo, openDirectorySelector, showToast } from '../src/non-component-sharing';


export const GitClone = ({ gitUserName, addedAt }) => {
    const prependTextRef = useRef();
    let dispatch = useDispatch();
    let { userList } = useSelector(st => st.sshKeys);
    let [canClone, setCanClone] = useState({
        cloning: false,
        canClone: false
    });

    let [state, setState] = useState({
        selectedUser: undefined,
        targetDir: '',
        repoName: ''
    });

    let goBackToDetails = useCallback(() => {
        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.accountDetails, extra: { gitUserName, addedAt } }))
    }, [gitUserName, addedAt]);

    const setSelection = e => {
        let { value } = e;
        setState(st => ({ ...st, selectedUser: value }));
    }

    useEffect(() => {
        if (gitUserName) {
            let u = userList.find(c => c.gitUserName === gitUserName);
            if (u) {
                setState(st => ({ ...st, selectedUser: u }))
            }
        }
    }, [gitUserName, userList]);

    useEffect(() => {
        if (state.targetDir && state.repoName && state.selectedUser) {
            setCanClone(st => ({ ...st, canClone: true }))
        }
    }, [state.targetDir, state.repoName, state.selectedUser])

    const setPadLef = (e) => {
        e.target.style.paddingLeft = `${prependTextRef.current.getBoundingClientRect().width + 40}px`;
    }

    const targetFolderSelection = () => {
        openDirectorySelector().then(res => {
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
                showToast({ severity: 'error', summary: 'Key Generated', detail: msg, life: 5000 })
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
        setCanClone(st => ({ ...st, cloning: true }));
        await cloneGitRepo(state.selectedUser.gitUserName, state.repoName, state.targetDir);
        setCanClone(st => ({ ...st, cloning: false }));
    }

    return <>
        <SidePanelPage screenTitle="Git Clone Screen" showBack={gitUserName && addedAt} onHeaderBackClick={goBackToDetails}>
            <div className="side-panel-center">
                <Panel header="Panel Heading">
                    <div className='flex gap-2'>
                        <div className='flex flex-column gap-2 w-15rem'>
                            <label>Location</label>
                            <Button
                                outlined
                                onClick={targetFolderSelection}
                                icon="pi pi-folder"
                                label='Choose directory...'
                                className='w-full border-400 text-700 focus:border-primary'
                            />
                        </div>
                        <div className='flex flex-column gap-2 w-15rem'>
                            <label>Git User Profile</label>
                            <div className='flex p-input-icon-left'>
                                <i className='pi pi-github' />
                                <Dropdown value={state.selectedUser}
                                    onChange={setSelection}
                                    options={userList}
                                    optionLabel="gitUserName"
                                    placeholder="Select Profile"
                                    className='w-full'
                                />
                            </div>
                        </div>
                        {state.selectedUser && <div className="flex flex-column gap-2 flex-1">
                            <label htmlFor="username">Just the repository name  </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-github text-primary" />
                                <InputPrependText color="var(--primary-color)" ref={prependTextRef}>https://github.com/{state.selectedUser?.gitUserName}/</InputPrependText>
                                <InputText id="repoName" onChange={setGitRepoName} onFocus={setPadLef} className='w-full' />
                            </span>
                        </div>}
                    </div>
                    <div className='flex align-items-center justify-content-between gap-4 mt-4'>
                        <div className='flex flex-column gap-2'>
                            <label>Query</label>
                            <label>
                                git clone {`"https://github.com/${state.selectedUser?.gitUserName || '...'}/${state.repoName || '...'}"`} "{state.targetDir || '...'}"
                            </label>
                        </div>
                        <Button
                            disabled={!canClone.canClone}
                            className='w-8rem'
                            onClick={cloneRepo}
                            icon={canClone.cloning ? 'pi pi-spin pi-spinner' : 'pi pi-cloud-download'}
                            label={canClone.cloning ? 'Cloning...' : 'Clone'} />
                    </div>
                </Panel>
            </div>
        </SidePanelPage>
    </>
}