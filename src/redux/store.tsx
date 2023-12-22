import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter'
import ProfileReducer from './slices/profile/ProfileData'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        profile: ProfileReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch