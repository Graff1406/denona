import { FC, useState, useEffect } from "react";

// Entities

import { DurationGoal } from "@/entities/models";

// Shared

import { DeField } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
import { dateTimeFormat } from "@/shared/helpers";

// Calendar

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

// let datepicker: {
//   update: ({
//     minDate,
//     maxDate,
//   }: {
//     minDate: Date | undefined;
//     maxDate: Date | undefined;
//   }) => void;
// };

interface Props {
  duration?: DurationGoal;
  onChange: (date: DurationGoal) => void;
}

const GoalDuration: FC<Props> = ({ duration, onChange }) => {
  // Use
  const { $t } = useTranslations();

  // State

  const [printDate, setPrintDate] = useState("");

  const handleDateSelect = ({ date }: { date: Date | Date[] }) => {
    if (Array.isArray(date) && date.length === 2) {
      const formatter = dateTimeFormat({
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const startDate = formatter.format(date[0]);
      const endDate = formatter.format(date[1]);
      setPrintDate(`${startDate} - ${endDate}`);
      onChange({ start: date[0], end: date[1] });
    }
  };

  const initCalendar = () => {
    new AirDatepicker("#date-time-picker-goal", {
      range: true,
      minDate: new Date(),
      multipleDatesSeparator: " - ",
      isMobile: true,
      buttons: ["today", "clear"],
      // autoClose: true,
      onSelect: (date) => handleDateSelect(date),
    });
  };

  // Hooks

  useEffect(() => {
    initCalendar();
    if (duration?.start && duration?.end)
      handleDateSelect({ date: [duration.start, duration.end] });
  }, []);

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <div className="divider"></div>

      <p className="text-start text-sm tablet:text-lg">{$t.goalPeriodHint}</p>

      <DeField
        value={printDate}
        placeholder={`${$t.goalPeriod} *`}
        id="date-time-picker-goal"
      />
    </div>
  );
};

export default GoalDuration;
