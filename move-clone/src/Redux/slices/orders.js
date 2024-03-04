import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    Ordering: [],
}

export const fetchOrdering = createAsyncThunk(
   
    'Ordering/fetchOrdering',
    async (thunkAPI) => {
        console.log('in fetchOrdering');
       
        try {
            const response = await axios.get('https://localhost:7185/api/Ordering');
            console.log('Data from server Ordering:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from server:', error.message);
            throw error;
        }
    }
)

export const addOrderingToServer = createAsyncThunk(
    'Ordering/addOrderingToServer',
    async (payload) => {
        
        const { status,choiseCar,source,destination,driveTime} = payload;
        try {
            const response = await axios.post('https://localhost:7185/api/Ordering', {
              status:"true",
              choiseCar:choiseCar,
              source:source,
              destination:destination,
              driveTime:driveTime,
            });
            console.log('Ordering added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding Ordering to server:', error.message);
            return isRejectedWithValue(error);
        }
    }
);

export const OrderingSlice = createSlice({
    name: 'Ordering',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdering.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.Ordering = action.payload;
            })
            .addCase(fetchOrdering.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    },
});
export const { } = OrderingSlice.actions
export default OrderingSlice.reducer
