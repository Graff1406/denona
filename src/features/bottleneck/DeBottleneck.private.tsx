import { FC, useState, useEffect } from "react";

// Features

import { useUserStore } from "@/features/auth";

// Entities

import { UserSetting } from "@/entities/models";
import {
  getDocumentsFromSubCollection,
  updateSubCollectionDocument,
} from "@/entities/firebase";

// Shared

import { DeDropdownButton } from "@/shared/ui";
import { USERS, USER_SETTINGS } from "@/shared/constants";
import { useTranslations } from "@/shared/hooks";

type SettingActivity = { start: string; end: string; name: string; id: string };

interface BottleneckProps {
  tasksDuration: number;
}

const generateHourStrings = (): string[] => {
  const hoursArray: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, "0");
    hoursArray.push(`${hourString}:00`);
  }

  return hoursArray;
};

// Static

const hourList = generateHourStrings();
const startHourList = hourList?.filter(
  (_, index: number) => index !== hourList.length - 1
);

const DeBottleneck: FC<BottleneckProps> = ({ tasksDuration }) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  // States

  const [percentageDifference, setPercentageDifference] = useState<number>(0);
  const [isOverfilled, setIsOverfilled] = useState(false);
  const [userActivityDuration, setUserActivityDuration] = useState(57600000);
  const [loading, setLoading] = useState(false);
  const [settingActivity, setSettingActivity] = useState<SettingActivity>();
  const [endHourList, setEndHourList] = useState<string[]>([]);

  // Methods

  const filterAndGenerateHourStrings = (startTime: string): string[] => {
    const hoursArray: string[] = [];
    let foundStart = false;

    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, "0");
      const currentTime = `${hourString}:00`;

      if (foundStart) {
        hoursArray.push(currentTime);
      }

      if (currentTime === startTime) {
        foundStart = true;
      }
    }

    return hoursArray;
  };

  const calculateMillisecondsDifference = (
    start: string,
    end: string
  ): number => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    const difference = endDate.getTime() - startDate.getTime();

    return difference;
  };

  const getActivityTime = async () => {
    if (user?.auth?.uid) {
      try {
        setLoading(true);
        const ACTIVITY = "activity";
        const listSettings = await getDocumentsFromSubCollection<UserSetting>({
          parentCollection: USERS,
          parentId: user?.auth?.uid,
          subcollection: USER_SETTINGS,
          field: "name",
          value: ACTIVITY,
        });

        const setting = listSettings.find(
          (setting) => setting.name === ACTIVITY
        ) as SettingActivity;

        if (setting?.name) {
          setSettingActivity(setting);
          setUserActivityDuration(
            calculateMillisecondsDifference(setting.start, setting.end)
          );
          setEndHourList(filterAndGenerateHourStrings(setting.start));
        }

        console.log(111, setting.start, setting.end);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectStart = async (
    time: string,
    propName: string
  ): Promise<void> => {
    if (settingActivity?.id && user?.auth?.uid) {
      try {
        setLoading(true);
        const data = { ...settingActivity, [propName]: time };
        await updateSubCollectionDocument({
          parentCollection: USERS,
          parentId: user?.auth?.uid,
          subcollection: USER_SETTINGS,
          documentId: settingActivity?.id,
          data,
        });

        setSettingActivity(data);
        setEndHourList(filterAndGenerateHourStrings(data.start));
      } catch (err) {
        console.log("handleSelectStart", err);
      } finally {
        setLoading(false);
      }
    }
    console.log(time);
  };

  // Hooks

  useEffect(() => {
    getActivityTime();
  }, []);

  useEffect(() => {
    setPercentageDifference(
      Math.round((tasksDuration / userActivityDuration) * 100)
    );
    setIsOverfilled(tasksDuration >= userActivityDuration);
  }, [tasksDuration]);

  return (
    <div className="relative border dark:border-zinc-700 rounded-md p-3 space-y-3 shadow-md">
      <div className="relative w-full h-6 rounded text-xs font-semibold">
        <div
          className={[
            "absolute h-6 rounded flex justify-center items-center animation",
            isOverfilled ? "bg-red-500" : "bg-[#45BCED]",
          ].join(" ")}
          style={{
            width: `${
              percentageDifference >= 100 ? 100 : percentageDifference
            }%`,
          }}
        >
          {!!percentageDifference && (
            <span className="text-white">{`${percentageDifference}%`}</span>
          )}
        </div>
        <div
          className={[
            "pr-2 flex h-6 justify-end items-center bg-zinc-200 dark:bg-zinc-600 rounded",
          ].join(" ")}
        >
          <span>{Math.round(100 - percentageDifference)}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <DeDropdownButton
          small
          loading={loading}
          buttonTitle={settingActivity?.start || ""}
          options={startHourList}
          onSelect={(time: string) => handleSelectStart(time, "start")}
        />

        <div className="flex grow items-center px-1.5 gap-1.5">
          <div className="divider"></div>
          <span className="text-sm">{$t.appBottleneckActivityLabel}</span>
          <div className="divider"></div>
        </div>

        <DeDropdownButton
          small
          loading={loading}
          buttonTitle={settingActivity?.end || ""}
          options={endHourList}
          onSelect={(time: string) => handleSelectStart(time, "end")}
        />
      </div>
    </div>
  );
};

export default DeBottleneck;
