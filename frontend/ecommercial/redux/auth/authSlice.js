import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/auth/authApi";
import { toast } from "react-hot-toast";

const initialState = {
  user: {},
  accessToken: null,
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
export const getCustomerInfoByToken = createAsyncThunk(
  "auth/getCustomerInfo",
  async (payload, thunkAPI) => {
    try {
      const response = await authApi.getCustomerInfoByToken(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// update user info
export const updateInfoBasic = createAsyncThunk(
  "auth/updateInfoBasic",
  async ({ userId, data }, payload, thunkAPI) => {
    try {
      const response = await authApi.updateInfoBasic(userId, data, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateAddress = createAsyncThunk(
  "auth/updateAddress",
  async ({ userId, data }, payload, thunkAPI) => {
    try {
      const response = await authApi.updateAddress(userId, data, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// get user info by id
export const getUserInfoById = createAsyncThunk(
  "auth/getUserInfoById",
  async ({ userId }, payload, thunkAPI) => {
    try {
      const response = await authApi.getUserInfoById(userId, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// create shop
export const createShop = createAsyncThunk(
  "auth/createShop",
  async ({ params, data }, payload, thunkAPI) => {
    try {
      const response = await authApi.createShop(params, data, payload);
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
      localStorage.removeItem("cartItems");
      localStorage.clear();
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
            localStorage.setItem("userId", JSON.stringify(data.userId));
            localStorage.setItem("mailCode", data.code);
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
        (state, { payload: { message, status, data } }) => {
          state.loading = false;
          if (status === 1) {
            state.accessToken = data;
            toast.success(message);
          } else {
            // toast.error(`${message} (${data})`);
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
      .addCase(getCustomerInfoByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerInfoByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getCustomerInfoByToken.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });

    // update user info reducer
    builder
      .addCase(updateInfoBasic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInfoBasic.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(updateInfoBasic.rejected, (state, action) => {
        state.loading = false;
        // state.errorMessage = action.payload.message;
      });

    // get user info by id reducer
    builder
      .addCase(getUserInfoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfoById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Cập nhật thông tin thành công");
      })
      .addCase(getUserInfoById.rejected, (state, action) => {
        state.loading = false;
        // state.errorMessage = action.payload.message;
      });
    // update address reducer
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Cập nhật thông tin địa chỉ thành công");
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        // state.errorMessage = action.payload.message;
        toast.error(
          "Cập nhật thông tin địa chỉ không  thành công vui lòng thử lại"
        );
      });
    // create shop reducer
    builder

      .addCase(createShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Tạo shop thành công");
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        // state.errorMessage = action.payload.message;
        toast.error("Tạo shop không thành công vui lòng thử lại");
      });
  },
});

export const { addToken, addMessage, addUser, logout } = authSlice.actions;

export default authSlice.reducer;
