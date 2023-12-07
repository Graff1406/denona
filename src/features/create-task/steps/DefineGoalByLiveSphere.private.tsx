import { FC, useState, useEffect, ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

// Calendar

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";
import { useUserStore } from "@/features/auth";

// Entities

import { Sphere, Task, Goal } from "@/entities/models";

import { getDocumentsFromSubCollection } from "@/entities/firebase";

// Shared

import { DeField, DeTextarea } from "@/shared/ui";
import { USERS, TASKS } from "@/shared/constants";
import { dateTimeFormat } from "@/shared/helpers";
import { useTranslations } from "@/shared/hooks";

type InvalidGoal = {
  title: boolean;
  date: boolean;
  dirty: {
    title: boolean;
    date: boolean;
  };
};

type MinMaxDate = {
  minDate: Date | undefined;
  maxDate: Date | undefined;
};

let datepicker: {
  update: ({
    minDate,
    maxDate,
  }: {
    minDate: Date | undefined;
    maxDate: Date | undefined;
  }) => void;
};

interface Props {
  choseSL: Sphere;
  onChange: (goal: Goal) => void;
  onCheckInvalid?: (isValid: boolean) => void;
}

const DefineGoalByLiveSphere: FC<Props> = ({
  choseSL,
  onChange,
  onCheckInvalid,
}) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  // State

  const [printDate, setPrintDate] = useState("");
  const [holdOldTitleForGPT, setHoldOldTitleForGPT] = useState("");
  const [loadingTasksByGoal, setLoadingTasksByGoal] = useState<boolean>(false);
  const [goal, setGoal] = useState<Goal>({
    title: "",
    date: {},
  });
  const [invalid, setInvalid] = useState<InvalidGoal>({
    title: true,
    date: true,
    dirty: {
      title: false,
      date: false,
    },
  });

  // Methods

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setGoal((prevGoal: Goal) => ({ ...prevGoal, title: event.target.value }));
  };

  const handleTextarea = (
    event: ChangeEvent<HTMLTextAreaElement>,
    prop: string
  ) => {
    setGoal((prevGoal: Goal) => ({ ...prevGoal, [prop]: event.target.value }));
  };

  const handleDateSelect = ({ date }: { date: Date | Date[] }) => {
    if (Array.isArray(date) && date.length === 2) {
      setGoal((prevGoal: Goal) => ({
        ...prevGoal,
        date: { start: date[0], end: date[1] },
      }));
      const formatter = dateTimeFormat({
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const startDate = formatter.format(date[0]);
      const endDate = formatter.format(date[1]);
      setPrintDate(`${startDate} - ${endDate}`);
    }
  };

  const handleGenerateDescription = async (): Promise<void> => {
    const prompt = generatePrompt("goalDescription", {
      lifeSphere: `${choseSL.en.label}. ${choseSL.en.hint}`,
      title: goal.title,
      description: goal.description ?? "",
    });
    try {
      const res = await askGPT({
        content: prompt,
        max_tokens: 1000,
      });
      if (res.content) {
        const { labels } = JSON.parse(res.content) as {
          labels: string[];
        };
        setGoal({ ...goal, labels });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvalidDirty = (dirtyProp: string) => {
    setInvalid((prevInvalid: InvalidGoal) => ({
      ...prevInvalid,
      dirty: {
        ...prevInvalid.dirty,
        [dirtyProp]: true,
      },
    }));
  };

  const handleTitleBlur = () => {
    handleInvalidDirty("title");
    if (!invalid.title && goal.title !== holdOldTitleForGPT) {
      setHoldOldTitleForGPT(goal.title);
      handleGenerateDescription();
    }
  };
  const findMinMaxDates = (
    documents: Task[]
  ): { minDate?: Date; maxDate?: Date } | null => {
    if (!Array.isArray(documents) || documents.length === 0) {
      return null;
    }

    let minDate: Date | undefined = undefined;
    let maxDate: Date | undefined = undefined;

    documents.forEach((doc) => {
      const date = doc?.duration?.date;

      if (date instanceof Timestamp) {
        const jsDate = date.toDate();
        if (!minDate || jsDate < minDate) {
          minDate = jsDate;
        }
        if (!maxDate || jsDate > maxDate) {
          maxDate = jsDate;
        }
      } else if (date instanceof Date) {
        if (!minDate || date < minDate) {
          minDate = date;
        }
        if (!maxDate || date > maxDate) {
          maxDate = date;
        }
      }
    });

    return { minDate, maxDate };
  };

  const initCalendar = () => {
    const picker = document.querySelector(".air-datepicker");
    if (!picker)
      datepicker = new AirDatepicker("#date-time-picker-goal", {
        range: true,
        minDate: new Date(),
        multipleDatesSeparator: " - ",
        isMobile: true,
        buttons: ["today", "clear"],
        autoClose: true,
        onSelect: (date) => handleDateSelect(date),
      });
  };

  const getTasksByGoalId = async (): Promise<void> => {
    if (goal?.id && user?.auth?.uid) {
      try {
        setLoadingTasksByGoal(true);
        const res = await getDocumentsFromSubCollection<Task>({
          parentCollection: USERS,
          parentId: user?.auth?.uid,
          subcollection: TASKS,
          field: "goalId",
          value: goal?.id,
        });
        const calendar = findMinMaxDates(res) as MinMaxDate;
        if (datepicker?.update)
          datepicker.update({
            minDate: calendar.minDate,
            maxDate: calendar.maxDate,
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTasksByGoal(false);
      }
    }
  };

  // Hook

  useEffect(() => {
    initCalendar();
    getTasksByGoalId();
  }, []);

  useEffect(() => {
    setInvalid((prevInvalid: InvalidGoal) => ({
      ...prevInvalid,
      title: goal.title.split(" ").length < 3,
      date: !goal?.date?.end,
    }));

    onChange(goal);
  }, [goal]);

  useEffect(() => {
    const isValid = Object.values(invalid)
      .filter((value) => typeof value === "boolean")
      .every((value) => value === false);

    if (onCheckInvalid) onCheckInvalid(isValid);
  }, [invalid]);

  return (
    <div className="flex flex-col gap-4 tablet:gap-6 mb-10">
      <h2>{$t.createTaskPageAddNewGoal}</h2>
      <DeField
        value={goal.title}
        errorMessage={invalid.title && invalid.dirty.title ? $t.isRequired : ""}
        placeholder={`${$t.goalTitle} *`}
        hint={$t.goalTitleHint}
        onChange={handleTitle}
        onBlur={handleTitleBlur}
      />

      <DeField
        value={printDate}
        errorMessage={invalid.date && invalid.dirty.date ? $t.isRequired : ""}
        placeholder={`${$t.goalPeriod} *`}
        hint={$t.goalPeriodHint}
        disabled={loadingTasksByGoal}
        loading={loadingTasksByGoal}
        id="date-time-picker-goal"
        onBlur={() => handleInvalidDirty("date")}
      />
      <DeTextarea
        value={goal.description || ""}
        placeholder={$t.goalDescription}
        hint={$t.goalDescriptionHint}
        onChange={(event) => handleTextarea(event, "description")}
      />

      <DeTextarea
        value={goal.successCriteria ?? ""}
        placeholder={$t.goalSuccessCriteria}
        hint={$t.successCriteriaHint}
        onChange={(event) => handleTextarea(event, "successCriteria")}
      />

      <DeTextarea
        value={goal.reward ?? ""}
        placeholder={$t.goalPersonalReward}
        hint={$t.goalPersonalRewardHint}
        onChange={(event) => handleTextarea(event, "reward")}
      />
    </div>
  );
};

export default DefineGoalByLiveSphere;
