import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("bloodCareToken");
const storedUser = localStorage.getItem("bloodCareUser");

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  role: storedUser ? JSON.parse(storedUser).role : null,
  isAuthenticated: Boolean(storedToken),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
      state.role = user.role;
      state.isAuthenticated = true;

      localStorage.setItem("bloodCareToken", token);
      localStorage.setItem("bloodCareUser", JSON.stringify(user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("bloodCareToken");
      localStorage.removeItem("bloodCareUser");
    },

    updateUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;

      localStorage.setItem(
        "bloodCareUser",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  login,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;