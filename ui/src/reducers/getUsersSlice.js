import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://mernchat-w0n3.onrender.com"

export const getUsersAction = createAsyncThunk(
    'user/getUsers',
    async({keyword},{rejectWithValue, getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.get(`${apiBaseURL}/api/v1/user/listusers?keyword=${keyword}`, config)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const getUsersSlice = createSlice({
    name:"getUsers",
    initialState:{
        loading: false,
        error:null,
        users:null
    },
    extraReducers:{
        [getUsersAction.pending]:(state) => {
            state.loading=true
        },
        [getUsersAction.fulfilled]:(state, action) => {
            state.loading=false
            state.users=action.payload.users
        },
        [getUsersAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        }
    }
})

export default getUsersSlice.reducer