import { useEffect, useState, useRef } from "react";

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./styles.private.css";

// Entities

import { Task } from "@/entities/models";

// Shared

import { DeIconButton, DeBreakSlider } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
import { dateTimeFormat } from "@/shared/helpers";

// Icons

import { MdArrowBackIosNew, MdOutlineTimerOff } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Models

import {
  SelectDateTime,
  ItemSegment,
  TimeSegmentResult,
  CombinedBreakTimeResult,
} from "@/entities/models";

interface DateTimePickerProps {
  tasks?: Task[];
  loadingTasks?: boolean;
  timeRange?: boolean;
  dateRange?: boolean;
  defaultBreakRange?: string;
  minDate?: Date;
  maxDate?: Date;
  onSelect: (dateTime: SelectDateTime) => void;
}

let dateTimePicker: {
  selectDate: (date: Date) => void;
  update: (options: { minDate: Date; maxDate: Date }) => void;
};

const DeDateTimePicker: React.FC<DateTimePickerProps> = ({
  tasks,
  loadingTasks = true,
  timeRange,
  dateRange,
  defaultBreakRange,
  minDate,
  maxDate,
  onSelect,
}) => {
  // Use

  const { $t } = useTranslations();

  //State

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [printDate, setPrintDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeIndex, setStartTimeIndex] = useState<number>(-1);
  const [finishTime, setFinishTime] = useState("");
  const [finishTimeIndex, setFinishTimeIndex] = useState<number>(-1);
  const [segment, setSegment] = useState<TimeSegmentResult>({
    items: [],
    isHasNextDayTime: false,
  });
  const [durationTask, setDurationTask] = useState<{
    duration: string;
    type: "normal" | "medium" | "hight";
  }>();
  const [movedToNexDay, setMovedToNextDay] = useState(false);
  const [preventedHighlightChooseTime, setHighlightPreventedChooseTime] =
    useState(-1);
  const [taskBreak, setTaskBreak] = useState<CombinedBreakTimeResult>();
  const [breakRange, setBreakRange] = useState(defaultBreakRange);

  // Ref

  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  // Method

  const scrollToTop = (top = 0) => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = top;
    }
  };

  const handleDateSelect = ({ date }: { date: Date | Date[] }) => {
    if (!Array.isArray(date)) {
      setSelectedDate(date);
      setPrintDate(
        dateTimeFormat({
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(date)
      );
    }

    if (Array.isArray(date) && date[1]) {
      const formatter = dateTimeFormat({
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const startDate = formatter.format(date[0]);
      const endDate = formatter.format(date[1]);
      setSelectedDate(date[0]);
      setPrintDate(`${startDate} - ${endDate}`);
    }

    if (date === undefined) {
      setSelectedDate(null);
      resetTime(false);
    }
  };

  const showMinutes = (hour: string) => {
    if (hour.length) scrollToTop();
    setSelectedHour(hour);
  };

  const combineTimes = (
    time1: string,
    time2: string
  ): CombinedBreakTimeResult => {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    const totalMinutes =
      (hours1 * 60 + minutes1 + hours2 * 60 + minutes2) % (24 * 60);

    const combinedHours = Math.floor(totalMinutes / 60);
    const combinedMinutes = totalMinutes % 60;

    const isNextDay = totalMinutes >= 24 * 60;

    const formattedTime = `${combinedHours
      .toString()
      .padStart(2, "0")}:${combinedMinutes.toString().padStart(2, "0")}`;

    return {
      time: formattedTime,
      isNextDay: isNextDay,
    };
  };

  const generateTimeSegment = (
    selectedTime: string,
    tasks: Task[]
  ): { items: ItemSegment[]; isHasNextDayTime: boolean } => {
    const timeSegment: ItemSegment[] = [];
    const localStartTime = new Date(`1970-01-01T${selectedTime}`);
    const endTime = new Date(localStartTime.getTime() + 4 * 60 * 60 * 1000);

    let isHasNextDayTime = false;

    const parseBreak = (breakString: string): number => {
      const [hours, minutes] = breakString.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const addMinutes = (date: Date, minutes: number): string => {
      const newDate = new Date(date.getTime() + minutes * 60 * 1000);
      return newDate.toTimeString().slice(0, 5);
    };

    while (localStartTime < endTime) {
      const formattedTime = localStartTime.toTimeString().slice(0, 5);
      let isSlated = false;

      tasks.forEach((task) => {
        const taskStartTime = new Date(
          `1970-01-01T${task.duration.time.start}`
        );
        const taskEndTime = new Date(`1970-01-01T${task.duration.time.end}`);

        if (
          task.duration.date.getTime() === selectedDate?.getTime() &&
          localStartTime >= taskStartTime &&
          localStartTime <= taskEndTime
        ) {
          isSlated = true;
        } else if (
          task.duration.date.getTime() === selectedDate?.getTime() &&
          task.duration.break &&
          localStartTime >= taskEndTime &&
          localStartTime <=
            new Date(
              `1970-01-01T${addMinutes(
                taskEndTime,
                parseBreak(task.duration.break)
              )}`
            )
        ) {
          isSlated = true;
        } else if (
          task.duration.date.getTime() === selectedDate?.getTime() &&
          !task.duration.break &&
          localStartTime >= taskEndTime &&
          localStartTime <=
            new Date(
              `1970-01-01T${addMinutes(
                taskEndTime,
                parseBreak(defaultBreakRange || "00:00")
              )}`
            )
        ) {
          isSlated = true;
        }
      });

      timeSegment.push({ time: formattedTime, isSlated });

      if (
        localStartTime.getHours() === 23 &&
        localStartTime.getMinutes() === 55
      ) {
        isHasNextDayTime = true;
      }

      localStartTime.setTime(localStartTime.getTime() + 5 * 60 * 1000);
    }

    return { items: timeSegment, isHasNextDayTime };
  };

  const calculateTotalTime = (): string => {
    const start = new Date(`1970-01-01T${startTime}`);
    let end = new Date(`1970-01-01T${finishTime}`);

    if (end < start) {
      end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    }

    const totalTimeInMilliseconds = end.getTime() - start.getTime();
    const totalMinutes = Math.floor(totalTimeInMilliseconds / (1000 * 60));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formatter = dateTimeFormat({
      hour: "numeric",
      minute: "numeric",
    });

    const formattedTime = formatter.format(
      new Date(1970, 0, 1, hours, minutes)
    );

    return formattedTime;
  };

  const resetTime = (onlyTime: boolean) => {
    if (!onlyTime) showMinutes("");
    setFinishTime("");
    setFinishTimeIndex(-1);
    setStartTime("");
    setStartTimeIndex(-1);
  };

  const handleMinute = (el: ItemSegment, i: number) => {
    const preventSlateTime = (): boolean => {
      const start = Math.min(startTimeIndex, i);
      const end = Math.max(startTimeIndex, i);

      const hasBlockedTime = segment.items
        .slice(start + 1, end)
        .some((slot) => slot.isSlated);

      if (startTimeIndex >= 0 && hasBlockedTime) {
        resetTime(true);
        setHighlightPreventedChooseTime(i);
        return true;
      }
      return false;
    };

    if (el.isSlated || preventSlateTime()) return;
    const hour = el.time === startTime ? "" : el.time;
    const index = i === startTimeIndex ? -1 : i;
    if (startTimeIndex >= 0 && finishTimeIndex >= 0) {
      resetTime(true);
      setStartTime(hour);
      setStartTimeIndex(index);
    } else if (startTimeIndex >= 0 && startTimeIndex !== i) {
      if (startTimeIndex < i) {
        setFinishTime(hour);
        setFinishTimeIndex(index);
      } else {
        setStartTime(hour);
        setStartTimeIndex(index);
        setFinishTime(startTime);
        setFinishTimeIndex(startTimeIndex);
      }
    } else {
      setStartTime(hour);
      setStartTimeIndex(index);
    }
  };

  const handleChangeBreakDuration = (value: string) => {
    setBreakRange(value);
  };

  // Hook

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const picker = document.querySelector(".air-datepicker");
    if (!picker)
      dateTimePicker = new AirDatepicker("#date-time-picker", {
        range: dateRange,
        inline: true,
        minDate: Date.now(),
        classes: "dark:bg-zinc-800",
        onSelect: handleDateSelect,
      });

    scrollToTop(229);
  }, []);

  useEffect(() => {
    if (selectedHour.length) {
      setSegment(generateTimeSegment(selectedHour, tasks ?? []));
      console.log("tasks: ", tasks);
    }
  }, [selectedHour, selectedDate, tasks]);

  useEffect(() => {
    if (startTime.length && finishTime.length) {
      const duration = calculateTotalTime();
      const type =
        duration.split(":")[0] === "01"
          ? "medium"
          : duration.split(":")[0] >= "02"
          ? "hight"
          : "normal";
      setDurationTask({ duration, type });
    }
    setTaskBreak(combineTimes(finishTime, breakRange || "00:00"));
  }, [finishTime]);

  useEffect(() => {
    if (selectedDate !== null) {
      const day = new Date(selectedDate);

      if (
        startTime >= "00:00" &&
        startTime <= "02:55" &&
        segment.isHasNextDayTime &&
        !movedToNexDay
      ) {
        day.setDate(selectedDate.getDate() + 1);
        dateTimePicker?.selectDate(day);
        setMovedToNextDay(true);
      } else if (
        startTime > "02:55" &&
        movedToNexDay &&
        segment.isHasNextDayTime
      ) {
        if (day >= new Date()) {
          day.setDate(selectedDate.getDate() - 1);
          dateTimePicker?.selectDate(day);
        }
        setMovedToNextDay(false);
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (preventedHighlightChooseTime) {
      setTimeout(() => {
        setHighlightPreventedChooseTime(-1);
      }, 200);
    }
  }, [preventedHighlightChooseTime]);

  useEffect(() => {
    setTaskBreak(combineTimes(finishTime, breakRange || "00:00"));
  }, [breakRange]);

  useEffect(() => {
    const selected: SelectDateTime = { date: selectedDate };

    if (finishTime) selected.time = { start: startTime, end: finishTime };
    if (breakRange !== defaultBreakRange) selected.break = breakRange;

    onSelect(selected);
  }, [selectedDate, finishTime, breakRange]);

  useEffect(() => {
    if (minDate && maxDate && dateTimePicker)
      dateTimePicker.update({ minDate, maxDate });
  }, [minDate, maxDate]);

  return (
    <>
      <div className="flex justify-center h-[470px] overflow-hidden pb-4 gap-1">
        <div className="h-full flex flex-col items-center">
          <div className="w-[250px] min-h-[267px]">
            <div id="date-time-picker"></div>
          </div>
          <div className="divider"></div>
          <div className="py-3 flex flex-col items-center justify-center h-full">
            {selectedDate ? (
              <p>{printDate}</p>
            ) : (
              <p className="text-red-500 text-sm">
                {$t.calendarSelectDateAppeal}
              </p>
            )}
            {startTime && finishTime ? (
              <>
                <p>{`${startTime} - ${finishTime}`}</p>
                <p className="text-sm">
                  {$t.calendarLabelTimeDuration}:{" "}
                  <span
                    className={[
                      "text-sm font-semibold",
                      durationTask?.type === "hight"
                        ? "text-red-400"
                        : durationTask?.type === "medium"
                        ? "text-yellow-400"
                        : "text-green-400",
                    ].join(" ")}
                  >
                    {durationTask?.duration}
                  </span>
                </p>
                {/* {durationTask?.type === "hight" && (
                  <p className="text-xs text-red-400">
                    Рекомендуется сделать перерыв
                  </p>
                )} */}
              </>
            ) : (
              timeRange && (
                <p className="text-sm text-red-500">
                  {$t.calendarSelectTimeDrationAppeal}
                </p>
              )
            )}
          </div>
          {timeRange && (
            <div className="flex flex-col gap-3 w-full">
              <div className="divider"></div>
              <div className="text-center">
                <p
                  className={[
                    "animation overflow-hidden",
                    finishTime ? "h-6 opacity-100" : "h-0 opacity-0",
                  ].join(" ")}
                >
                  Break: {`${finishTime} - `}{" "}
                  <span className="inline-block w-12">{taskBreak?.time}</span>
                </p>
                <p className="text-sm">
                  Break duration:{" "}
                  <span className="inline-block w-10 text-yellow-700 font-semibold">
                    {breakRange}
                  </span>
                </p>
              </div>
              <div className="px-1">
                <DeBreakSlider
                  defaultValue={defaultBreakRange}
                  onChange={handleChangeBreakDuration}
                />
              </div>
            </div>
          )}
        </div>
        {timeRange && (
          <div className="flex flex-col justify-center items-center relative">
            <ul
              ref={scrollContainerRef}
              className={["overflow-y-auto ml-1 space-y-2 pb-1"].join(" ")}
            >
              {selectedHour.length ? (
                <>
                  {segment.items.map((el: ItemSegment, i: number) => {
                    const min = el?.time.split(":")[1];
                    return (
                      <>
                        <li
                          key={i}
                          className={[
                            "my-1 p-2 w-[60px] animation rounded border border-zinc-100 dark:border-zinc-700 shadow",
                            el.isSlated
                              ? "cursor-no-drop text-zinc-300 dark:text-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                              : preventedHighlightChooseTime === i
                              ? "bg-red-600 text-white"
                              : "cursor-pointer bg-zinc-100 dark:bg-zinc-800",
                            startTime === el?.time ||
                            (i >= Math.min(startTimeIndex, finishTimeIndex) &&
                              i <= Math.max(startTimeIndex, finishTimeIndex) &&
                              startTimeIndex >= 0 &&
                              finishTimeIndex >= 0)
                              ? "bg-zinc-900 dark:bg-zinc-900 text-white dark:border-zinc-900 shadow"
                              : !el.isSlated
                              ? "hover:bg-zinc-200 dark:hover:bg-zinc-900"
                              : "",
                          ].join(" ")}
                          onClick={() => handleMinute(el, i)}
                        >
                          {el?.time}
                        </li>
                        {min === "55" && i !== segment.items.length - 1 && (
                          <li
                            key={`divider-${i}`}
                            className="w-[60px] my-3 tablet:my-4"
                          >
                            {" "}
                            <div className="divider"></div>
                          </li>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                Array.from({ length: 24 }).map((_el, i) => {
                  const result = i < 10 ? `0${i}:00` : `${i}:00`;
                  return (
                    <li
                      key={i}
                      className={[
                        "border border-zinc-100  my-1 p-2 w-[60px] animation rounded shadow",
                        selectedDate === null
                          ? "cursor-no-drop text-zinc-300 dark:text-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                          : "cursor-pointer bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:border-zinc-700",
                      ].join(" ")}
                      onClick={() => selectedDate && showMinutes(result)}
                    >
                      {result}
                    </li>
                  );
                })
              )}
            </ul>

            <div
              className={[
                "bg-zinc-200 dark:bg-zinc-800 dark:border dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 mt-1 cursor-pointer flex justify-center w-[60px] rounded animation shadow",
                selectedHour
                  ? "h-[40px] mt-3 visible opacity-100"
                  : "h-0 mt-0 invisible opacity-0",
                startTime && finishTime ? "animate-bounce-once" : "",
              ].join(" ")}
            >
              {startTime && finishTime ? (
                <DeIconButton
                  icon={<MdOutlineTimerOff className="h-6 w-6" />}
                  areaLabel={$t.calendarButtonClearRateDuration}
                  onClick={() => resetTime(true)}
                />
              ) : (
                <DeIconButton
                  icon={<MdArrowBackIosNew className="h-6 w-6" />}
                  areaLabel={$t.appBackArrowLabel}
                  onClick={() => resetTime(false)}
                />
              )}
            </div>

            {loadingTasks && (
              <div className="absolute">
                <AiOutlineLoading3Quarters
                  className={["animate-spin w-5 h-5 animation"].join(" ")}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DeDateTimePicker;
