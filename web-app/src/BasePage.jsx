import React, { useEffect, useRef } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
import { ScrollPanel } from 'primereact/scrollpanel';
import { MainContainer } from './mainContainer';
import { LeftNavbar } from './leftNavbar';
import { Toast } from 'primereact/toast';
import { closeTheApp, setToastCallback, toggleMaxSize, toggleMinimize } from './non-component-sharing';
import img from './../../assets/logo_128.png';
import { appBootstrap } from '../store/mainStore';
import { useDispatch } from 'react-redux';

export const App = () => {
    let toast = useRef();
    let dispatch = useDispatch();

    useEffect(() => {
        setToastCallback(toast);
    }, [toast]);

    useEffect(() => {
        dispatch(appBootstrap());
    }, []);

    return <PrimeReactProvider value={{}}>
        <Toast ref={toast} />
        <div className='p-component layout-topbar'>
            <div className='start'>
                <img className='logo-img' src={img} />
            </div>
            <div className='center' onDoubleClick={toggleMaxSize}>
                Multi Git Account Manager
            </div>
            <div className='end' >
                <Button label="__" text size="small" tabIndex={-1} onClick={toggleMinimize} />
                <Button icon="pi pi-clone -rotate-90" text size="small" tabIndex={-1} onClick={toggleMaxSize} />
                <Button icon='pi pi-times' text size="small" tabIndex={-1} onClick={closeTheApp} />
            </div>
        </div>
        <div className='layout-rest-app'>
            <div className='layout-sidebar'>
                <LeftNavbar />
            </div>
            <div className='layout-main-container'>
                <MainContainer />
            </div >
        </div >
    </PrimeReactProvider >
}

