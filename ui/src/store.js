import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './reducers/registerSlice'
import loginReducer from './reducers/loginSlice'
import getUsersReducer from './reducers/getUsersSlice'
import getUserChatsReducer from './reducers/getUserChatsSlice'
import sendOtpReducer from './reducers/sendOtpSlice'
import resetPasswordReducer from './reducers/resetPasswordSlice'

const store = configureStore({
    reducer:{
        userLogin : loginReducer,
        userRegister : registerReducer,
        userGetUsers : getUsersReducer,
        userGetChats : getUserChatsReducer,
        userSendOtp : sendOtpReducer,
        userReset : resetPasswordReducer
    }
})

export default store