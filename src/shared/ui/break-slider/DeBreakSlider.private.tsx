import { FC, useState, useEffect } from "react";
import "./break-slider-styles.css";

interface TimeSliderProps {
  defaultValue: string;
  onChange: (value: string) => void;
  maxDuration?: number;
  className?: string;
}

const DeBreakSlider: FC<TimeSliderProps> = ({
  defaultValue,
  onChange,
  maxDuration = 120,
  className,
}) => {
  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const formatMinutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const [value, setValue] = useState(parseTimeToMinutes(defaultValue));

  useEffect(() => {
    if (value > maxDuration) {
      setValue(maxDuration);
      onChange(formatMinutesToTime(maxDuration));
    }
  }, [value, maxDuration, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(formatMinutesToTime(newValue));
  };

  return (
    <input
      type="range"
      min={5}
      max={maxDuration}
      step={5}
      value={value}
      onChange={handleChange}
      className={[
        "w-full dark:border dark:border-zinc-600 bg-zinc-50 appearance-none hover:border-zinc-300 animation rounded-lg h-2",
        className,
      ].join(" ")}
      style={{
        background: `linear-gradient(to right, #18181b ${
          ((value - 5) / (maxDuration - 5)) * 100
        }%, #f4f4f5 ${((value - 5) / (maxDuration - 5)) * 100}%)`,
      }}
    />
  );
};

export default DeBreakSlider;
