import { FC, useState, useEffect, ReactNode } from "react";

// Component

import ListItem from "../list/ListItem.private";
import List from "../list/List.private";

// const GoalPool: FC<GoalPoolProps> = ({}) => {

// Features

import { useUserStore } from "@/features/auth";

// Entities

import { Sphere, Goal } from "@/entities/models";

import { getDocumentsFromSubCollection } from "@/entities/firebase";

// Shared

import { DeSkeletonList } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
import { USERS, GOALS } from "@/shared/constants";

interface GoalPoolProps {
  sphere?: Sphere | null;
  scrollDirectionY?: "down" | "up" | null;
  children?: ReactNode;
  items?: Goal[];
  isChosenItem?: Goal;
  onSelectGoal?: (goal: Goal) => void;
}

const GoalPool: FC<GoalPoolProps> = ({
  sphere,
  scrollDirectionY,
  items = [],
  isChosenItem,
  onSelectGoal,
}) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  // States

  const [loadingGoalList, setLoadingGoalList] = useState(false);
  const [goalList, setGoalList] = useState<Goal[]>(items);
  const [goal, setGoal] = useState<Goal>();

  // Methods

  const getGoalList = async (): Promise<void> => {
    try {
      if (user?.auth?.uid && sphere) {
        setLoadingGoalList(true);
        const res = await getDocumentsFromSubCollection<Goal>({
          parentCollection: USERS,
          parentId: user?.auth?.uid,
          subcollection: GOALS,
          field: "lifeSphereId",
          value: sphere.id,
        });

        if (Array.isArray(res)) {
          const list = [...res, ...items];
          setGoalList(list);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingGoalList(false);
    }
  };

  const handleChooseGoalItem = (item: Goal) => {
    if (item?.id === goal?.id) setGoal(undefined);
    else setGoal(item);

    if (onSelectGoal) onSelectGoal(item);
  };

  // Hooks

  useEffect(() => {
    getGoalList();
  }, [sphere]);

  useEffect(() => {
    if (items.length) {
      const list = [...items, ...goalList];
      setGoalList(list);
    }
  }, [items]);
  useEffect(() => {
    if (isChosenItem) handleChooseGoalItem(isChosenItem);
  }, [isChosenItem]);

  return (
    <div className="space-y-4">
      {/* <h2 className="flex gap-3 justify-center items-center">
        <span>Goal List</span>
        {loadingGoalList && (
          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
        )}
      </h2> */}

      <div>
        <DeSkeletonList loading={loadingGoalList} limit={5}>
          <>
            {goalList?.length ? (
              <List items={goalList}>
                {(item: Goal) => (
                  <ListItem
                    value={goal?.id ?? ""}
                    scrollDirectionY={scrollDirectionY}
                    key={item?.id}
                    id={item?.id ?? "dffjjr"}
                    label={item?.title ?? ""}
                    hint={item?.description ?? ""}
                    onClick={() => handleChooseGoalItem(item)}
                  />
                )}
              </List>
            ) : (
              <p className="p-3 bg-zinc-100 dark:bg-zinc-600 rounded-md">
                {$t.appGoalPageHaveNotChoose}
              </p>
            )}
          </>
        </DeSkeletonList>
      </div>
    </div>
  );
};

export default GoalPool;
