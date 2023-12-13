import React, { useState } from 'react';
import { Menu } from "primereact/menu";
import { useDispatch, useSelector } from 'react-redux';
import { ScreensMapping } from '../screens/screenConfig';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import { Tree } from 'primereact/tree';
import img from './../../assets/logo_128.png';

export const LeftNavbar = () => {
    let { selectedScreen } = useSelector(st => st.globalStuff)
    let [newNav, setNewNav] = useState(false);
    const dispatch = useDispatch();

    const items = newNav ? [{
        key: ScreensMapping.dashboard,
        icon: 'pi pi-home',
        label: 'Home',
    }, {
        label: 'SSH Keys',
        icon: 'pi pi-lock',
        expanded: true,
        children: [
            {
                key: ScreensMapping.addNewAccount,
                label: "Configure",
                icon: 'pi pi-plus',
            },
            {
                key: ScreensMapping.addedKeys,
                label: "Added",
                icon: 'pi pi-check',
            }
        ]
    },
    {
        label: 'Git Repos',
        expanded: true,
        children: [
            {
                key: 'git-1',
                label: "Add",
                icon: 'pi pi-plus',
            },
            {
                key: 'git-2',
                label: "Added",
                icon: 'pi pi-list',
            }
        ]
    }] : [
        { separator: true },
        {
            icon: 'pi pi-home',
            label: 'Home',
            className: ScreensMapping.dashboard === selectedScreen ? 'p-menuitem-highlight' : '',
            command: () => {
                dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.dashboard, extra: {} }));
            }
        },
        { separator: true },
        {
            label: 'SSH Keys',
            items: [
                {
                    label: "Configure",
                    icon: 'pi pi-plus',
                    className: ScreensMapping.addNewAccount === selectedScreen ? 'p-menuitem-highlight' : '',
                    command: () => {
                        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.addNewAccount, extra: {} }));
                    }
                },
                {
                    label: "Added",
                    icon: 'pi pi-check',
                    className: [ScreensMapping.addedKeys, ScreensMapping.accountDetails].includes(selectedScreen) ? 'p-menuitem-highlight' : '',
                    command: () => {
                        dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.addedKeys, extra: {} }));
                    }
                },
            ]
        },
        {
            separator: true
        },
        {
            label: 'Git Repos',
            expanded: true,
            items: [
                {
                    label: "Add",
                    icon: 'pi pi-plus',
                },
                {
                    label: "Added",
                    icon: 'pi pi-list',
                }
            ]
        }
    ];


    const onSelection = e => {
        let { node } = e;
        if (node.key) {
            dispatch(globalStuffActions.setScreen({ screen: node.key, extra: {} }));
        }
    }
    return <>
        <div className='flex justify-content-center'>
            <img className='logo-img' src={img} />
        </div>
        {/* <Checkbox onChange={e => setNewNav(e.checked)} checked={newNav} /> */}
        {newNav ? <>
            <Tree value={items} selectionMode="single" selectionKeys={selectedScreen} onNodeClick={onSelection} togglerTemplate={() => {
                return <p style={{ width: 10 }} />
            }} />
        </>
            : <Menu model={items}
                element={<p>test node</p>}
                pt={{
                    root: { className: '', style: { width: 'auto', borderWidth: 0 } },
                }} />}
    </>
}