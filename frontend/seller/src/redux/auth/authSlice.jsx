import { toast } from "react-toastify";
import authApi from "../../api/auth/authApi";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: {},
  loading: false,
  accessToken: "",
  message: "",

};

//login customer
export const loginCustomer = createAsyncThunk(
  "user/loginCustomer",
  async (params, payload, thunkAPI) => {
    try {
      const response = await authApi.loginCustomer(params, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//  login info
export const loginInfo = createAsyncThunk(
  "user/loginInfo",
  async (params, payload, thunkAPI) => {
    try {
      const response = await authApi.loginInfo(params, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.user = {};
      state.accessToken = null;
      state.message = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("mailMessage");
      localStorage.removeItem("cartItems");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.data;
      state.message = action.payload.message;
      localStorage.setItem("accessToken", action.payload.data);


    });
    builder.addCase(loginCustomer.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(loginInfo.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(loginInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = action.payload.message;
      localStorage.setItem("user", JSON.stringify(action.payload));
    }
    );
    builder.addCase(loginInfo.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      toast.error("User chưa đăng ký shop");
    }
    );
  },
});

export const { logout } = authSlice.actions;

const { reducer: authReducer } = authSlice;
export default authReducer;
