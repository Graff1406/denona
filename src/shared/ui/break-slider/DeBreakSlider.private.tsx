import { FC, useState, useEffect } from "react";
import "./break-slider-styles.css";

interface TimeSliderProps {
  defaultValue?: string;
  maxDuration?: number;
  className?: string;
  onChange: (value: string) => void;
}

const DeBreakSlider: FC<TimeSliderProps> = ({
  defaultValue = "00:15",
  maxDuration = 120,
  className,
  onChange,
}) => {
  const [value, setValue] = useState(parseTimeToMinutes(defaultValue));

  // Methods

  const formatMinutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(formatMinutesToTime(newValue));
  };

  function parseTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Hooks

  useEffect(() => {
    if (value > maxDuration) {
      setValue(maxDuration);
      onChange(formatMinutesToTime(maxDuration));
    }
  }, [value, maxDuration, onChange]);

  useEffect(() => {
    setValue(parseTimeToMinutes(defaultValue));
  }, [defaultValue]);

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
        background: `linear-gradient(to right, #45BCED ${
          ((value - 5) / (maxDuration - 5)) * 100
        }%, #e4e4e7 ${((value - 5) / (maxDuration - 5)) * 100}%)`,
      }}
    />
  );
};

export default DeBreakSlider;
