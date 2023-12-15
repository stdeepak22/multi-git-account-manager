import React, { useCallback } from 'react';
import { Panel } from 'primereact/panel';
import { useDispatch } from 'react-redux';
import { SidePanelPage } from '../components/sidePanelPage';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { ScreensMapping } from './screenConfig';

export const GitClone = ({ gitUserName, addedAt }) => {
    let dispatch = useDispatch();
    let goBackToDetails = useCallback(() => {
        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.accountDetails, extra: { gitUserName, addedAt } }))
    }, [gitUserName, addedAt]);

    return <>
        <SidePanelPage screenTitle="Git Clone Screen" showBack={gitUserName && addedAt} onHeaderBackClick={goBackToDetails}>
            <Panel header="Panel Heading">
                <p>
                    Need git clone logic for <i>{gitUserName}</i>
                </p>
            </Panel>
        </SidePanelPage>
    </>
}