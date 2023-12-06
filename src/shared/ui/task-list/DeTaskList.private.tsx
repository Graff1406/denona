import { FC, useState, useEffect } from "react";

// Entities

import { Goal, Sphere, Task, Auth, CombinedTask } from "@/entities/models";
import {
  getDocumentsByIds,
  getDocumentsFromSubCollectionByIds,
} from "@/entities/firebase";

// Shared

import { GENERATED_LIFE_SPHERES, GOALS, USERS } from "@/shared/constants";
import { useTranslations } from "@/shared/hooks";

// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  tasks: Task[];
  user: Auth;
  defaultBreak: string;
}

const DeTaskList: FC<Props> = ({ tasks, user, defaultBreak }) => {
  // State

  const [goals, setGoals] = useState<Goal[]>();
  const [lifeSpheres, setLifeSpheres] = useState<Sphere[]>();
  const [combinedTasks, setCombinedTasks] = useState<CombinedTask[]>();
  const [loading, setLoading] = useState(false);

  // use

  const { $t } = useTranslations();

  // Methods

  const createTimeInterval = (
    start: string,
    duration: string
  ): {
    start: string;
    end: string;
  } => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [durationHours, durationMinutes] = duration.split(":").map(Number);

    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes =
      totalStartMinutes + durationHours * 60 + durationMinutes;

    const endHours = Math.floor(totalEndMinutes / 60);
    const endMinutes = totalEndMinutes % 60;

    const formattedEndHours = endHours.toString().padStart(2, "0");
    const formattedEndMinutes = endMinutes.toString().padStart(2, "0");

    const end = `${formattedEndHours}:${formattedEndMinutes}`;

    return { start, end };
  };

  const getUniqueIds = (
    array: any[],
    fieldName: string,
    localObjects?: any[]
  ): string[] => {
    return localObjects?.length
      ? Array.from(
          new Set(
            array
              .map((item) => item[fieldName])
              .filter((id) => !localObjects?.some((goal) => goal?.id === id))
          )
        )
      : Array.from(new Set(array.map((item) => item[fieldName])));
  };

  const handleCombineTasks = (
    goalList: Goal[],
    lifeSphereList: Sphere[]
  ): CombinedTask[] => {
    return tasks.map((task: Task) => {
      const goal = goalList?.find((goal: Goal) => goal.id === task.goalId);
      const lifeSphere = lifeSphereList?.find(
        (ls: Sphere) => goal?.lifeSphereId === ls.id
      );
      return {
        ...task,
        goal,
        lifeSphere,
        breakInterval: createTimeInterval(
          task.duration.time.end,
          task.duration.break || defaultBreak
        ),
      };
    });
  };

  const sortTasksByTimeStart = (list: CombinedTask[]): CombinedTask[] => {
    return list.sort((taskA, taskB) => {
      const [hoursA, minutesA] = taskA.duration.time.start
        .split(":")
        .map(Number);
      const [hoursB, minutesB] = taskB.duration.time.start
        .split(":")
        .map(Number);

      const timeA = hoursA * 60 + minutesA;
      const timeB = hoursB * 60 + minutesB;

      return timeA - timeB;
    });
  };

  const getGoalsByIds = async (ids: string[]): Promise<Goal[]> => {
    return await getDocumentsFromSubCollectionByIds<Goal>({
      parentCollection: USERS,
      parentId: user?.auth?.uid ?? "",
      subcollection: GOALS,
      documentIds: ids,
    });
  };

  const getLifeSpheresByIds = async (ids: string[]): Promise<Sphere[]> => {
    return await getDocumentsByIds<Sphere>({
      collectionName: GENERATED_LIFE_SPHERES,
      documentIds: ids,
    });
  };

  const initData = async () => {
    try {
      const goalIds = getUniqueIds(tasks, "goalId", goals);

      if (goalIds.length) {
        setLoading(true);
        const goalList = await getGoalsByIds(goalIds);

        if (goalList.length) {
          setGoals(goalList);
          const LSIds = getUniqueIds(goalList, "lifeSphereId", lifeSpheres);
          const lifeSphereList = await getLifeSpheresByIds(LSIds);

          if (lifeSphereList.length) {
            setLifeSpheres(lifeSphereList);
            const list = handleCombineTasks(goalList, lifeSphereList);
            setCombinedTasks(sortTasksByTimeStart(list));
          }
        }
      } else {
        if (goals?.length && lifeSpheres?.length) {
          const list = handleCombineTasks(goals, lifeSpheres);
          setCombinedTasks(sortTasksByTimeStart(list));
        }
      }
    } catch (error) {
      console.log(2222, error);
    } finally {
      setLoading(false);
    }
  };

  // Hooks

  useEffect(() => {
    initData();
  }, [tasks]);

  return (
    <ul className="space-y-3 mb-6 text-start">
      {!loading ? (
        combinedTasks?.map((task) => (
          <li
            key={task.id}
            className={[
              "border dark:border-zinc-700 rounded-md shadow-md p-2",
            ].join(" ")}
          >
            <ul>
              <li className="text-base tablet:text-lg truncate text-center">
                {task.title}
              </li>
              <li className="divider my-2"></li>
              <li className="text-sm tablet:text-base py-1.5">
                <p>
                  <span className="font-semibold truncate pr-1">
                    {$t.createTaskCalendarSingleTaskGoalLabel}:{" "}
                  </span>
                  {task.goal?.title}
                </p>
                <p>
                  <span className="font-semibold truncate pr-1">
                    {$t.createTaskCalendarSingleTaskSphereLabel}:{" "}
                  </span>
                  {task.lifeSphere?.en.label}
                </p>
              </li>
              <li className="text-end text-sm">
                <p>${$t.taskStatus}</p>
                <p className="text-green-500 dark:text-green-800">{`${task.duration.time.start} - ${task.duration.time.end}`}</p>
              </li>

              <li className="divider my-2"></li>
              <li className="text-end text-sm">
                <p>{$t.appTaskBreakLabel}</p>
                <p className="text-yellow-500 dark:text-yellow-800">{`${task.breakInterval.start} - ${task.breakInterval.end}`}</p>
              </li>
            </ul>
          </li>
        ))
      ) : (
        <li className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin" />
        </li>
      )}
    </ul>
  );
};

export default DeTaskList;
