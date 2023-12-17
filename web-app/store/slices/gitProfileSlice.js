import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readSSHConfig } from "../../src/non-component-sharing";
import { getAllProfiles } from "../../src/db_operations";


const sliceName = "gitProfile_slice";
const loadProfileAndSSHConfig = createAsyncThunk(`${sliceName}/loadProfileAndSSHConfig`, (_, { dispatch }) => {
    getAllProfiles().then(st => dispatch(gitProfilePartialActions.setProfiles(st)));
    readSSHConfig().then(st => dispatch(gitProfilePartialActions.setSSHConfig(st)));
})
const { actions: gitProfilePartialActions, reducer: gitProfileReducer } = createSlice({
    name: sliceName,
    initialState: {
        names: [],
        profiles: [],
        sshConfig: {}
    },
    reducers: {
        setProfiles: (state, action) => {
            state.names = Object.keys(action.payload);
            state.profiles = Object.values(action.payload);
        },
        setSSHConfig: (state, action) => {
            let sshConfig = {};
            action.payload.forEach(conf => {
                sshConfig[conf.gitUserName] = conf;
            })
            state.sshConfig = sshConfig;
        }
    }
});

const gitProfileActions = { ...gitProfilePartialActions, loadProfileAndSSHConfig };
export {
    gitProfileReducer,
    gitProfileActions
}