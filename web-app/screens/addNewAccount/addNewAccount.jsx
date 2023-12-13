import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { Steps } from 'primereact/steps';
import { SidePanelPage } from '../../components/sidePanelPage';
import { Section_SSH } from './sections/section_ssh';
import { Section_GenKey } from './sections/section_gen_key';
import { addGitAccountActions } from '../../store/slices/addGitAccountSlice';
import { Section_ConfigGit } from './sections/section_configGit';
import { Section_TestAndComplete } from './sections/section_testComplete';
import { globalStuffActions } from '../../store/slices/globalStuffSlice';
import { ScreensMapping } from '../screenConfig';

const items = [{ label: 'SSH' }, { label: 'Generate Key' }, { label: 'Configure Git' }, { label: 'Test and Complete' }];

export const AddNewAccount = () => {
    const dispatch = useDispatch();
    const gitData = useSelector(st => st.addGitAccount)

    const [stepData, setStepData] = useState({
        currentStep: 3
    });

    const allowedNext = () => {
        switch (stepData.currentStep) {
            case 0:
                return true;
            case 1:
                return gitData.keyAdded;
            case 2:
                return gitData.confirmedPubKeyConfigured;
            case 3:
                return gitData.gitConnectedTested;
            default:
                return false;
        }
    }

    function getChildSection() {
        switch (stepData.currentStep) {
            case 0:
                return <Section_SSH />
            case 1:
                return <Section_GenKey />
            case 2:
                return <Section_ConfigGit />
            case 3:
                return <Section_TestAndComplete />
            default:
                return <h2>Default</h2>
        }
    }

    const updateCurrentStep = vl => () => {
        setStepData(st => ({ ...st, currentStep: st.currentStep + vl }));
    }

    useEffect(() => {
        if (stepData.currentStep >= items.length) {
            dispatch(globalStuffActions.setScreen({
                screen: ScreensMapping.addedKeys,
                extra: {}
            }))
        }
    }, [stepData.currentStep]);

    function getFooter() {
        let btnStyle = { width: 100 };
        let curStp = stepData.currentStep;
        let disablePrev = curStp === 0;
        const isLastStep = curStp + 1 === items.length;
        let disableNxt = !allowedNext(); // || isLastStep;
        return <>
            <Button icon='pi pi-chevron-left'
                disabled={disablePrev} outlined={disablePrev}
                label='Previous'
                onClick={updateCurrentStep(-1)} size='small' style={btnStyle} />
            <i className='w-1rem' />
            <Button icon={`pi pi-${isLastStep ? 'check' : 'chevron-right'}`}
                disabled={disableNxt} outlined={disableNxt}
                iconPos='right' label={isLastStep ? 'Finish' : 'Next'}
                onClick={updateCurrentStep(1)} size='small' style={btnStyle} />
        </>
    }

    useEffect(() => {
        dispatch(addGitAccountActions.clear());
    }, []);

    return <><SidePanelPage screenTitle="Add and Configure SSH"
        footerAlign='end'
        footer={getFooter()}
    >
        <div className='flex flex-column h-full'>
            <Steps model={items} activeIndex={stepData.currentStep} className='mb-4' />
            {getChildSection()}
        </div>
    </SidePanelPage>
    </>
}