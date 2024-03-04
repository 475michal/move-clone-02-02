import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slices/users'
import ordersReducer from './slices/orders'
import DriverReducer from './slices/drivers'



const store = configureStore({
    reducer: {
        users: usersReducer, 
        orders: ordersReducer,
        driver:DriverReducer,
    }
})



export default store;
