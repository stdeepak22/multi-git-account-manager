import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { globalStuffReducer } from './slices/globalStuffSlice'
import { sshKeyReducer } from './slices/sshKeySlice';
import { gitRepoMappingReducer } from './slices/gitRepoMappingSlice'
import { addGitAccountReducer } from './slices/addGitAccountSlice'

const rootReducer = combineReducers({
    globalStuff: globalStuffReducer,
    sshKeys: sshKeyReducer,
    gitRepoMapping: gitRepoMappingReducer,
    addGitAccount: addGitAccountReducer
})

export const mainStore = configureStore({
    reducer: rootReducer,
})
