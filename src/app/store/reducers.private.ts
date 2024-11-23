import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/features/auth";
import { stepReducer } from "@/features/steps";

export const store = configureStore({
  reducer: {
    user: userReducer,
    create: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
