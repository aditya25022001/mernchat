import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './reducers/registerSlice'
import loginReducer from './reducers/loginSlice'
import getUsersReducer from './reducers/getUsersSlice'
import getUserChatsReducer from './reducers/getUserChatsSlice'
import createChatReducer from './reducers/createChatSlice'

const store = configureStore({
    reducer:{
        userLogin : loginReducer,
        userRegister : registerReducer,
        userGetUsers : getUsersReducer,
        userGetChats : getUserChatsReducer,
        userCreateChat : createChatReducer
    }
})

export default store