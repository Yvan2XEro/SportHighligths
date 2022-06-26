
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { ReduxAction } from '../types'
import { backRouteSlice } from './slices'


export const store = configureStore({
    reducer: {
        route: backRouteSlice.reducer
    }
})