import { SuccessCriteria } from "./index";

export type DurationGoal = {
  start?: Date;
  end?: Date;
};

type GoalBody = {
  title: string;
  date: DurationGoal;
  description?: string;
  successCriteria?: SuccessCriteria[];
  reward?: string;
  labels?: string[];
  lifeSphereId?: string;
  status?: "draft" | "progress" | "success" | "failed";
  id?: string;
};

export type Goal = GoalBody | null;
