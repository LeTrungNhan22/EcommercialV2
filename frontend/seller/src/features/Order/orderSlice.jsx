import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "./api/orderApi";

const initialState = {
    orderFilter: [],
    orderDetail: {},
    orderStatus: {},
    loading: false,
    message: "",
    errorMess: "",
}

export const orderFilter = createAsyncThunk(
    "order/orderFilter",
    async (filter, payload, thunkAPI) => {
        try {
            const response = await orderApi.orderFilter(filter, payload);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const orderDetail = createAsyncThunk(
    "order/orderDetail",
    async (id, payload, thunkAPI) => {
        try {
            const response = await orderApi.orderDetailById(id, payload);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({ id, data }, payload, thunkAPI) => {
        try {
            const response = await orderApi.statusOrder(id, data, payload);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);




const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(orderFilter.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(orderFilter.fulfilled, (state, action) => {
            state.orderFilter = action.payload;
            state.loading = false;
        });
        builder.addCase(orderFilter.rejected, (state, action) => {
            state.loading = false;
            toast.error("Order not found");
        });
        builder.addCase(orderDetail.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(orderDetail.fulfilled, (state, action) => {
            state.orderDetail = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(orderDetail.rejected, (state, action) => {
            state.loading = false;
            toast.error("Order not found");
        }
        );
        builder.addCase(updateOrderStatus.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.orderStatus = action.payload;
            state.loading = false;
        }
        );
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            toast.error("Không thể cập nhật trạng thái đơn hàng đã hủy hoặc đã giao hàng");
        }
        );

    }
});

const { reducer: orderReducer } = orderSlice;
export default orderReducer;