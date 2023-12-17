import { combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { globalStuffReducer } from './slices/globalStuffSlice'
import { gitRepoMappingActions, gitRepoMappingReducer } from './slices/gitRepoMappingSlice'
import { addGitAccountReducer } from './slices/addGitAccountSlice'
import { gitProfileActions, gitProfileReducer } from './slices/gitProfileSlice';

const rootReducer = combineReducers({
    globalStuff: globalStuffReducer,
    gitRepoMapping: gitRepoMappingReducer,
    gitProfile: gitProfileReducer,
    addGitAccount: addGitAccountReducer
})


export const appBootstrap = createAsyncThunk("app-bootstrap", (_, { dispatch }) => {
    dispatch(gitRepoMappingActions.loadAllRepositories());
    dispatch(gitProfileActions.loadProfileAndSSHConfig());
})

export const mainStore = configureStore({
    reducer: rootReducer,
})
