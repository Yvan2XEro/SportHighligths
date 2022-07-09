
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { backRouteSlice, firsrtUseSlice } from './slices'


export const store = configureStore({
    reducer: {
        route: backRouteSlice.reducer,
        firstUse: firsrtUseSlice.reducer
    }
})