import axios from "axios";
import { BASE_URL } from "../API/URLs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentOrder: {
        Source: null,
        Destination: null
    },
    allOrdersPerCurrentOrder: []
}

const orders_URL = `${BASE_URL}/ordering/`;

export const getOrder = createAsyncThunk(
    'Ordering/getOrder',
    async (id) => {
        try {
            const response = await axios.get(`${orders_URL}${id}`);
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

export const setOrdering = createAsyncThunk(
    'Ordering/setOrdering',
    async (ordering) => {
        try {
            const response = await axios.put(`${orders_URL}${ordering.OrderId}`, {
                OrderId: ordering.OrderId,
                UserId: ordering.UserId,
                DriverId: ordering.DriverId,
                Status: ordering.Status,
                ChoiseCar: ordering.ChoiseCar,
                Source: ordering.Source,
                Destination: ordering.Destination,
                DriverTime: ordering.DriverTime
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("error" + error);
            return (error.message);
        }
    }
);


export const addOrdering = createAsyncThunk(
    'Ordering/addOrdering',
    async (ordering) => {
        try {
            const response = await axios.post(`${orders_URL}`, {
                OrderId: ordering.OrderId,
                UserId: ordering.UserId,
                DriverId: ordering.DriverId,
                Status: ordering.Status,
                ChoiseCar: ordering.ChoiseCar,
                Source: ordering.Source,
                Destination: ordering.Destination,
                DriverTime: ordering.DriverTime
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("error" + error);
            return (error.message);
        }
    }
);

export const orderSlice = createSlice({
    name: 'ordering',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.ordering = action.payload;
        });
        builder.addCase(addOrdering.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.details = action.payload;
        });
    }
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
