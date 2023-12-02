export type Task = {
  id: string;
  duration: {
    date: Date;
    time: { start: string; end: string };
    break?: string;
  };
  status: "draft" | "progress" | "success" | "failed";
  goalId?: string;
};
