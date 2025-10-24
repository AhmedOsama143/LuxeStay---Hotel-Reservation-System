import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      return JSON.parse(savedAuth);
    }
  } catch (error) {
    console.error("Error loading auth state:", error);
  }
  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
