import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://mernchat-w0n3.onrender.com"

export const userResetPassword = createAsyncThunk(
    'reset/password',
    async({email, password},{rejectWithValue}) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/v1/recover/reset`,{ email,password }, config)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const resetSlice = createSlice({
    name:"userReset",
    initialState:{
        loading: false,
        error:null,
        success:false
    },
    extraReducers:{
        [userResetPassword.pending]:(state) => {
            state.loading=true
        },
        [userResetPassword.fulfilled]:(state, action) => {
            state.loading=false
            state.success=true
        },
        [userResetPassword.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        }
    }
})

export default resetSlice.reducer