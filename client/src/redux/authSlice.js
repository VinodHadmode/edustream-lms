import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    authInitialized: (state) => {
      state.isLoading = false;
    },
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut,authInitialized } = authSlice.actions;
export default authSlice.reducer;
