export type Time = { start: string; end: string };

export type SelectDateTime = {
  date: Date | Date[] | null;
  time?: Time;
  break?: string;
};

export type ItemSegment = {
  time: string;
  isSlated: boolean;
};

export type TimeSegmentResult = {
  items: ItemSegment[];
  isHasNextDayTime: boolean;
};

export type CombinedBreakTimeResult = {
  time: string;
  isNextDay: boolean;
};
