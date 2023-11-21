import { FC, useState } from "react";

// Features

import { WelcomeAuthorizedUser } from "@/widgets/banners";
import { useUserStore } from "@/features/auth";

// Shared

import { DeDateTimePicker, DeBottomSheet, DeNotification } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

// Icons

const Home: FC = () => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  const [modalActive, setModalActive] = useState(false);

  const handleToggleModal = () => {
    setModalActive(!modalActive);
  };
  // need to delete this
  const tasks = [
    {
      id: "dsgEffDfg",
      duration: {
        date: new Date(2023, 10, 20),
        time: { start: "08:00", end: "09:00" },
        break: "00:25",
      },
    },
    {
      id: "someId1",
      duration: {
        date: new Date(2023, 10, 20),
        time: { start: "10:05", end: "11:45" },
      },
      break: "00:15",
    },
    {
      id: "someId2",
      duration: {
        date: new Date(2023, 10, 20),
        time: { start: "12:20", end: "13:00" },
      },
    },
    {
      id: "someId3",
      duration: {
        date: new Date(2023, 10, 20),
        time: { start: "14:00", end: "15:30" },
      },
    },
    {
      id: "someId4",
      duration: {
        date: new Date(2023, 10, 20),
        time: { start: "16:30", end: "17:30" },
      },
    },
  ];
  // need to delete this
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
      {/* // need to delete this */}
      <DeDateTimePicker
        tasks={tasks}
        timeRange
        onSelect={handleDateSelect}
        defaultBreakRange="00:15"
      />
      <div className="mt-6">
        <p className="text-center">{$t.appAuthUserHomePageNoExisitContent}</p>
      </div>
      <button onClick={() => setModalActive(!modalActive)}>Click</button>

      {/* <DeBottomSheet
        active={modalActive}
        onClose={handleToggleModal}
        showCloseButton
      >
        <p>This is the modal content.</p>
      </DeBottomSheet> */}
      <DeNotification
        activate={modalActive}
        text="Some of text"
        type="error"
        onClose={() => setModalActive(!modalActive)}
      />
    </>
  );
};

export default Home;
