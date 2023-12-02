import { FC, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

// Features

import { useUserStore } from "@/features/auth";
import { calculateStatusDurations } from "@/features/bottleneck";

// Entities

import { Goal, Task, SelectDateTime } from "@/entities/models";
import {
  addDocumentToSubCollection,
  getDocumentsFromSubCollection,
} from "@/entities/firebase";

// Shared

import { DeDateTimePicker } from "@/shared/ui";
import { USERS, TASKS } from "@/shared/constants";
import { convertTimestampToDate } from "@/shared/helpers";

type TaskWithTimestamp = Omit<Task, "duration"> & {
  duration: Omit<Task["duration"], "date"> & {
    date: Timestamp;
  };
};

interface ExpectedResultsProps {
  goal: Goal;
  duration?: {
    date: Date;
    start: string;
    end: string;
  };
}

const ChooseDateTimeTask: FC<ExpectedResultsProps> = ({ goal }) => {
  // Use

  const { user } = useUserStore();

  // State

  const [tasks, setTasks] = useState<Task[]>();
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectDateTime>();
  const [durationSlatedTime, setDurationSlatedTime] = useState("");

  // Method

  const handleTaskDate = (tasks: TaskWithTimestamp[]) => {
    return tasks.map((task) => ({
      ...task,
      duration: {
        ...task.duration,
        date: convertTimestampToDate(task.duration.date),
      },
    }));
  };

  const sumAllSlatedTimeTaskInProgress = (tasks: Task[]): string => {
    const tasksInProgress = tasks.filter((task) => task.status === "progress");

    if (tasksInProgress.length) {
      const time = calculateStatusDurations(tasksInProgress);
      const hour =
        time.progress.hours < 10
          ? `0${time.progress.hours}`
          : time.progress.hours;
      const minutes =
        time.progress.minutes < 10
          ? `0${time.progress.minutes}`
          : time.progress.minutes;

      return `${hour}:${minutes}`;
    } else return "";
  };

  const getTasks = async (duration: SelectDateTime) => {
    if (user?.auth?.uid) {
      // await addDocumentToSubCollection({
      //   parentCollection: USERS,
      //   parentId: user?.auth?.uid,
      //   subCollection: TASKS,
      //   data: {
      //     status: "success",
      //     duration: {
      //       date: duration.date,
      //       time: { start: "07:00", end: "07:30" },
      //     },
      //   },
      // });
      try {
        setLoadingTasks(true);
        const dataTasks =
          await getDocumentsFromSubCollection<TaskWithTimestamp>({
            parentCollection: USERS,
            parentId: user?.auth?.uid,
            subcollection: TASKS,
            field: "duration.date",
            value: duration?.date,
          });

        setTasks(handleTaskDate(dataTasks));
        setDurationSlatedTime(
          sumAllSlatedTimeTaskInProgress(handleTaskDate(dataTasks))
        );
      } catch (r) {
        console.log(r);
      } finally {
        setLoadingTasks(false);
      }
    }
  };

  const handleDateSelect = (duration: SelectDateTime) => {
    setSelectedDate(duration);
    getTasks(duration);
  };

  // Hooks

  return (
    <div>
      {/* <h2>Choose Date and time for execution the task</h2> */}
      {/* <div className="divider my-4 tablet:my-6"></div> */}

      <DeDateTimePicker
        tasks={tasks}
        loadingTasks={loadingTasks}
        timeRange
        onSelect={handleDateSelect}
        defaultBreakRange="00:15"
        minDate={goal.date.start}
        maxDate={goal.date.end}
      />
      <div className="divider"></div>
      {!!tasks?.length && (
        <section>
          <p>Total times on chose date: {durationSlatedTime}</p>
        </section>
      )}
    </div>
  );
};

export default ChooseDateTimeTask;
