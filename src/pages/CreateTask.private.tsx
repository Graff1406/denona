import { FC, useState } from "react";

// Feature

import { DefineLiveSphere, CreateGoal } from "@/features/create-task";

// Shared

import { DnButton } from "@/shared/ui";
import { useScrollDirection } from "@/shared/hooks";

interface StepComponent {
  component: FC;
  props?: Record<string, any>;
}

const CreateTask: FC = () => {
  // Use
  const scrollDirectionY = useScrollDirection();

  // State
  const [choseSL, setChoseSL] = useState("");
  const [step, setStep] = useState(0);

  // Method

  const handleNextStep = () => {
    setStep((prevStep: number) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep: number) => prevStep - 1);
  };

  const handleChooseSL = (SL: string) => {
    setChoseSL(SL);
  };

  const steps: StepComponent[] = [
    {
      component: DefineLiveSphere,
      props: { scrollDirectionY, onChange: handleChooseSL },
    },
    { component: CreateGoal },
  ];

  return (
    <div className="flex flex-col justify-between h-full text-center relative">
      <section className="grow flex flex-col items-center gap-10">
        {steps.map((stepItem, i: number) => (
          <div className={step === i ? "block" : "hidden"}>
            <stepItem.component {...stepItem.props} />
          </div>
        ))}
      </section>
      <section className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 py-2 tablet:py-4 sticky bottom-0 z-20">
        <div className="flex gap-4">
          <DnButton
            label="Prev"
            areaLabel="Prev"
            className="w-full"
            disabled={step === 0}
            onClick={handlePrevStep}
          />
          <DnButton
            label="Next"
            areaLabel="Next"
            className="w-full"
            disabled={!choseSL.length}
            onClick={handleNextStep}
          />
        </div>
      </section>
    </div>
  );
};

export default CreateTask;