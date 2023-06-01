
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from "../../api/order/orderApi";

const initialState = {
    orderItems: [],
    loading: false,
    orderDetail: {},
    orderById: {},
    orderStatus: {},
    orderCancel: {},
    orderConfirm: {},
    orderFilter: {},
};

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (data, payload, thunkAPI) => {
        try {
            const response = await orderApi.createOrder(data, payload);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const orderDetailById = createAsyncThunk(
    'order/orderDetail',
    async (orderId, thunkAPI) => {
        try {
            const response = await orderApi.orderDetail(orderId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const orderById = createAsyncThunk(
    'order/orderById',
    async (orderId, thunkAPI) => {
        try {
            const response = await orderApi.orderById(orderId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (orderId, thunkAPI) => {
        try {
            const response = await orderApi.cancelOrder(orderId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const confirmOrder = createAsyncThunk(
    'order/confirmOrder',
    async (orderId, thunkAPI) => {
        try {
            const response = await orderApi.confirmOrder(orderId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const statusOrder = createAsyncThunk(
    'order/statusOrder',
    async (orderId, thunkAPI) => {
        try {
            const response = await orderApi.statusOrder(orderId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const filterOrder = createAsyncThunk(
    'order/filterOrder',
    async (data, thunkAPI) => {
        try {
            const response = await orderApi.filterOrder(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = action.payload;
                localStorage.removeItem('cartItems');
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            })
        builder
            .addCase(orderDetailById.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(orderDetailById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetail = action.payload;
            }
            )
            .addCase(orderDetailById.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            }
            )
        builder
            .addCase(orderById.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(orderById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderById = action.payload;
            }
            )
            .addCase(orderById.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            }
            )
        builder
            .addCase(cancelOrder.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderCancel = action.payload;
            }
            )
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            }
            )
        builder

            .addCase(confirmOrder.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(confirmOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderConfirm = action.payload;
            }
            )
            .addCase(confirmOrder.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            }
            )
        builder
            .addCase(statusOrder.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(statusOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderStatus = action.payload;
            }
            )
            .addCase(statusOrder.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            }
            )
        builder
            .addCase(filterOrder.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(filterOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderFilter = action.payload;
            }
            )
            .addCase(filterOrder.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload.message;
            }
            )

    }

});

export default orderSlice.reducer;





