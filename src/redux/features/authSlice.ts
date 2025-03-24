// src/redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  name: string;
  role: string;
  email: string;
  token: string;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
