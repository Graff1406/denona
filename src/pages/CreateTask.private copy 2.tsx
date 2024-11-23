import { FC, useState, ReactNode } from "react";

// Widgets

import { StepWrapper, Step } from "@/widgets/stepper";

// Feature

import {
  DefineLiveSphere,
  DefineGoalByLiveSphere,
  ExpectedResultTask,
  ChooseDateTimeTask,
  DefineLifeSphereAndGoal,
  GoalPool,
} from "@/features/steps";

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
import { useTranslations } from "@/shared/hooks";

type ValidPropName = "LS" | "goal" | "expectedResults" | "dateTimeTask";
type ValidStep = { [key in ValidPropName]: boolean };

// interface StepComponent {
//   component: FC;
//   props?: Record<string, any>;
// }

// const StepWrapper = ({
//   children,
//   show,
// }: {
//   children: ReactNode;
//   show: boolean;
// }) => {
//   return (
//     <div className={["w-full", show ? "block" : "hidden"].join(" ")}>
//       {children}
//     </div>
//   );
// };

const CreateTask: FC = () => {
  // Use

  const scrollDirectionY = useScrollDirection();
  const { $t } = useTranslations();

  // State

  const [step, setStep] = useState(0);
  const [choseSL, setChoseSL] = useState<Sphere | null>();
  const [goal, setGoal] = useState<Goal | null>();
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

  const handleStep = (step: number) => {
    setStep(step);
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
  const handleClickNextButton = (step: number) => {
    if (step === 1) {
      console.log(step);
    }
  };

  return (
    <StepWrapper
      nextButtonDisabled={!goal}
      onGetStep={handleStep}
      onClickNextButton={handleClickNextButton}
    >
      <Step
        active={step === 0}
        title={$t.createTaskDefineTimeDurationStepTitle}
      >
        <DefineLifeSphereAndGoal />
      </Step>
      <Step
        active={step === 1}
        title={$t.createTaskDefineTimeDurationStepTitle}
      >
        <ChooseDateTimeTask
          goal={goal}
          onSelectDuration={handleDateTimeTaskSelect}
          onValidationChange={handleChooseDateTimeTaskValidation}
        />
      </Step>
    </StepWrapper>
  );
};

export default CreateTask;
