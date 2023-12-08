import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const sliceName = "sshKey_slice";
const loadSavedKeys = createAsyncThunk(`${sliceName}/loadSavedKeys`, electron.readConfigFile);

const { actions: sshKeyPartialActions, reducer: sshKeyReducer } = createSlice({
    name: sliceName,
    initialState: {
        userList: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSavedKeys.fulfilled, (state, action) => {
                state.userList = [...action.payload.map(c => ({ ...c, gitUserName: c.Host.split('.')[0] }))];
            })
    }
});

const sshKeysActions = { sshKeyPartialActions, loadSavedKeys };

export {
    sshKeyReducer,
    sshKeysActions
}