import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRepositories } from "../../src/db_operations";

const sliceName = "gitRepoMapping_slice";
const loadAllRepositories = createAsyncThunk(`${sliceName}/loadAllRepositories`, (_, { dispatch }) => {
    getAllRepositories().then(st => dispatch(gitRepoMappingActions.setRepoMapping(st)));
})
const { actions: gitRepoMappingPartialActions, reducer: gitRepoMappingReducer } = createSlice({
    name: sliceName,
    initialState: {
        repoList: []
    },
    reducers: {
        setRepoMapping: (state, action) => {
            state.repoList = action.payload.map(c => ({ ...c, searchField: `${c.repoName}:::${c.owner}` }));
        }
    }
});

const gitRepoMappingActions = { ...gitRepoMappingPartialActions, loadAllRepositories };
export {
    gitRepoMappingReducer,
    gitRepoMappingActions
}