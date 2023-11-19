import { FC } from "react";

// Features

import { WelcomeAuthorizedUser } from "@/widgets/banners";
import { useUserStore } from "@/features/auth";

// Shared

import { DeDateTimePicker } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

// Icons

const Home: FC = () => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  const tasks = [
    {
      id: "dsgEffDfg",
      duration: {
        date: new Date(2023, 10, 19),
        time: { start: "08:00", end: "09:00" },
      },
    },
    {
      id: "someId1",
      duration: {
        date: new Date(2023, 10, 19),
        time: { start: "10:05", end: "11:45" },
      },
    },
    {
      id: "someId2",
      duration: {
        date: new Date(2023, 10, 19),
        time: { start: "12:20", end: "13:00" },
      },
    },
    {
      id: "someId3",
      duration: {
        date: new Date(2023, 10, 19),
        time: { start: "14:00", end: "15:30" },
      },
    },
    {
      id: "someId4",
      duration: {
        date: new Date(2023, 10, 19),
        time: { start: "16:30", end: "17:30" },
      },
    },
  ];

  const handleDateSelect = (date: {
    date: Date | Date[] | null;
    time?: { start: string; end: string };
  }) => {
    console.log(date);
  };

  return (
    <>
      {!user.auth?.hide?.banner?.welcomeAuthorizedUser && (
        <WelcomeAuthorizedUser />
      )}
      <DeDateTimePicker tasks={tasks} timeRange onSelect={handleDateSelect} />
      <div className="mt-6">
        <p className="text-center">{$t.appAuthUserHomePageNoExisitContent}</p>
      </div>
    </>
  );
};

export default Home;
