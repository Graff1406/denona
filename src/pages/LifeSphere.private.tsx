import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Widgets

import { StepWrapper, Step } from "@/widgets/stepper";

// Feature

import {
  DefineLiveSphere,
  // DefineGoalByLiveSphere,
  // ExpectedResultTask,
  ChooseDateTimeTask,
  TaskDescription,
  TaskSuccessCriteria,
  // DefineLifeSphereAndGoal,
  GoalPool,
  GoalDescription,
  GoalDuration,
  GoalSuccessCriteria,
  GoalRecommendAndPrecaution,
  GoalExpectedResult,
  GoalReward,
  useStepStore,
} from "@/features/steps";
import { askGPT, generatePrompt } from "@/features/openai";
import { useUserStore } from "@/features/auth";

// Entities

import {
  Sphere,
  Goal,
  DateTimeTask,
  Task,
  DurationGoal,
  SuccessCriteria,
} from "@/entities/models";
import {
  addDocumentToSubCollection,
  updateSubCollectionDocument,
} from "@/entities/firebase";

// Shared

import { DeButton, DeLoadingBanner } from "@/shared/ui";
// import { useScrollDirection } from "@/shared/hooks";
import { useTranslations } from "@/shared/hooks";
import { GOALS, USERS, path } from "@/shared/constants";

// Types

const LifeSpherePage: FC = () => {
  // Use

  const { $t } = useTranslations();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const {
    storeStep,
    dispatchSphere,
    dispatchGoal,
    dispatchHistory,
    dispatchTask,
  } = useStepStore();

  // State

  const [step, setStep] = useState(storeStep.history.sphere);
  const [joinedGoalList, setJoinedGoalList] = useState<Goal[]>();
  const [stepValid, setStepValid] = useState(false);
  const [createGoal, setCreateGoal] = useState(false);
  const [saveGoalLoading, setSaveGoalLoading] = useState(false);
  const [justGoalCreated, setJustGoalCreated] = useState(false);

  // Method

  const joinGoalData = (data: { [key: string]: unknown }) => {
    const copyGoal = JSON.parse(JSON.stringify(storeStep.goal));
    const goal = { ...copyGoal, ...data } as Goal;
    return goal;
  };

  const validateStep = () => {
    return (
      (!storeStep.sphere && step === 0) ||
      (!storeStep.goal && step === 1 && !createGoal) ||
      (createGoal && !storeStep.goal?.date?.start && step === 2) ||
      (createGoal && !storeStep.goal?.title && step === 3) ||
      (createGoal && !storeStep.goal?.description && step === 3) ||
      (createGoal && !storeStep.goal?.successCriteria?.length && step === 4)
    );
  };

  const handleGenerateGoalLabels = async (id: string): Promise<void> => {
    const goal = storeStep.goal;
    const prompt = generatePrompt("goalLabels", {
      lifeSphere: storeStep.sphere?.en.label ?? "",
      title: storeStep.goal?.title ?? "",
    });

    try {
      const res = await askGPT({
        content: prompt,
        max_tokens: 1000,
      });
      if (res.content) {
        const { labels } = JSON.parse(res.content) as {
          labels: string[];
        };

        updateSubCollectionDocument({
          parentCollection: USERS,
          parentId: user?.auth?.uid ?? "",
          subcollection: GOALS,
          documentId: id,
          data: { ...goal, labels },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveGoalToSubCollection = async (): Promise<string | null> => {
    try {
      setSaveGoalLoading(true);
      const res = await addDocumentToSubCollection<Goal>({
        parentCollection: USERS,
        parentId: user?.auth?.uid ?? "",
        subCollection: GOALS,
        data: storeStep.goal,
      });
      return res?.id ? res.id : null;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setSaveGoalLoading(false);
    }
  };

  const initCreatedGoal = async () => {
    setJustGoalCreated(true);
    setCreateGoal(false);
    const id = await saveGoalToSubCollection();
    if (id) {
      const item = {
        ...storeStep.goal,
        id,
      };
      setJoinedGoalList([item]);
      handleGenerateGoalLabels(id);
    }
    dispatchGoal(null);
    setTimeout(() => {
      setJustGoalCreated(false);
    }, 3000);
  };

  const handleStep = (s: number) => {
    if (s === 7 && createGoal) {
      setStep(1);
      initCreatedGoal();
    } else setStep(s);
  };

  const handleCreateNewGoal = () => {
    // dispatchGoal(null);
    // navigate(path.goal);
    setCreateGoal(true);
    setStep(step + 1);
    // setJoinedGoalList(undefined);
  };

  const handleSphere = (s: Sphere) => {
    dispatchSphere(s);
    dispatchGoal(null);
  };

  const handleGoal = (g: Goal) => {
    const currentGoal = g?.id !== storeStep.goal?.id ? g : null;
    dispatchGoal(currentGoal);
    setCreateGoal(false);
  };

  const handleChangeDescription = (data: {
    title: string;
    description: string;
  }) => {
    dispatchGoal(joinGoalData({ ...data, lifeSphereId: storeStep.sphere?.id }));
  };

  const handleChangeGoalSuccessCriteria = (
    successCriteria: SuccessCriteria[]
  ) => {
    dispatchGoal(joinGoalData({ successCriteria }));
  };

  const handleChangeGoalDuration = (duration: DurationGoal) => {
    dispatchGoal(joinGoalData({ date: duration }));
  };

  const handleChangeReward = (reward: string) => {
    dispatchGoal(joinGoalData({ reward }));
  };

  const handleChangeTaskSuccessCriteria = (
    successCriteria: SuccessCriteria[]
  ) => {
    const updatedTask = { ...storeStep.task, successCriteria } as Task;
    dispatchTask(updatedTask);
  };

  const handleDateTimeTaskSelect = (duration: DateTimeTask | null) => {
    const task = { ...storeStep.task, duration } as Task;
    dispatchTask(task);
  };

  const handleChooseDateTimeTaskValidation = (isValid: boolean) => {
    // handleValidStep("dateTimeTask", isValid);
  };

  const handleChooseLifeSphere = () => {
    navigate(path.defineLifeSphere);
  };
  // Hooks

  useEffect(() => {
    dispatchHistory("sphere", step);
    console.log(111, storeStep.goal);
  }, [step]);

  useEffect(() => {
    setStepValid(validateStep());
  }, [storeStep]);

  return (
    <StepWrapper
      parentStep={step}
      prevButtonDisabled={step == 0}
      nextButtonDisabled={stepValid}
      onGetStep={handleStep}
    >
      <Step
        active={step === 0}
        title={$t.createTaskPageAddLifeSphereProggressListTitle}
      >
        <DefineLiveSphere onChange={handleSphere} />
      </Step>

      <Step
        active={step === 1}
        title={$t.createTaskCalendarSingleTaskGoalLabel}
      >
        <div
          className={[
            "animation duration-700",
            justGoalCreated ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <DeLoadingBanner
            loading={saveGoalLoading}
            pendingText="We are Creating the goal"
            successText="The goal just created"
          />
        </div>

        <GoalPool
          sphere={storeStep.sphere}
          isChosenItem={joinedGoalList?.[0]}
          items={joinedGoalList}
          onSelectGoal={handleGoal}
        />

        <div className="flex flex-col items-center justify-center gap-6 my-6">
          <div className="divider"></div>

          {storeStep.sphere ? (
            createGoal ? (
              <DeButton
                label="Continue fill goal"
                areaLabel="Create"
                className="w-full tablet:w-1/2"
                onClick={handleCreateNewGoal}
              />
            ) : (
              <DeButton
                label="Add New Goal"
                areaLabel="Create"
                className="w-full tablet:w-1/2"
                disabled={!!storeStep.goal}
                onClick={handleCreateNewGoal}
              />
            )
          ) : (
            <DeButton
              label="Choose Life Sphere"
              areaLabel="Choose Life Sphere"
              className="w-full tablet:w-1/2"
              onClick={handleChooseLifeSphere}
            />
          )}

          <div className="divider"></div>
        </div>
      </Step>

      {createGoal ? (
        <>
          <Step active={step === 2} title={$t.createTaskPageAddNewGoal}>
            <GoalDuration
              duration={storeStep.goal?.date}
              onChange={handleChangeGoalDuration}
            />
          </Step>

          <Step active={step === 3} title={$t.createTaskPageAddNewGoal}>
            <GoalDescription
              title={storeStep.goal?.title ?? ""}
              description={storeStep.goal?.description ?? ""}
              onChange={handleChangeDescription}
            />
          </Step>

          <Step active={step === 4} title={$t.createTaskPageAddNewGoal}>
            <GoalExpectedResult
              successCriteria={storeStep.goal?.successCriteria}
              lifeSphereTitle={storeStep.sphere?.en.label ?? ""}
              goalTitle={storeStep.goal?.title ?? ""}
              onChange={handleChangeGoalSuccessCriteria}
            />
          </Step>

          <Step active={step === 5} title={$t.createTaskPageAddNewGoal}>
            <GoalReward
              reward={storeStep.goal?.reward ?? ""}
              onChange={handleChangeReward}
            />
          </Step>

          <Step active={step === 6} title={$t.createTaskPageAddNewGoal}>
            <GoalRecommendAndPrecaution
              sphere={storeStep.sphere}
              goal={storeStep.goal}
            />
          </Step>
        </>
      ) : (
        <>
          <Step active={step === 2} title={$t.appFormCreateTaskLabel}>
            <TaskDescription
              title={storeStep.task?.title ?? ""}
              description={storeStep.task?.description ?? ""}
              onChange={handleChangeDescription}
            />
          </Step>

          <Step active={step === 3} title={$t.appFormCreateTaskLabel}>
            <ChooseDateTimeTask
              goal={storeStep.goal}
              onSelectDuration={handleDateTimeTaskSelect}
              onValidationChange={handleChooseDateTimeTaskValidation}
            />
          </Step>

          <Step active={step === 4} title={$t.appFormCreateTaskLabel}>
            <TaskSuccessCriteria
              successCriteria={storeStep.task?.successCriteria ?? ""}
              onChange={handleChangeTaskSuccessCriteria}
            />
          </Step>
        </>
      )}
    </StepWrapper>
  );
};

export default LifeSpherePage;
