import { Panel } from 'primereact/panel';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidePanelPage } from '../components/sidePanelPage';
import { openDirPath, openExternalLink, openGitDirectorySelector, showToast } from '../src/non-component-sharing';
import { Button } from 'primereact/button';
import { gitRepoCloned } from '../src/db_operations';
import { InputText } from 'primereact/inputtext';


const initState = {
    selectedUser: '',
    targetDir: '',
    repoName: undefined
}

export const GitImportExisting = () => {

    let dispatch = useDispatch();
    let [state, setState] = useState(initState);
    let { names, profiles } = useSelector(st => st.gitProfile);

    const targetFolderSelection = () => {
        openGitDirectorySelector().then(res => {
            if (!res) {
                return;
            }
            let { selectedPath, error, extra: { remote_url } } = res;
            if (error) {
                let msg = error === 'PATH_NOT_FOUND'
                    ? "Selected dir not found. Have you selected right path?"
                    : error === "NOT_A_GIT_DIR"
                        ? "Selected directory is not a git repository, please select local git repository."
                        : "Something went wrong. Make sure you are selecting local git repository.";
                showToast({ severity: 'error', summary: 'Local Git Repository', detail: msg, life: 5000 })
            }
            else {
                let idxOfDot = remote_url.indexOf(".");
                const lenOfGit = `git.`.length; //starting part of remote url        
                let name = remote_url.substr(lenOfGit, idxOfDot - lenOfGit);
                let repoName = undefined;
                if (idxOfDot === remote_url.indexOf(`.github.com:${name}/`)) {
                    let idxOfSlash = remote_url.lastIndexOf('/');
                    repoName = remote_url.substr(idxOfSlash + 1);
                    showToast({ severity: 'success', summary: 'User Found', detail: `This repository seems to be configured for user - ${name}`, life: 5000 })
                } else {
                    name = undefined;
                }
                console.log(`names`, names);
                name = names.includes(name) ? name : undefined;
                setState(st => ({ ...st, targetDir: selectedPath, selectedUser: name, repoName }));
            }
        });
    }

    const setSelection = e => {
        let { value } = e;
        setState(st => ({ ...st, selectedUser: value }));
    }

    const profileLink = useCallback(name => {
        let u = profiles.find(c => c.gitUserName === name);
        return u.profileLink;
    }, [profiles]);

    const addEntry = () => {
        gitRepoCloned(dispatch, state.selectedUser, state.repoName, state.targetDir)
    }

    return <>
        <SidePanelPage screenTitle="Dashboard">
            <div className="side-panel-center">
                <Panel header="Panel Heading">
                    <div className='flex flex-column gap-4'>
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

                        <div className='flex align-items-center flex-1'>
                            <label className='w-10rem'>Git User Profile</label>
                            <InputText value={state.selectedUser}
                                readOnly
                                placeholder="Git Profile"
                                className='w-15rem mr-4'
                            />
                            {state.selectedUser && <Button icon='pi pi-arrow-up-right' link
                                title='Open profile in browser'
                                severity='secondary' iconPos='right' label='Open Profile'
                                onClick={() => openExternalLink(profileLink(state.selectedUser))}></Button>
                            }
                        </div>

                        <div className='flex align-items-center'>
                            <label className='w-10rem'></label>
                            <Button
                                disabled={!(state.targetDir && state.selectedUser)}
                                className='w-10rem mr-4'
                                onClick={addEntry}
                                icon={'pi pi-check'}
                                iconPos='right'
                                label='Import Entry' />
                        </div>
                    </div>
                </Panel>
            </div>
        </SidePanelPage>
    </>
}