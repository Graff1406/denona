import { FC, useState, useEffect, ReactNode } from "react";

// Feature

import { useTranslations } from "@/shared/hooks";

// Shared

import { DeButton } from "@/shared/ui";

interface StepWrapperProps {
  children?: ReactNode;
  prevButtonDisabled?: boolean;
  nextButtonDisabled?: boolean;
  parentStep?: number;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
  onGetStep: (step: number) => void;
  onClickPrevButton?: (step: number) => void;
  onClickNextButton?: (step: number) => void;
}

const StepWrapper: FC<StepWrapperProps> = ({
  children,
  prevButtonDisabled = true,
  nextButtonDisabled = true,
  parentStep,
  prevButtonLabel,
  nextButtonLabel,
  onGetStep,
  onClickPrevButton,
  onClickNextButton,
}) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [step, setStep] = useState(0);

  // Method

  const handleNextStep = () => {
    const currentStep = step + 1;

    onGetStep(currentStep);
    setStep(currentStep);
    if (onClickNextButton) onClickNextButton(currentStep);
  };
  const handlePrevStep = () => {
    const currentStep = step - 1;

    onGetStep(currentStep);
    setStep(currentStep);
    if (onClickPrevButton) onClickPrevButton(currentStep);
  };

  // Hooks

  useEffect(() => {
    if (parentStep) setStep(parentStep);
  }, [parentStep]);

  return (
    <div className="flex flex-col justify-between h-full text-center relative">
      <section className="grow flex flex-col items-center gap-10">
        {children}
      </section>
      <section className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 py-2 tablet:py-4 sticky bottom-0 z-10">
        <div className="flex gap-4">
          <DeButton
            label={prevButtonLabel || $t.createTaskPagePrevButtonLabel}
            areaLabel={prevButtonLabel || $t.createTaskPagePrevButtonAreaLabel}
            className="w-full"
            disabled={prevButtonDisabled}
            onClick={handlePrevStep}
          />
          <DeButton
            label={nextButtonLabel || $t.createTaskPageNextButtonLabel}
            areaLabel={nextButtonLabel || $t.createTaskPageNextButtonAreaLabel}
            className="w-full"
            disabled={nextButtonDisabled}
            onClick={handleNextStep}
          />
        </div>
      </section>
    </div>
  );
};

export default StepWrapper;
