export type Task = {
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
};
