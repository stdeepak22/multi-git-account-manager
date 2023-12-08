import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    name: '',
    isValid: undefined,
    keyAdded: false,
    gitProfileData: undefined
};


const { actions: addGitAccountActions, reducer: addGitAccountReducer } = createSlice({
    name: 'addGitAccount_slice',
    initialState: defaultState,
    reducers: {
        clear: (state) => {
            Object.assign(state, defaultState)
        },
        setGitName: (state, action) => {
            let newName = action.payload.trim();
            if (state.name !== newName) {
                state.name = newName;
                state.isValid = undefined;
                state.gitProfileData = undefined;
            }
        },
        setValidityResponse: (state, action) => {
            let { isValid, gitProfileData } = action.payload;
            state.isValid = isValid;
            state.gitProfileData = gitProfileData;
        },
        markKeyAdded: (state) => {
            state.keyAdded = true;
        }
    }
});

export {
    addGitAccountActions,
    addGitAccountReducer
}