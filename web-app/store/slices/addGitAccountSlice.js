import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    name: '',
    isValid: undefined,     // verify using git api
    keyAdded: false,        // user will allow to add
    gitProfileData: undefined,  // data fetched from git api using "name"
    confirmedPubKeyConfigured: false,   // user will confirm after adding publish key to git ssh key
    gitConnectedTested: false   // once connection verifed to github
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
            state.confirmedPubKeyConfigured = false
        },
        markKeyAdded: (state) => {
            state.keyAdded = true;
        },
        toggleConfPubKeyConfig: (state) => {
            state.confirmedPubKeyConfigured = !state.confirmedPubKeyConfigured;
        },
        markGitConnectionTested: (state, action) => {
            state.gitConnectedTested = action.payload;
        }
    }
});

export {
    addGitAccountActions,
    addGitAccountReducer
}