import { createSlice } from "@reduxjs/toolkit";
import { ScreensMapping } from "../../screens/screenConfig";

const { actions: globalStuffActions, reducer: globalStuffReducer } = createSlice({
    name: 'globalStuff_slice',
    initialState: {
        selectedScreen: JSON.parse(localStorage.getItem('lastScreen')) || ScreensMapping.dashboard,
        selectedScreenExtra: {},
    },
    reducers: {
        setScreen: (state, action) => {
            let { screen, extra } = action.payload;
            if (!extra || Object.keys(extra).length === 0) {
                localStorage.setItem('lastScreen', JSON.stringify(screen));
            }
            state.selectedScreen = screen;
            state.selectedScreenExtra = extra;
        }
    }
});


export {
    globalStuffReducer,
    globalStuffActions
}