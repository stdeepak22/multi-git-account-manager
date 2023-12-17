import React, { useCallback, useRef } from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { globalStuffActions } from '../../store/slices/globalStuffSlice';
import { useDispatch } from 'react-redux';
import { ScreensMapping } from '../screenConfig';
import { isoStringToReadable } from '../../src/non-component-sharing';
import { SidePanelPage } from '../../components/sidePanelPage';
import { InputText } from 'primereact/inputtext';
import { GitProfilePanel } from './gitProfilePanel';
import { DeleteConfirmationDialog } from './deleteConfirmationDialog';
import { RepoTable } from './repoTable';

export const AccountDetails = ({ gitUserName, addedAt }) => {
    const dispatch = useDispatch();
    const confirmRef = useRef();

    const goBackToList = useCallback(() => {
        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.addedKeys, extra: {} }))
    }, [dispatch])

    const openGitCloneScreen = useCallback(() => {
        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.gitClone, extra: { gitUserName, addedAt } }));
    }, [dispatch, gitUserName]);


    return <SidePanelPage screenTitle="User Details" showBack onHeaderBackClick={goBackToList}>
        <DeleteConfirmationDialog gitUserName={gitUserName} ref={confirmRef} />
        <div className="side-panel-center">
            <Panel header="SSH Key Details">
                <div className='flex justify-content-between gap-3 mb-4'>
                    <div className='flex flex-column gap-2 flex-1'>
                        <label>Github Name</label>
                        <div className='p-input-icon-left'>
                            <i className='pi pi-github' />
                            <InputText className='w-full max-w-20rem' readOnly value={gitUserName} />
                        </div>
                    </div>
                    <div className='flex flex-column gap-2 flex-1'>
                        <label>Added At</label>
                        <div className='p-input-icon-left'>
                            <i className='pi pi-calendar' />
                            <InputText className='w-full max-w-20rem' readOnly value={isoStringToReadable(addedAt)} />
                        </div>
                    </div>
                </div>
                <GitProfilePanel gitUserName={gitUserName} />
                <div className='flex align-items-center justify-content-between mb-4'>
                    <div>
                        <Button icon='pi pi-clone' severity="info" label='Git Clone' title='Git Repository Clone' onClick={openGitCloneScreen} />
                    </div>
                    <Button icon='pi pi-trash' severity="danger" label='Delete' title='Delete' onClick={() => confirmRef.current.showConfirmDialog()} />
                </div>
                <RepoTable gitUserName={gitUserName} />
            </Panel>
        </div>
    </SidePanelPage>
}