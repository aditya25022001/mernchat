import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "http://127.0.0.1:5000"

export const getUserChatsAction = createAsyncThunk(
    'user/getUserChats',
    async(id,{rejectWithValue, getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.get(`${apiBaseURL}/api/v1/chat`, config)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const getUserChatsSlice = createSlice({
    name:"getUserChats",
    initialState:{
        loading: false,
        error:null,
        chats:[]
    },
    extraReducers:{
        [getUserChatsAction.pending]:(state) => {
            state.loading=true
        },
        [getUserChatsAction.fulfilled]:(state, action) => {
            state.loading=false
            state.chats=action.payload.chats
        },
        [getUserChatsAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        }
    }
})

export default getUserChatsSlice.reducer