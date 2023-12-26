import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const fetchProfile = createAsyncThunk('fetchProfile', async () => {
    try {
        const newUser = await axios.get('/service/profile');
        console.log(axios.defaults.headers['Authorization'])
        const newData = newUser.data.message[0];
        console.log('this is from dispatch');
        console.log(newData);
        console.log(newUser);
        return newData;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
})

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
    name: ''
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
            console.log("Error", action.payload);
            state.isError = true;
        });
    }
})

export default profileSlice.reducer