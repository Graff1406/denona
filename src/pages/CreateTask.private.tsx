import { FC, useState } from "react";

// Feature

import {
  DefineLiveSphere,
  DefineGoalByLiveSphere,
} from "@/features/create-task";
import { useTranslations } from "@/shared/hooks";

// Entities

import { Sphere } from "@/entities/models";

// Shared

import { DeButton } from "@/shared/ui";
import { useScrollDirection } from "@/shared/hooks";

type LocalLS = Sphere | null;

interface StepComponent {
  component: FC;
  props?: Record<string, any>;
}

const CreateTask: FC = () => {
  // Use
  const scrollDirectionY = useScrollDirection();
  const { $t } = useTranslations();

  // State
  const [choseSL, setChoseSL] = useState<LocalLS>(null);
  const [step, setStep] = useState(0);

  // Method

  const handleNextStep = () => {
    setStep((prevStep: number) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep: number) => prevStep - 1);
  };

  const handleChooseSL = (liveSphere: LocalLS) => {
    setChoseSL(liveSphere);
  };
  const handleCheckInvalid = (isValid: boolean) => {
    console.log("Is Valid:", isValid);
  };

  const steps: StepComponent[] = [
    {
      component: DefineLiveSphere,
      props: { scrollDirectionY, onChange: handleChooseSL },
    },
    {
      component: DefineGoalByLiveSphere,
      props: { choseSL, onCheckInvalid: handleCheckInvalid },
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full text-center relative">
      <section className="grow flex flex-col items-center gap-10">
        {steps.map((stepItem, i: number) => (
          <div
            key={i}
            className={["w-full", step === i ? "block" : "hidden"].join(" ")}
          >
            <stepItem.component {...stepItem.props} />
          </div>
        ))}
      </section>
      <section className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 py-2 tablet:py-4 sticky bottom-0 z-10">
        <div className="flex gap-4">
          <DeButton
            label={$t.createTaskPagePrevButtonLabel}
            areaLabel={$t.createTaskPagePrevButtonAreaLabel}
            className="w-full"
            disabled={step === 0}
            onClick={handlePrevStep}
          />
          <DeButton
            label={$t.createTaskPageNextButtonLabel}
            areaLabel={$t.createTaskPageNextButtonAreaLabel}
            className="w-full"
            disabled={choseSL === null}
            onClick={handleNextStep}
          />
        </div>
      </section>
    </div>
  );
};

export default CreateTask;
