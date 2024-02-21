import axios from "axios";
import { BASE_URL } from "../API/URLs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentOrder: {
        Email: null,
        Password: null,
        UserName: null,
        PhoneNumber: null,
    },
    allOrdersPerCurrentOrder: []
}

const User_URL = `${BASE_URL}/User/`;



export const getAll = createAsyncThunk(
    'Users/getAll',
    async () => {
        try {
            const response = await axios.get(`${User_URL}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("not success");
                return false;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const getUsers = createAsyncThunk(
    'Users/getUser',
    async (id) => {
        try {
            const response = await axios.get(`${User_URL}${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("not success");
                return false;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);




export const setUsers = createAsyncThunk(
    'Users/setUsers',
    async (User) => {
        try {
            const response = await axios.put(`${User_URL}${User.UserId}`, User);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("error" + error);
            return (error.message);
        }
    }
);


export const addUsers = createAsyncThunk(
    'Users/addUsers',
    async (User) => {
        try {
            const response = await axios.post(`${User_URL}`, User);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("error" + error);
            return (error.message);
        }
    }
);

export const UserSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.Users = action.payload;
        });
        builder.addCase(addUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.details = action.payload;
        });
    }
});

export const { } = UserSlice.actions;
export default UserSlice.reducer;
