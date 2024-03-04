import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    User: [],
}

export const fetchUser = createAsyncThunk(
   
    'User/fetchUser',
    async (thunkAPI) => {
        console.log('in fetchUser');
         
        try {
            const response = await axios.get('https://localhost:7185/api/User');
            console.log('Data from server user:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from server:', error.message);
            throw error;
        }
    }
)


export const addUserToServer = createAsyncThunk(
    'User/addUserToServer',
    async (payload) => {
        
        const { email, password,username } = payload;
        try {
            const response = await axios.post('https://localhost:7185/api/User', {
                email: email,
               password: password,
                username: username,
            });
            console.log('User added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding user to server:', error.message);
            return isRejectedWithValue(error);
        }
    }
);

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.User = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(addUserToServer.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.User = action.payload;
            })
            .addCase(addUserToServer.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    },
});
export const { } = userSlice.actions
export default userSlice.reducer
