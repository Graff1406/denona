import { Goal, Sphere } from ".";

export type CombinedTask = {
  id: string;
  title: string;
  createAt: Date;
  goalId: string;
  duration: {
    date: Date;
    time: { start: string; end: string };
    break?: string;
  };
  status: "draft" | "progress" | "success" | "failed";
  goal?: Goal;
  lifeSphere?: Sphere;
  breakInterval: { start: string; end: string };
};
