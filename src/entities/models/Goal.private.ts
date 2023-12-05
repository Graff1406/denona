export type Goal = {
  title: string;
  date: {
    start?: Date;
    end?: Date;
  };
  description?: string;
  successCriteria?: string;
  reward?: string;
  labels?: string[];
  id: string;
  lifeSphereId?: string;
  status: "draft" | "progress" | "success" | "failed";
};
