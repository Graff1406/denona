import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type AuthUser } from "@/shared/firebase/public";

export type UserState = {
  auth: AuthUser | null;
};

const initialState: UserState = {
  auth: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.auth = action.payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
