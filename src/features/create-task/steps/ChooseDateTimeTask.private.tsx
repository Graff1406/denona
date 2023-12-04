import { FC, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

// Features

import { useUserStore } from "@/features/auth";
import { calculateStatusDurations } from "@/features/bottleneck";

// Entities

import {
  Goal,
  Task,
  SelectDateTime,
  UserSetting,
  Duration,
} from "@/entities/models";
import {
  addDocumentToSubCollection,
  getDocumentsFromSubCollection,
} from "@/entities/firebase";

// Shared

import { DeDateTimePicker, DeBottleneck } from "@/shared/ui";
import { USERS, TASKS, USER_SETTINGS } from "@/shared/constants";
import { convertTimestampToDate } from "@/shared/helpers";
import { calculateBreakDuration } from "@/features/bottleneck/calculateBreakDuration.private";

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
  const [defaultBreak, setDefaultBreak] = useState("");
  const [sumTasksAndBreakDuration, setSumTasksAndBreakDuration] = useState(0);

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

  const getTasksAndBreakDuration = (tasks: Task[]) => {
    const tasksInProgress = tasks.filter((task) => task.status === "progress");
    const tasksDuration = calculateStatusDurations(tasksInProgress);
    const breaksDuration = calculateBreakDuration(
      tasksInProgress,
      defaultBreak
    );

    return { tasksDuration, breaksDuration };
  };

  // const sumAllSlatedTimeTaskInProgress = (tasksDuration: {
  //   progress: Duration;
  // }): string => {
  //   if (tasksDuration.progress) {
  //     const hour =
  //       tasksDuration.progress.hours < 10
  //         ? `0${tasksDuration.progress.hours}`
  //         : tasksDuration.progress.hours;
  //     const minutes =
  //       tasksDuration.progress.minutes < 10
  //         ? `0${tasksDuration.progress.minutes}`
  //         : tasksDuration.progress.minutes;

  //     return `${hour}:${minutes}`;
  //   } else return "";
  // };

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

        const { tasksDuration, breaksDuration } = getTasksAndBreakDuration(
          handleTaskDate(dataTasks)
        );

        setTasks(handleTaskDate(dataTasks));

        if (tasksDuration.progress)
          setSumTasksAndBreakDuration(
            tasksDuration.progress.milliseconds +
              breaksDuration.progress.milliseconds
          );
        else setSumTasksAndBreakDuration(0);
      } catch (r) {
        console.log(r);
      } finally {
        setLoadingTasks(false);
      }
    }
  };

  const getDefaultBreak = async () => {
    try {
      setLoadingTasks(true);
      if (user?.auth?.uid) {
        const dataBreak = await getDocumentsFromSubCollection<UserSetting>({
          parentCollection: USERS,
          parentId: user?.auth?.uid,
          subcollection: USER_SETTINGS,
          field: "name",
          value: "break",
        });

        if (dataBreak.length) {
          const userSettingsBreak = dataBreak.find(
            (data) => data.name === "break"
          );
          setDefaultBreak(userSettingsBreak?.duration ?? "");
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleDateSelect = (duration: SelectDateTime) => {
    setSelectedDate(duration);
    getTasks(duration);
  };

  // Hooks

  useEffect(() => {
    getDefaultBreak();
  }, []);

  return (
    <div>
      {/* <h2>Choose Date and time for execution the task</h2> */}
      {/* <div className="divider my-4 tablet:my-6"></div> */}

      <DeDateTimePicker
        tasks={tasks}
        loadingTasks={loadingTasks}
        timeRange
        onSelect={handleDateSelect}
        defaultBreakRange={defaultBreak}
        minDate={goal.date.start}
        maxDate={goal.date.end}
      />
      <div className="divider my-6"></div>
      <div
        className={[
          "animation",
          selectedDate?.date ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      >
        <DeBottleneck
          userActivityDuration={57600000}
          tasksDuration={sumTasksAndBreakDuration}
        />
      </div>
    </div>
  );
};

export default ChooseDateTimeTask;
