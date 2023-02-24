import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://63f888c96978b1f9105b7df5.mockapi.io/api/v1/user",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();

      for (let i = 0; i < data.length; i++) {
        if (data[i].email === email) {
          console.log(data[i]);
          return data[i];
        }
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://63f888c96978b1f9105b7df5.mockapi.io/api/v1/user",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        return { ...data, name: name, email: email, password: password };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  value: {
    name: "",
    email: "",
    password: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.value.isError = false;
      state.value.isSuccess = false;
      state.value.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.value.email = payload.email;
      state.value.password = payload.password;
      state.value.isFetching = false;
      state.value.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.value.isFetching = false;
      state.value.isError = true;
      state.value.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.value.isFetching = true;
    },

    [signupUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.value.isFetching = false;
      state.value.isSuccess = true;
      state.value.email = payload.user.email;
      state.value.name = payload.user.name;
      state.value.password = payload.user.password;
    },
    [signupUser.pending]: (state) => {
      state.value.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.value.isFetching = false;
      state.value.isError = true;
      state.value.errorMessage = payload.message;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user.value;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
