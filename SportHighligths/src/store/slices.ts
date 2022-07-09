import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxAction } from "../types"

// BACKROUTE SLICE
export const backRouteSlice = createSlice({
    name: "route",
    initialState: null,
    reducers: {
        saveRoute: (state: any, action: ReduxAction) => { return action.payload },
        removeRoute: () => {
            return null
        }
    }
});
export const { removeRoute, saveRoute } = backRouteSlice.actions

// LOCAL STORAGE SLICE
export const firsrtUseSlice = createSlice({
    name: "firstUse",
    initialState: true,
    reducers: {
        setFirstUse: (state: boolean, action: ReduxAction) => action.payload,
    }
})
export const { setFirstUse } = firsrtUseSlice.actions
