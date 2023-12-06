import React, { useEffect, useRef } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
import { ScrollPanel } from 'primereact/scrollpanel';
import { MainContainer } from './mainContainer';
import { LeftNavbar } from './leftNavbar';
import img from './../../assets/logo_128.png';

export const App = () => {

    return <PrimeReactProvider value={{}}>
        <div className='p-component layout-topbar'>
            <div className='start'>
                <img className='logo-img' src={img} />
            </div>
            <div className='center' onDoubleClick={() => window.electron.toggleMax()}>
                Multi Git Account Manager
            </div>
            <div className='end' >
                <Button label="__" text size="small" tabIndex={-1} onClick={() => window.electron.toggleMin()} />
                <Button icon="pi pi-clone -rotate-90" text size="small" tabIndex={-1} onClick={() => window.electron.toggleMax()} />
                <Button icon='pi pi-times' text size="small" tabIndex={-1} onClick={() => window.electron.quitApp()} />
            </div>
        </div>
        <div className='layout-rest-app'>
            <div className='layout-sidebar'>
                <ScrollPanel style={{ width: '100%', height: `100%` }} className='p-fluid'>
                    <LeftNavbar />
                </ScrollPanel>
            </div>
            <div className='layout-main-container'>
                <MainContainer />
            </div >
        </div >
    </PrimeReactProvider >
}

