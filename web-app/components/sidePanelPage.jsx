import React from 'react';
import { Card } from "primereact/card"
import { ScreenFooter, ScreenTitle } from "./screenTitleFooter"
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from 'primereact/button';

export const SidePanelPage = ({ screenTitle, onHeaderBackClick, footer, footerAlign, className, style, children }) => {
    let header = screenTitle ? <ScreenTitle className='flex align-items-center justify-content-start'>
        {onHeaderBackClick && <Button icon='pi pi-chevron-left' rounded link size='small' onClick={onHeaderBackClick} title='go back' className='absolute text-white' />}
        <label className='m-auto'>{screenTitle}</label>
    </ScreenTitle> : null;

    const footerWithWrapper = footer ? <ScreenFooter $footerAlign={footerAlign}>{footer}</ScreenFooter> : null;

    return <Card
        header={header}
        footer={footerWithWrapper}
        className={`shadow-none ${className || ''}`}
        style={{ ...style, height: `calc(100vh - 102px)`, outline: `1px solid var(--surface-200)` }}
        pt={
            {
                body: { style: { height: `calc(100% - ${header ? 50 : 0}px)`, padding: 0 } },
                content: { style: { height: `calc(100% - ${footerWithWrapper ? 50 : 0}px)`, padding: `10px 20px` } },
                footer: { style: { padding: 0 } }
            }
        }>
        <ScrollPanel style={{ width: '100%', height: `100%` }} pt={{ content: { className: 'mt-2', style: { height: `calc(100% - 15px)` } } }}>
            {children}
        </ScrollPanel>
    </Card>
}