import { Task, Duration } from "@/entities/models";

export const calculateBreakDuration = (
  tasks: Task[],
  defaultBreak: string
): Record<Task["status"], Duration> => {
  const breakDurations: Record<Task["status"], Duration> = {} as Record<
    Task["status"],
    Duration
  >;

  tasks.forEach((task) => {
    const breakTime = task.duration.break || defaultBreak;
    const [breakHours, breakMinutes] = breakTime.split(":").map(Number);
    const status = task.status as Task["status"];
    if (!breakDurations[status]) {
      breakDurations[status] = { hours: 0, minutes: 0, milliseconds: 0 };
    }
    breakDurations[status as keyof typeof breakDurations].hours += breakHours;
    breakDurations[status as keyof typeof breakDurations].minutes +=
      breakMinutes;
  });

  for (const key in breakDurations) {
    const { hours, minutes } = breakDurations[key as Task["status"]];
    breakDurations[key as Task["status"]].milliseconds =
      hours * 3600000 + minutes * 60000;
  }

  return breakDurations;
};
