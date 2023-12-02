import { Task } from "@/entities/models";
interface Duration {
  hours: number;
  minutes: number;
  milliseconds: number;
}

interface StatusDurations {
  [status: string]: Duration;
}

const sumDurations = (durations: Duration[]): Duration => {
  const totalDuration: Duration = { hours: 0, minutes: 0, milliseconds: 0 };

  durations.forEach((duration) => {
    totalDuration.hours += duration.hours;
    totalDuration.minutes += duration.minutes;
    totalDuration.milliseconds += duration.milliseconds;
  });

  // Adjust overflow
  totalDuration.minutes += Math.floor(totalDuration.milliseconds / 60000);
  totalDuration.hours += Math.floor(totalDuration.minutes / 60);
  totalDuration.minutes %= 60;
  totalDuration.milliseconds =
    totalDuration.hours * 3600000 + totalDuration.minutes * 60000;

  return totalDuration;
};

const calculateDuration = (start: string, end: string): Duration => {
  const startTime = new Date(`1970-01-01T${start}:00.000Z`).getTime();
  const endTime = new Date(`1970-01-01T${end}:00.000Z`).getTime();

  const durationInMilliseconds = endTime - startTime;

  const hours = Math.floor(durationInMilliseconds / 3600000);
  const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
  const milliseconds = durationInMilliseconds % 60000;

  return { hours, minutes, milliseconds };
};

export const calculateStatusDurations = (tasks: Task[]): StatusDurations => {
  const statusDurations: StatusDurations = {};

  tasks.forEach((task) => {
    const duration = calculateDuration(
      task.duration.time.start,
      task.duration.time.end
    );

    if (!statusDurations[task.status]) {
      statusDurations[task.status] = { hours: 0, minutes: 0, milliseconds: 0 };
    }

    statusDurations[task.status].hours += duration.hours;
    statusDurations[task.status].minutes += duration.minutes;
    statusDurations[task.status].milliseconds += duration.milliseconds;
  });

  // Sum the durations for each status
  Object.keys(statusDurations).forEach((status) => {
    statusDurations[status] = sumDurations([statusDurations[status]]);
  });

  return statusDurations;
};
