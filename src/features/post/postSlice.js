// postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllPosts = createAsyncThunk('get/posts', async (_, thunkAPI) => {
    try {
        return await postService.getAllPosts();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createNew = createAsyncThunk('create/post', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.createNewPost(postData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteUserPost = createAsyncThunk('delete/post', async (id, thunkAPI) => {
    try {
        const token = sessionStorage.getItem('user')
        console.log({token});
        return await postService.deletePost(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createNew.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNew.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

                state.posts.unshift(action.payload)
            })
            .addCase(createNew.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteUserPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

                state.posts.unshift(action.payload)
            })
            .addCase(deleteUserPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.posts = state.posts.filter(post => post._id !== action.payload)
            })
    },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
