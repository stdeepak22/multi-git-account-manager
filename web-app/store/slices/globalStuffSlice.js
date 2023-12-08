import { createSlice } from "@reduxjs/toolkit";
import { ScreensMapping } from "../../screens/screenConfig";

const { actions: globalStuffActions, reducer: globalStuffReducer } = createSlice({
    name: 'globalStuff_slice',
    initialState: {
        selectedScreen: JSON.parse(localStorage.getItem('lastScreen')) || ScreensMapping.dashboard,
        selectedScreenExtra: JSON.parse(localStorage.getItem('lastScreenParam')) || {},
    },
    reducers: {
        setScreen: (state, action) => {
            let { screen, extra } = action.payload;
            if (extra) {
                localStorage.setItem('lastScreenParam', JSON.stringify(extra));
            } else {
                localStorage.removeItem('lastScreenParam');
            }
            localStorage.setItem('lastScreen', JSON.stringify(screen));
            state.selectedScreen = screen;
            state.selectedScreenExtra = extra;
        }
    }
});


export {
    globalStuffReducer,
    globalStuffActions
}