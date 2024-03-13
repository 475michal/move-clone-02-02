import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    selectedDriverId: null,
    // selectedUserId:null,
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
    async ({ iduser, iddriver, status, choiseCar, source, destination, driveTime }) => {
        debugger;
        try {
            const response = await axios.post('https://localhost:7185/api/Ordering', {
                UserId: iduser,
                DriverId: iddriver,
                "Status": "true",
                "ChoiseCar": choiseCar,
                "Source": source,
                "Destination": destination,
                "DriveTime": driveTime
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

    reducers: {

        setSelectedDriverId(state, action) {
            state.selectedDriverId = action.payload;
        },
    },
    // reducers: {
    //     setSelectedUserId(state, action) {
    //         debugger
    //         state.selectedUserId = action.payload;
    //     }
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdering.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(fetchOrdering.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.Ordering = action.payload;
            })
            .addCase(fetchOrdering.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(addOrderingToServer.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(addOrderingToServer.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.data = action.payload;
            })
            .addCase(addOrderingToServer.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.error.message;
            });
    },
});
export const { } = OrderingSlice.actions
export const { setSelectedDriverId,setSelectedUserId } = OrderingSlice.actions;
export default OrderingSlice.reducer
