import { FC, useState, useEffect } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeBreakSlider, DeButton } from "@/shared/ui";

const totalDuration = 100;
const defaultDuration = "01:40";

interface Props {
  goalTitle: string;
  onChange: (percentage: number) => void;
}

const ExternalFactors: FC<Props> = ({ goalTitle, onChange }) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [defaultBreak, setDefaultBreak] = useState("");

  // Methods

  const handleChangeBreakDuration = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);

    const timeInMinutes = hours * 60 + minutes;

    const percentage = Math.round((timeInMinutes / totalDuration) * 100);

    setDefaultBreak(`${percentage}%`);

    if (onChange) onChange(percentage);
  };

  // Hooks

  useEffect(() => {
    handleChangeBreakDuration(defaultDuration);
  }, []);

  return (
    <div className="space-y-3">
      <div className="divider"></div>

      {/* <p className="step-hint">{$t.createTaskExternalFactorsHint}</p> */}

      <p className="step-hint">
        На сколько процентов вы уверены, что ваша личная активность и участие в
        выполнении поставленной цели{" "}
        <span className="text-primary font-semibold">{goalTitle}</span> будет
        ключевым фактором для успешного завершения задачи?
      </p>

      <div
        className={[
          "animation border dark:border-zinc-600 rounded-md p-3",
        ].join(" ")}
      >
        <DeBreakSlider
          defaultValue={defaultDuration}
          maxDuration={totalDuration}
          onChange={handleChangeBreakDuration}
        />
        <p>{defaultBreak}</p>
      </div>

      <div className="flex justify-center pt-4">
        <DeButton
          label="Generate AI percentage"
          areaLabel="Generate AI percentage"
          className="w-full tablet:w-1/2"
        />
      </div>
    </div>
  );
};

export default ExternalFactors;
