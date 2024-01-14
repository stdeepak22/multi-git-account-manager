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
    let { selectedScreen } = useSelector(st => st.globalStuff)
    let { names } = useSelector(st => st.gitProfile)
    let { repoList } = useSelector(st => st.gitRepoMapping)
    const dispatch = useDispatch();
    let [state, setState] = useState({
        searchText: '',
        list: []
    });
    let needToInsertCloneRepo = names.length > 0;

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
        }, {
            icon: 'pi pi-cloud-upload',
            label: 'Import Existing',
            className: ScreensMapping.gitImportExisting === selectedScreen ? 'p-menuitem-highlight' : '',
            command: () => {
                dispatch(globalStuffActions.setScreen({ screen: ScreensMapping.gitImportExisting, extra: {} }));
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
        setState(st => ({ ...st, searchText: value }));
    }

    const clearSearchText = () => {
        setState(st => ({ ...st, searchText: '' }));
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
        let list = repoList;
        if (state.searchText) {
            list = list.filter(c => c.searchField.includes(state.searchText.trim().toLowerCase()))
        }
        setState(st => ({
            ...st,
            list: convertToMenuItem(list)
        }))
    }, [repoList, state.searchText]);

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
            <label className='pl-3 font-semibold mr-4'>
                Repos
            </label>
            <div className='flex-1 p-input-icon-right'>
                <i className={`pi ${state.searchText ? 'pi-times cursor-pointer' : 'pi-search'}`} onClick={clearSearchText} title={state.searchText ? 'Clear' : 'Search'} />
                <InputText ref={searchBoxRef} size="small" className='w-full' value={state.searchText} onChange={setSearchText} />
            </div>
        </div>
        <Divider />
        <ScrollPanel style={{ width: '100%', height: `calc(100% - 470px)` }} className='p-fluid'>
            <Menu model={state.list}
                pt={{
                    root: { className: '', style: { width: 'auto', borderWidth: 0 } },
                }} />
        </ScrollPanel>
    </>
}