import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shopApi from "../../api/shop/shopApi";

const initialState = {
    shop: {},
    loading: false,
    errorMessage: "",
    message: "",

};
export const getShopDetailById = createAsyncThunk(
    "shop/getShopDetailById",
    async (payload, thunkAPI, shopId) => {
        try {
            const response = await shopApi.getShopDetailById(payload, shopId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getShopDetailById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getShopDetailById.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload;
        });
        builder.addCase(getShopDetailById.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        });

    },
});

export default shopSlice.reducer;
