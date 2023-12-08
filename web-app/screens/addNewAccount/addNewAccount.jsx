import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { Steps } from 'primereact/steps';
import { SidePanelPage } from '../../components/sidePanelPage';
import { Section_SSH } from './sections/section_ssh';
import { Section_GenKey } from './sections/section_gen_key';
import { addGitAccountActions } from '../../store/slices/addGitAccountSlice';
import { Section_ConfigGit } from './sections/section_configGit';

const items = [{ label: 'SSH' }, { label: 'Generate Key' }, { label: 'Configure Git' }, { label: 'Test and Complete' }];

export const AddNewAccount = () => {
    const dispatch = useDispatch();
    const gitData = useSelector(st => st.addGitAccount)

    const [stepData, setStepData] = useState({
        currentStep: 0
    });

    const allowedNext = () => {
        switch (stepData.currentStep) {
            case 1:
                return gitData.keyAdded;
            case 2:
                return gitData.keyAdded;
            default:
                return true;
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
                return <h2>Details about process</h2>
            default:
                return <h2>Default</h2>
        }
    }

    const updateCurrentStep = vl => () => {
        setStepData(st => ({ ...st, currentStep: st.currentStep + vl }));
    }

    function getFooter() {
        let btnStyle = { width: 100 };
        let curStp = stepData.currentStep;
        let disablePrev = curStp === 0;
        let disableNxt = curStp + 1 === items.length || !allowedNext();
        return <>
            <Button icon='pi pi-chevron-left'
                disabled={disablePrev} outlined={disablePrev}
                label='Previous'
                onClick={updateCurrentStep(-1)} size='small' style={btnStyle} />
            <i className='w-1rem' />
            <Button icon='pi pi-chevron-right'
                disabled={disableNxt} outlined={disableNxt}
                iconPos='right' label='Next'
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
            <Steps model={items} activeIndex={stepData.currentStep} className='mb-2' />
            {getChildSection()}
        </div>
    </SidePanelPage>
    </>
}