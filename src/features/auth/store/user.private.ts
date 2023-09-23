import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Entities

import { User, Auth } from "@/entities/models";

const initialState: Auth = {
  auth: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.auth = action.payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
