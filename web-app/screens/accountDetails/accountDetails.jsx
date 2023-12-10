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


    return <SidePanelPage screenTitle="User Details" onHeaderBackClick={goBackToList}>
        <DeleteConfirmationDialog gitUserName={gitUserName} ref={confirmRef} />
        <Panel header="SSH Key Details">
            <div className='flex gap-3 mb-4'>
                <div className='flex flex-column gap-2 flex-1'>
                    <label>Github Name</label>
                    <InputText readOnly value={gitUserName} />
                </div>
                <div className='flex flex-column gap-2 flex-1'>
                    <label>Added At</label>
                    <InputText readOnly value={isoStringToReadable(addedAt)} />
                </div>
            </div>
            <GitProfilePanel gitUserName={gitUserName} />
            <div className='flex align-items-center justify-content-end'>
                <Button icon='pi pi-trash' severity="danger" label='Delete' title='Delete' onClick={() => confirmRef.current.showConfirmDialog()} />
            </div>
        </Panel>
        <RepoTable />
    </SidePanelPage>
}