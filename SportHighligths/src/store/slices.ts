import { createSlice } from "@reduxjs/toolkit"
import { ReduxAction } from "../types"

export const backRouteSlice = createSlice({
    name: "route",
    initialState: null,
    reducers: {
        saveRoute: (state: any, action: ReduxAction) => { return action.payload },
        removeRoute: () => { return null }
    }
});
export const { removeRoute, saveRoute } = backRouteSlice.actions