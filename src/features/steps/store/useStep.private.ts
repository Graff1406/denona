import { setHistory, setSphere, setGoal, setTask, Step } from "./step.private";

// Entities

import { Sphere, Goal, Task } from "@/entities/models";

// Shared

import { useAppSelector, useAppDispatch } from "@/shared/hooks";

type StepStoreHook = {
  storeStep: Step;
  dispatchSphere: (sphere: Sphere) => void;
  dispatchGoal: (goal: Goal) => void;
  dispatchTask: (task: Task) => void;
  dispatchHistory: (prop: string, step: number) => void;
};

export default (): StepStoreHook => {
  const storeStep: Step = useAppSelector((state) => state.create);
  const dispatch = useAppDispatch();

  return {
    storeStep,
    dispatchSphere: (sphere: Sphere) => dispatch(setSphere(sphere)),
    dispatchGoal: (goal: Goal) => dispatch(setGoal(goal)),
    dispatchTask: (task: Task) => dispatch(setTask(task)),
    dispatchHistory: (prop: string, value: number) =>
      dispatch(setHistory({ prop, value })),
  };
};
