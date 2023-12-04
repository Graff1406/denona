import { FC, useState, useEffect } from "react";

interface BottleneckProps {
  userActivityDuration: number;
  tasksDuration: number;
}

const DeBottleneck: FC<BottleneckProps> = ({
  userActivityDuration,
  tasksDuration,
}) => {
  // const percentageDifference = (tasksDuration / userActivityDuration) * 100;
  // const isOverfilled = tasksDuration >= userActivityDuration;

  // States

  const [percentageDifference, setPercentageDifference] = useState<number>(0);
  const [isOverfilled, setIsOverfilled] = useState(false);

  // Hooks

  useEffect(() => {
    setPercentageDifference(
      Math.round((tasksDuration / userActivityDuration) * 100)
    );
    setIsOverfilled(tasksDuration >= userActivityDuration);
  }, [tasksDuration]);

  return (
    <div className="relative w-full h-4 bg-zinc-200 rounded-md text-xs font-semibold">
      <div
        className={[
          "absolute h-4 rounded-md flex justify-center items-center animation",
          isOverfilled ? "bg-red-500" : "bg-[#45BCED]",
        ].join(" ")}
        style={{
          width: `${percentageDifference >= 100 ? 100 : percentageDifference}%`,
        }}
      >
        {!!percentageDifference && (
          <span className="text-white">{`${percentageDifference} %`}</span>
        )}
      </div>
      <div
        className={[
          "pr-2 animation",
          percentageDifference ? "text-end" : "text-center",
        ].join(" ")}
      >
        {Math.round(100 - percentageDifference)}%
      </div>
    </div>
  );
};

export default DeBottleneck;
