import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Entities

import { Sphere, Goal, Task } from "@/entities/models";

export interface Step {
  sphere: Sphere;
  goal: Goal;
  task: Task;
  history: {
    sphere: number;
    goal: number;
    task: number;
  };
}

const initialState: Step = {
  sphere: null,
  goal: null,
  task: null,
  history: {
    sphere: 0,
    goal: 0,
    task: 0,
  },
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setSphere: (state, action: PayloadAction<Sphere>) => {
      state.sphere = action.payload;
    },
    setGoal: (state, action: PayloadAction<Goal>) => {
      state.goal = action.payload;
    },
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    setHistory: (
      state,
      action: PayloadAction<{ prop: string; value: number }>
    ) => {
      state.history = {
        ...state.history,
        [action.payload.prop]: action.payload.value,
      };
    },
  },
});

export const { setSphere, setGoal, setTask, setHistory } = stepSlice.actions;

export default stepSlice.reducer;
