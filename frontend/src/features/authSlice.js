import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const loginUser = createAsyncThunk("user/loginUser", async(user, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:5001/login', {
            email: user.email,
            password: user.password,
        });
        return response.data;
    } catch (error){
        if(error.response){
            const message = error.response.data.msg;
            return thunkApi.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkApi) => {
    try {
        const response = await axios.get('http://localhost:5001/me');
        return response.data;
    } catch (error){
        if(error.response){
            const message = error.response.data.msg;
            return thunkApi.rejectWithValue(message);
        }
    }
});

export const logOut = createAsyncThunk("user/logOut", async() => {
    await axios.delete('http://localhost:5001/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        
    }
    
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;