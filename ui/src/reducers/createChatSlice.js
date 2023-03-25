import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "http://127.0.0.1:5000"

export const createChatAction = createAsyncThunk(
    'user/createp2pchat',
    async({userID},{rejectWithValue,getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/v1/chat/p2p`,{ userID }, config)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const createChatSlice = createSlice({
    name:"userCreateChat",
    initialState:{
        loading: false,
        error:null,
        chat : null
    },
    extraReducers:{
        [createChatAction.pending]:(state) => {
            state.loading=true
        },
        [createChatAction.fulfilled]:(state, action) => {
            state.loading=false
            state.chat=action.payload.chat
        },
        [createChatAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        }
    }
})

export default createChatSlice.reducer