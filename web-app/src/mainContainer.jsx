import React from 'react';
import { useSelector } from 'react-redux';
import { ScreensMapping } from '../screens/screenConfig';
import { Dashboard } from '../screens/dashboard'
import { AccountDetails } from '../screens/accountDetails/accountDetails'
import { AddNewAccount } from '../screens/addNewAccount/addNewAccount'
import { AddedKeysList } from '../screens/addedKeys';

function getScreen(name, data) {
    const allProps = { ...data };
    switch (name) {
        case ScreensMapping.addNewAccount:
            return <AddNewAccount {...allProps} />
        case ScreensMapping.addedKeys:
            return <AddedKeysList {...allProps} />
        case ScreensMapping.accountDetails:
            return <AccountDetails {...allProps} />
        default:
            return <Dashboard {...allProps} />;
    }
}

export const MainContainer = () => {
    let { selectedScreen, selectedScreenExtra } = useSelector(st => st.globalStuff);
    return getScreen(selectedScreen, selectedScreenExtra);
}