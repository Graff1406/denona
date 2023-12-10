import { FC, useState, ReactNode } from "react";

// Feature

import {
  DefineLiveSphere,
  DefineGoalByLiveSphere,
  ExpectedResultTask,
  ChooseDateTimeTask,
} from "@/features/create-task";
import { useTranslations } from "@/shared/hooks";

// Entities

import {
  Sphere,
  Goal,
  TaskExpectedResult,
  DateTimeTask,
} from "@/entities/models";

// Shared

import { DeButton } from "@/shared/ui";
import { useScrollDirection } from "@/shared/hooks";

type ValidPropName = "LS" | "goal" | "expectedResults" | "dateTimeTask";
type ValidStep = { [key in ValidPropName]: boolean };

interface StepComponent {
  component: FC;
  props?: Record<string, any>;
}

const StepWrapper = ({
  children,
  show,
}: {
  children: ReactNode;
  show: boolean;
}) => {
  return (
    <div className={["w-full", show ? "block" : "hidden"].join(" ")}>
      {children}
    </div>
  );
};

const CreateTask: FC = () => {
  // Use

  const scrollDirectionY = useScrollDirection();
  const { $t } = useTranslations();

  // State

  const [step, setStep] = useState(0);
  const [choseSL, setChoseSL] = useState<Sphere | null>({
    id: "test",
    en: {
      label: "Sports and Physical Activity",
      hint: "Engaging in sports, physical activity, and physical fitness.",
    },
    de: {
      label: "Sports and Physical Activity",
      hint: "Engaging in sports, physical activity, and physical fitness.",
    },
    ka: {
      label: "Sports and Physical Activity",
      hint: "Engaging in sports, physical activity, and physical fitness.",
    },
    ua: {
      label: "Sports and Physical Activity",
      hint: "Engaging in sports, physical activity, and physical fitness.",
    },
    ru: {
      label: "Sports and Physical Activity",
      hint: "Engaging in sports, physical activity, and physical fitness.",
    },
  });
  const [goal, setGoal] = useState<Goal | null>({
    title: "Pump up your abdominal muscles in two weeks",
    date: {
      start: new Date(2023, 11, 8),
      end: new Date(2023, 12, 8),
    },
  });
  const [dateTimeTask, setDateTimeTask] = useState<DateTimeTask | null>();
  const [validStep, setValidStep] = useState<ValidStep>({
    LS: false,
    goal: false,
    dateTimeTask: false,
    expectedResults: false,
  });
  const [expectedTaskResults, setExpectedTaskResults] =
    useState<TaskExpectedResult[]>();

  // Method

  const handleNextStep = () => {
    setStep((prevStep: number) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep: number) => prevStep - 1);
  };

  const handleValidStep = (prop: ValidPropName, value: boolean) => {
    setValidStep({ ...validStep, [prop]: value });
  };

  const handleChooseSL = (liveSphere: Sphere | null) => {
    setChoseSL(liveSphere);
    handleValidStep("LS", !!liveSphere);
  };

  const handleGoalDataChange = (goal: Goal) => {
    setGoal(goal);
  };

  const onValidationChange = (valid: boolean) => {
    handleValidStep("expectedResults", valid);
  };

  const handleCheckInvalid = (isValid: boolean) => {
    handleValidStep("goal", isValid);
  };
  const handleChooseDateTimeTaskValidation = (isValid: boolean) => {
    handleValidStep("dateTimeTask", isValid);
  };

  const onExpectedResultsChange = (results: TaskExpectedResult[]) => {
    setExpectedTaskResults(results);
  };

  const handleDateTimeTaskSelect = (duration: DateTimeTask | null) => {
    setDateTimeTask(duration);
  };

  // const steps: StepComponent[] = [
  //   {
  //     component: DefineLiveSphere,
  //     props: { scrollDirectionY, onChange: handleChooseSL },
  //   },
  //   {
  //     component: DefineGoalByLiveSphere,
  //     props: {
  //       choseSL,
  //       onChange: handleGoalDataChange,
  //       onCheckInvalid: handleCheckInvalid,
  //     },
  //   },
  //   {
  //     component: ChooseDateTimeTask,
  //     props: {
  //       goal,
  //     },
  //   },
  //   {
  //     component: ExpectedResultTask,
  //     props: {
  //       choseSL,
  //       goal,
  //       onExpectedResultsChange,
  //       onValidationChange,
  //     },
  //   },
  // ];

  return (
    <div className="flex flex-col justify-between h-full text-center relative">
      <section className="grow flex flex-col items-center gap-10">
        <StepWrapper show={step === 0}>
          <DefineLiveSphere
            scrollDirectionY={scrollDirectionY}
            onChange={handleChooseSL}
          />
        </StepWrapper>

        <StepWrapper show={step === 1 && !!choseSL}>
          <DefineGoalByLiveSphere
            choseSL={choseSL}
            onChange={handleGoalDataChange}
            onCheckInvalid={handleCheckInvalid}
          />
        </StepWrapper>

        <StepWrapper show={step === 2 && !!goal}>
          <ChooseDateTimeTask
            goal={goal}
            onSelectDuration={handleDateTimeTaskSelect}
            onValidationChange={handleChooseDateTimeTaskValidation}
          />
        </StepWrapper>

        <StepWrapper show={step === 3 && !!choseSL && !!goal}>
          <ExpectedResultTask
            choseSL={choseSL}
            goal={goal}
            onExpectedResultsChange={onExpectedResultsChange}
            onValidationChange={onValidationChange}
          />
        </StepWrapper>

        {/* {steps.map((stepItem, i: number) => (
          <div
            key={i}
            className={["w-full", step === i ? "block" : "hidden"].join(" ")}
          >
            <stepItem.component {...stepItem.props} />
          </div>
        ))} */}
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
              (step === 0 && !validStep.LS) ||
              (step === 1 && !validStep.goal) ||
              (step === 2 && !validStep.dateTimeTask) ||
              (step === 3 && !validStep.expectedResults)
            }
            onClick={handleNextStep}
          />
        </div>
      </section>
    </div>
  );
};

export default CreateTask;
