import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { globalStuffReducer } from './slices/globalStuffSlice'

const rootReducer = combineReducers({
    globalStuff: globalStuffReducer,
})

export const mainStore = configureStore({
    reducer: rootReducer,
})
