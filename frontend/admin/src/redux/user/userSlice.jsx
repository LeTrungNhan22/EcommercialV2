import userApi from "../../api/User/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
//get list user
export const getUserFilter = createAsyncThunk(
  "user/getUserFilter",
  async (params, thunkAPI) => {
    const userList = await userApi.getUserFilter();
    const { resultList } = userList;
    return resultList;
  }
);
// get uset by id
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, thunkAPI) => {
    const user = await userApi.getUserById(id);
    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
  },
  reducers: {},
  extraReducers: {
    [getUserFilter.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;
