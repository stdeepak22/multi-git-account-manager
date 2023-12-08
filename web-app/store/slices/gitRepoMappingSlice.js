import { createSlice } from "@reduxjs/toolkit";

const { actions: gitRepoMappingActions, reducer: gitRepoMappingReducer } = createSlice({
    name: 'gitRepoMapping_slice',
    initialState: [],
    reducers: {
        addTodo2: (state, action) => {
            state.push(action.payload);
        }
    }
});

export {
    gitRepoMappingReducer,
    gitRepoMappingActions
}