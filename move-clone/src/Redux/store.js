import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slices/users'
import ordersReducer from './slices/orders'


const store = configureStore({
    reducer: {
        users: usersReducer, //currentUser
        orders: ordersReducer // 
    }
})

export default store;
