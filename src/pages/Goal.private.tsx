import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Widgets

import { StepWrapper, Step } from "@/widgets/stepper";

// Feature

import {
  GoalPool,
  DefineGoalByLiveSphere,
  GoalDescription,
  useStepStore,
} from "@/features/steps";

// Entities

import { Goal } from "@/entities/models";

// Shared

import { useTranslations } from "@/shared/hooks";
import { path } from "@/shared/constants";

// Types

const GoalPage: FC = () => {
  // Use

  const { $t } = useTranslations();
  const navigate = useNavigate();
  const location = useLocation();
  const { storeStep, dispatchGoal } = useStepStore();

  // State

  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>();
  const [isCreating, setIsCreating] = useState(false);
  const [validCreateGoalFirstStep, setValidCreateGoalFirstStep] =
    useState(false);

  // Method

  const handleStep = (s: number) => {
    setStep(s);
  };
  const handleClickPrevButton = (prevStep: number) => {
    if (prevStep === -1) {
      navigate(path.defineLifeSphere, {
        state: { sphere: location.state?.sphere },
      });
    }
  };
  const handleClickNextButton = (step: number) => {
    if (validCreateGoalFirstStep) {
      navigate(path.create, {
        state: { sphere: location.state?.sphere, goal },
      });
      setIsCreating(false);
    }
  };
  const handleGoal = (g: Goal) => {
    if (g?.id === goal?.id) setGoal(null);
    else {
      setGoal(g);
      setValidCreateGoalFirstStep(true);
    }
  };
  const handleCreateNewGoal = () => {
    setStep((prevStep: number) => prevStep + 1);
    setIsCreating(true);
  };
  const handleGoalDataChange = (goal: Goal) => {
    if (step > 0) setGoal(goal);
  };
  const handleCreateGoalInvalid = (valid: boolean) => {
    setValidCreateGoalFirstStep(valid);
  };
  const handleChangeDescription = (data: {
    title: string;
    description: string;
  }) => {
    const updatedGoal = { ...goal, ...data } as Goal;
    dispatchGoal(updatedGoal);
  };

  return (
    <StepWrapper
      prevButtonDisabled={!storeStep.sphere?.id}
      nextButtonDisabled={
        (step === 0 && !storeStep.goal?.title) ||
        (step === 0 && !storeStep.goal?.description)
      }
      parentStep={step}
      onGetStep={handleStep}
      onClickPrevButton={handleClickPrevButton}
      onClickNextButton={handleClickNextButton}
    >
      {/* <Step
        active={step === 0}
        title={$t.createTaskCalendarSingleTaskGoalLabel}
      >
        <GoalPool
          sphere={location.state?.sphere}
          onSelectGoal={handleGoal}
          onCreateNewGoal={handleCreateNewGoal}
        />
      </Step> */}

      <Step active={step === 0} title={$t.createTaskPageAddNewGoal}>
        <GoalDescription
          title={storeStep.goal?.title ?? ""}
          description={storeStep.goal?.description ?? ""}
          onChange={handleChangeDescription}
        />
      </Step>
      <Step active={step === 1} title={$t.createTaskPageAddNewGoal}>
        <GoalDescription
          title={storeStep.goal?.title ?? ""}
          description={storeStep.goal?.description ?? ""}
          onChange={handleChangeDescription}
        />
      </Step>
    </StepWrapper>
  );
};

export default GoalPage;
