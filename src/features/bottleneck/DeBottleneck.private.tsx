import { FC, useState, useEffect } from "react";

// Shared

import { DeDropdownButton } from "@/shared/ui";

interface BottleneckProps {
  userActivityDuration: number;
  tasksDuration: number;
}

const DeBottleneck: FC<BottleneckProps> = ({
  userActivityDuration,
  tasksDuration,
}) => {
  // States

  const [percentageDifference, setPercentageDifference] = useState<number>(0);
  const [isOverfilled, setIsOverfilled] = useState(false);

  // Methods

  const handleSelectStart = (e: string) => {
    console.log(e);
  };

  // Hooks

  useEffect(() => {
    setPercentageDifference(
      Math.round((tasksDuration / userActivityDuration) * 100)
    );
    setIsOverfilled(tasksDuration >= userActivityDuration);
  }, [tasksDuration]);

  return (
    <div className="border dark:border-zinc-700 rounded-md p-3 space-y-3 shadow-md">
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

      <div className="flex justify-between">
        <DeDropdownButton
          small
          buttonTitle="06:00"
          options={["07:00", "08:00"]}
          onSelect={handleSelectStart}
        />

        <DeDropdownButton
          small
          buttonTitle="22:00"
          options={["07:00", "08:00"]}
          onSelect={handleSelectStart}
        />
      </div>
    </div>
  );
};

export default DeBottleneck;
