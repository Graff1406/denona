import { FC, useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

// Features

import { useUserStore } from "@/features/auth";
import {
  calculateStatusDurations,
  calculateBreakDuration,
  BottleneckProgress,
} from "@/features/bottleneck";

// Entities

import {
  Goal,
  Task,
  SelectDateTime,
  UserSetting,
  DateTimeTask,
} from "@/entities/models";
import { getDocumentsFromSubCollection } from "@/entities/firebase";

// Shared

import { DeDateTimePicker, DeTaskList } from "@/shared/ui";
import { USERS, TASKS, USER_SETTINGS } from "@/shared/constants";
import { convertTimestampToDate } from "@/shared/helpers";
import { useTranslations } from "@/shared/hooks";

type TaskWithTimestamp = Omit<Task, "duration"> & {
  duration: Omit<Task["duration"], "date"> & {
    date: Timestamp;
  };
};

interface ExpectedResultsProps {
  goal: Goal | null;
  onSelectDuration: (duration: DateTimeTask | null) => void;
  onValidationChange: (validationResult: boolean) => void;
}

const ChooseDateTimeTask: FC<ExpectedResultsProps> = ({
  goal,
  onSelectDuration,
  onValidationChange,
}) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

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

  const getTasks = async (duration: SelectDateTime) => {
    if (user?.auth?.uid) {
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

  const handleSelectTaskDateTime = (duration: SelectDateTime) => {
    const { date, time } = duration;
    const valid = !!date && !!time;

    onValidationChange(valid);

    if (date instanceof Date && time) onSelectDuration({ date, ...time });
    else onSelectDuration(null);
  };

  const handleDateSelect = (duration: SelectDateTime) => {
    setSelectedDate(duration);
    getTasks(duration);

    handleSelectTaskDateTime(duration);
  };

  // Hooks

  useEffect(() => {
    getDefaultBreak();
  }, []);

  return (
    <div className="space-y-3 relative w-full">
      <h2>{$t.createTaskDefineTimeDurationStepTitle}</h2>
      <div
        className={[
          "animation sticky top-4 z-10 bg-white dark:bg-zinc-800",
          selectedDate?.date
            ? "visible opacity-100 max-h-40"
            : "invisible opacity-0 max-h-0",
        ].join(" ")}
      >
        <BottleneckProgress tasksDuration={sumTasksAndBreakDuration} />
      </div>

      {goal && (
        <div className="border dark:border-zinc-700 rounded-md shadow-md py-3">
          <DeDateTimePicker
            tasks={tasks}
            loadingTasks={loadingTasks}
            timeRange
            onSelect={handleDateSelect}
            defaultBreakRange={defaultBreak}
            minDate={goal.date.start}
            maxDate={goal.date.end}
          />
        </div>
      )}

      <div className="space-y-3 pb-4">
        {!!tasks?.length && (
          <>
            <div className="divider my-6"></div>
            <p className="text-end font-semibold">
              {$t.createTaskCalendarAllTasksTitle}
            </p>
            <DeTaskList tasks={tasks} user={user} defaultBreak={defaultBreak} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseDateTimeTask;
