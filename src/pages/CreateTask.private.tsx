import { FC, useState, useEffect } from "react";

// Feature

import {
  DefineLiveSphere,
  DefineGoalByLiveSphere,
} from "@/features/create-task";
import { useTranslations } from "@/shared/hooks";

// Entities

import { Sphere, Goal } from "@/entities/models";

// Shared

import { DeButton } from "@/shared/ui";
import { useScrollDirection } from "@/shared/hooks";

type LocalLS = Sphere | null;
type ValidStep = { LS: boolean; goal: boolean };

interface StepComponent {
  component: FC;
  props?: Record<string, any>;
}

const CreateTask: FC = () => {
  // Use

  const scrollDirectionY = useScrollDirection();
  const { $t } = useTranslations();

  // State

  const [step, setStep] = useState(0);
  const [choseSL, setChoseSL] = useState<LocalLS>(null);
  const [goal, setGoal] = useState<Goal>();
  const [validStep, setValidStep] = useState<ValidStep>({
    LS: false,
    goal: false,
  });

  // Method

  const handleNextStep = () => {
    setStep((prevStep: number) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep: number) => prevStep - 1);
  };

  const handleValidStep = (prop: "LS" | "goal", value: boolean) => {
    setValidStep({ ...validStep, [prop]: value });
  };

  const handleChooseSL = (liveSphere: LocalLS) => {
    setChoseSL(liveSphere);
    handleValidStep("LS", !!liveSphere);
  };

  const handleGoalDataChange = (goal: Goal) => {
    setGoal(goal);
  };

  const handleCheckInvalid = (isValid: boolean) => {
    handleValidStep("goal", isValid);
  };

  const steps: StepComponent[] = [
    {
      component: DefineLiveSphere,
      props: { scrollDirectionY, onChange: handleChooseSL },
    },
    {
      component: DefineGoalByLiveSphere,
      props: {
        choseSL,
        onChange: handleGoalDataChange,
        onCheckInvalid: handleCheckInvalid,
      },
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
            disabled={
              (step === 0 && !validStep.LS) || (step === 1 && !validStep.goal)
            }
            onClick={handleNextStep}
          />
        </div>
      </section>
    </div>
  );
};

export default CreateTask;
