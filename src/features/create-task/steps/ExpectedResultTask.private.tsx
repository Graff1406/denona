import { FC, useState, useEffect, ChangeEvent } from "react";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";

// Entities

import {
  TaskExpectedResult,
  Sphere,
  Goal,
  RecommendationsAndPrecautions,
  Task,
} from "@/entities/models";

// Shared

import { DeButton, DeField, DeIconButton, DeAlert } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
import { PENDING } from "@/shared/constants";

// Icon

import { MdDelete } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ExpectedResultsProps {
  choseSL: Sphere | null;
  goal: Goal | null;
  task: Task | null;
  onExpectedResultsChange: (results: TaskExpectedResult[]) => void;
  onValidationChange: (validationResult: boolean) => void;
}

const ExpectedResults: FC<ExpectedResultsProps> = ({
  choseSL,
  goal,
  task,
  onExpectedResultsChange,
  onValidationChange,
}) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [expectedResults, setExpectedResults] = useState<TaskExpectedResult[]>(
    []
  );
  const [newResult, setNewResult] = useState<string>("");
  const [loadingRecommend, setLoadingRecommendationsAndPrecautions] =
    useState(false);
  const [recommend, setRecommend] = useState<string[]>();

  // methods

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewResult(event.target.value);
  };

  const handleAddResult = () => {
    if (newResult.trim().length > 3) {
      setExpectedResults([
        ...expectedResults,
        { status: PENDING, text: newResult },
      ]);
      setNewResult("");
    }
  };

  const handleRemoveResult = (index: number) => {
    const updatedResults = expectedResults.filter((_, i) => i !== index);
    setExpectedResults(updatedResults);
  };

  const handleClearAllResults = () => {
    setExpectedResults([]);
  };

  const getRecommendationAndPrecautions = async (): Promise<void> => {
    if (choseSL && goal)
      try {
        setLoadingRecommendationsAndPrecautions(true);
        const prompt = generatePrompt("taskRecommendedExpectedResults", {
          LS: choseSL.en.label,
          goal: goal?.title,
          task: task?.title,
        });
        const res = await askGPT({
          content: prompt,
          max_tokens: 1000,
        });
        const data = res.toJSON<RecommendationsAndPrecautions>();
        if (
          !!data?.recommendations &&
          Array.isArray(data?.recommendations) &&
          data?.recommendations.every((item) => typeof item === "string")
        )
          setRecommend(data?.recommendations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRecommendationsAndPrecautions(false);
      }
  };

  const handleAddRecommendedToExpectedResult = (recommendation: string) => {
    const recommendations = recommend?.filter(
      (result) => result !== recommendation
    ) as string[];

    setExpectedResults([
      ...expectedResults,
      { status: PENDING, text: recommendation },
    ]);

    setRecommend(recommendations);
  };

  // Hooks

  useEffect(() => {
    const isValid = expectedResults.length > 0;
    onValidationChange(isValid);
  }, [expectedResults]);

  useEffect(() => {
    onExpectedResultsChange(expectedResults);
  }, [expectedResults]);

  // useEffect(() => {
  //   getRecommendationAndPrecautions();
  //   console.log("getRecommendationAndPrecautions");
  // }, [goal]);

  return (
    <div className="my-4 w-full relative">
      <h2 className="text-lg font-semibold mb-4">
        {$t.createTaskExpectedResults}
      </h2>

      <div className="flex flex-col tablet:flex-row tablet:items-center gap-3 sticky top-0 bg-white dark:bg-zinc-800 py-2 z-10">
        <DeField
          value={newResult}
          placeholder="Result"
          onChange={handleInputChange}
          onEnter={handleAddResult}
        />

        <DeButton
          label={$t.createTaskExpectedResultItemButtonAddLabel}
          areaLabel={$t.createTaskExpectedResultItemButtonAddAreaLabel}
          disabled={newResult.trim().length <= 3}
          onClick={handleAddResult}
        />
      </div>

      <div>
        {expectedResults.map((result, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-between w-full bg-zinc-50 mt-2 hover:bg-zinc-100 p-2 rounded-md animation"
          >
            <p className="text-start flex gap-2 items-center">
              <GiSandsOfTime />
              <span>{result.text}</span>
            </p>
            <DeIconButton
              className="w-7 h-7 text-red-500"
              icon={<MdDelete />}
              title={$t.createTaskExpectedResultItemDeleteButtonTitle}
              areaLabel={$t.createTaskExpectedResultItemDeleteAreaLabel}
              onClick={() => handleRemoveResult(index)}
            />
          </div>
        ))}

        <div
          className={[
            "flex justify-end animation box-border",
            expectedResults.length > 1
              ? "visible opacity-100 max-h-40 overflow-auto mt-4"
              : "invisible opacity-0 max-h-0 overflow-hidden mt-0",
          ].join(" ")}
        >
          <DeButton
            label={$t.createTaskExpectedResultItemButtonDeleteAllLabel}
            areaLabel={$t.createTaskExpectedResultItemButtonDeleteAllAreaLabel}
            small
            onClick={handleClearAllResults}
          />
        </div>
      </div>

      <div className="divider my-6 tablet:my-8"></div>

      <div className="space-y-4">
        <section className="space-y-3">
          <h3 className="flex items-center justify-center gap-4">
            <span>{$t.createTaskExpectedResultRecommendations}</span>
            {loadingRecommend ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            ) : (
              !!recommend && `(${recommend?.length})`
            )}
          </h3>

          {!loadingRecommend && !!recommend?.length && (
            <ul className="space-y-2">
              {recommend?.map((recommendation: string, i: number) => (
                <li
                  key={i}
                  className="flex items-center text-start gap-2 rounded-md cursor-pointer"
                  onClick={() =>
                    handleAddRecommendedToExpectedResult(recommendation)
                  }
                >
                  <DeAlert type="success" text={recommendation} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ExpectedResults;
