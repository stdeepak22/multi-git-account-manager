import { createSlice } from "@reduxjs/toolkit";

let re = [];
for (let i = 0; i < 20; i++) {
    let vl = i + 1;
    re.push({
        repoName: `Repo - ${vl}`,
        owner: `Name - ${vl}`,
    });
}
re.forEach(c => c.searchField = `${c.repoName}:::${c.owner}`.toLowerCase());

let initialState = re;
const { actions: gitRepoMappingActions, reducer: gitRepoMappingReducer } = createSlice({
    name: 'gitRepoMapping_slice',
    initialState: initialState,
    reducers: {
        // addTodo2: (state, action) => {
        //     state.push(action.payload);
        // }
    }
});

export {
    gitRepoMappingReducer,
    gitRepoMappingActions
}