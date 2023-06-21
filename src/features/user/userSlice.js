import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from "./userService";

const initialState = {
    currentUser: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};
export const currentUser = createAsyncThunk('get/user', async (_, thunkAPI) => {
    try {
        return await UserService.getCurrentUser();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(currentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})
export const { reset } = userSlice.actions;
export default userSlice.reducer;
