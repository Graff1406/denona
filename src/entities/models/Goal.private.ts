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
  lifeSphereId?: string;
  status?: "draft" | "progress" | "success" | "failed";
  id?: string;
};
