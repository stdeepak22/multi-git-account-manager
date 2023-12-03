import { combineReducers, configureStore } from '@reduxjs/toolkit'
const rootReducer = combineReducers({
})

export const mainStore = configureStore({
    reducer: rootReducer,
})
