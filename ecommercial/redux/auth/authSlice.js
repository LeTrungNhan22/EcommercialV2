import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/auth/authApi";

const initialState = {
  user: {},
  accessToken: "",
  message: "",
  loading: false,
  errorMessage: "",
  mailMessage: "",
};

// sign up
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.register(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//get token
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.getAccessToken(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// get user info
export const getCustomerInfo = createAsyncThunk(
  "auth/getCustomerInfo",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.getCustomerInfo(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.accessToken = localStorage.getItem("accessToken");
    },
    addMessage: (state, action) => {
      state.message = localStorage.getItem("message");
      state.mailMessage = localStorage.getItem("mailMessage");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state, action) => {
      state.user = {};
      state.accessToken = null;
      state.message = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("mailMessage");
    },
  },

  extraReducers: (builder) => {
    // sign up reducer
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload: { errorMessage, message, data } }) => {
          state.loading = false;
          if (errorMessage) {
            state.errorMessage = errorMessage;
          } else {
            state.message = message;
            state.user = data;
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("mailMessage", message);
          }
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
    // sign up reducer

    // login reducer
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload: { errorMessage, data, user } }) => {
          state.loading = false;
          if (errorMessage) {
            state.errorMessage = errorMessage;
          } else {
            state.accessToken = data;
            state.user = user;
            localStorage.setItem("accessToken", data);
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });

    // login reducer
    // get user info reducer
    builder
      .addCase(getCustomerInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerInfo.fulfilled, (state, payload) => {
        state.loading = false;
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload.payload));
      })
      .addCase(getCustomerInfo.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });

    // get user info reducer
  },
});

export const { addToken, addMessage, addUser, logout } = authSlice.actions;

export default authSlice.reducer;
