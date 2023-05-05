import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://mernchat-w0n3.onrender.com"

export const sendOtpAction = createAsyncThunk(
    'recover/sendotp',
    async ({email},{ rejectWithValue }) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/v1/recover/otp`,{ email }, config)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const resetStateSuccess = createAsyncThunk(
    "reset/success",
    async({id}) => {
        console.log(`reseting state for ${id}`)
    }
)

const sendOtpSlice = createSlice({
    name:"sendOtp",
    initialState:{
        loading: false,
        error:null,
        otp:null,
        success:false,
        email:""
    },
    extraReducers:{
        [sendOtpAction.pending]:(state) => {
            state.loading=true
        },
        [sendOtpAction.fulfilled]:(state, action) => {
            state.loading=false
            state.otp=action.payload.otp
            state.success=true
            state.email = action.payload.email
        },
        [sendOtpAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        },
        [resetStateSuccess.fulfilled]:(state, action) => {
            state.success=false
        },
    }
})

export default sendOtpSlice.reducer