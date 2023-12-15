import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu } from "primereact/menu";
import { useDispatch, useSelector } from 'react-redux';
import { ScreensMapping } from '../screens/screenConfig';
import { globalStuffActions } from '../store/slices/globalStuffSlice';
import img from './../../assets/logo_128.png';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';

export const LeftNavbar = () => {
    let searchBoxRef = useRef();
    let { globalStuff: { selectedScreen }, sshKeys: { userList }, gitRepoMapping } = useSelector(st => ({
        globalStuff: st.globalStuff,
        sshKeys: st.sshKeys,
        gitRepoMapping: st.gitRepoMapping
    }))
    const dispatch = useDispatch();
    let [repoList, setRepoList] = useState({
        searchText: '',
        list: []
    });
    let needToInsertCloneRepo = userList.length > 0;

    const items = [
        { separator: true },
        {
            icon: 'pi pi-home',
            label: 'Home',
            className: ScreensMapping.dashboard === selectedScreen ? 'p-menuitem-highlight' : '',
            command: () => {
                dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.dashboard, extra: {} }));
            }
        },
        ...(needToInsertCloneRepo ? [{
            icon: 'pi pi-clone',
            label: 'Git Clone',
            className: ScreensMapping.gitClone === selectedScreen ? 'p-menuitem-highlight' : '',
            command: () => {
                dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.gitClone, extra: {} }));
            }
        }] : []),
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
        }
    ];


    const setSearchText = e => {
        let { value } = e.target;
        setRepoList(st => ({ ...st, searchText: value }));
    }

    const clearSearchText = () => {
        setRepoList(st => ({ ...st, searchText: '' }));
        searchBoxRef.current.focus();
    }

    const convertToMenuItem = useCallback((list) => {
        return list.map(c => {
            return {
                icon: 'pi pi-github',
                label: `${c.repoName} by ${c.owner}`,
            }
        })

    }, []);
    useEffect(() => {
        let list = gitRepoMapping;
        if (repoList.searchText) {
            list = list.filter(c => c.searchField.includes(repoList.searchText.trim().toLowerCase()))
        }
        setRepoList(st => ({
            ...st,
            list: convertToMenuItem(list)
        }))
    }, [gitRepoMapping, repoList.searchText]);

    return <>
        <div className='flex justify-content-center'>
            <img className='logo-img' src={img} />
        </div>
        <Menu model={items}
            pt={{
                root: { className: '', style: { width: 'auto', borderWidth: 0 } },
            }}
        />
        <div className='flex align-items-center'>
            <label className='pl-3 font-semibold mr-2'>
                Repositories
            </label>
            <div className='flex-1 p-input-icon-right'>
                <i className={`pi ${repoList.searchText ? 'pi-times cursor-pointer' : 'pi-search'}`} onClick={clearSearchText} title={repoList.searchText ? 'Clear' : 'Search'} />
                <InputText ref={searchBoxRef} size="small" className='w-full' value={repoList.searchText} onChange={setSearchText} />
            </div>
        </div>
        <Divider />
        <ScrollPanel style={{ width: '100%', height: `calc(100% - 470px)` }} className='p-fluid'>
            <Menu model={repoList.list}
                pt={{
                    root: { className: '', style: { width: 'auto', borderWidth: 0 } },
                }} />
        </ScrollPanel>
    </>
}