/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axios';

export const fetchProfile = createAsyncThunk('fetchProfile', async () => {
    try {
        const newUser = await axios.get('/service/profile');
        return newUser.data.message[0];
    } catch (error) {
    }
});

interface ProfileState {
    isLoading: boolean;
    data: any;
    isError: boolean;
    name: string;
}

const initialState: ProfileState = {
    isLoading: false,
    data: null,
    isError: false,
    name: '',
};
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.isError = true;
        });
    },
});

export default profileSlice.reducer;
