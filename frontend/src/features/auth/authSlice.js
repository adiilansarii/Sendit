// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse localStorage
const getSafeUser = () => {
  const user = localStorage.getItem("user");
  if (!user || user === "undefined") return null; // Safety check
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: getSafeUser(), // Use the helper here
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;