import { DateTimeTask, SuccessCriteria } from "./index";

type TaskBody = {
  id: string;
  title: string;
  description: string;
  successCriteria: SuccessCriteria[];
  externalFactor: number;
  reward: string;
  createAt: Date;
  goalId: string;
  duration: DateTimeTask;
  status: "draft" | "progress" | "success" | "failed";
};

export type Task = TaskBody | null;
