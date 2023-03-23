import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './auth/registerSlice'
import loginReducer from './auth/loginSlice'

const store = configureStore({
    reducer:{
        userLogin : loginReducer,
        userRegister : registerReducer,
    }
})

export default store