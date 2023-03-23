import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "http://127.0.0.1:5000"

export const userRegisterAction = createAsyncThunk(
    'user/register',
    async({name, email, password},{rejectWithValue}) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/v1/user/register`,{ name,email,password }, config)
            if(data){
                await axios.post(`${apiBaseURL}/api/v1/user/login`,{ email,password }, config)
                sessionStorage.setItem("userInfo",JSON.stringify(data))
            }
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const registerSlice = createSlice({
    name:"userRegister",
    initialState:{
        loading: false,
        error:null,
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    extraReducers:{
        [userRegisterAction.pending]:(state) => {
            state.loading=true
        },
        [userRegisterAction.fulfilled]:(state, action) => {
            state.loading=false
            state.userInfo=action.payload
        },
        [userRegisterAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        }
    }
})

export default registerSlice.reducer