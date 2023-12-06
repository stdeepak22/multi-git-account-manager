import React from 'react';
import { useSelector } from 'react-redux';
import { ScreensMapping } from '../screens/screenConfig';
import { Dashboard } from '../screens/dashboard'
function getScreen(name, data) {
    const allProps = { ...data };
    switch (name) {
        default:
            return <Dashboard {...allProps} />;
    }
}

export const MainContainer = () => {
    let { selectedScreen, selectedScreenExtra } = useSelector(st => st.globalStuff);
    return getScreen(selectedScreen, selectedScreenExtra);
}