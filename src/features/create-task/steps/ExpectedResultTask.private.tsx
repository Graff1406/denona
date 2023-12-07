import { FC, useState, useEffect, ChangeEvent } from "react";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";

// Entities

import {
  TaskExpectedResult,
  Sphere,
  Goal,
  RecommendationsAndPrecautions,
} from "@/entities/models";

// Shared

import { DeButton, DeField, DeIconButton, DeAlert } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

// Icon

import { MdDelete } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ExpectedResultsProps {
  choseSL: Sphere;
  goal: Goal;
  onExpectedResultsChange: (results: TaskExpectedResult[]) => void;
  onValidationChange: (validationResult: boolean) => void;
}

const ExpectedResults: FC<ExpectedResultsProps> = ({
  choseSL,
  goal,
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
  const [
    loadingRecommendationsAndPrecautions,
    setLoadingRecommendationsAndPrecautions,
  ] = useState(false);
  const [recommendationsAndPrecautions, setRecommendationsAndPrecautions] =
    useState<RecommendationsAndPrecautions | null>();

  // methods

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewResult(event.target.value);
  };

  const handleAddResult = () => {
    if (newResult.trim().length > 3) {
      setExpectedResults([
        ...expectedResults,
        { status: "pending", text: newResult },
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
    if (choseSL)
      try {
        setLoadingRecommendationsAndPrecautions(true);
        const prompt = generatePrompt("taskRecommendedExpectedResults", {
          LS: `${choseSL.en.label}. ${choseSL.en.hint}`,
          goal: `${goal.title}. ${goal.description}`,
        });
        const res = await askGPT({
          content: prompt,
          max_tokens: 1000,
        });
        const data = res.toJSON<RecommendationsAndPrecautions>();
        if (data?.recommendations) setRecommendationsAndPrecautions(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRecommendationsAndPrecautions(false);
      }
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
  //   if (
  //     recommendationsAndPrecautions !== null &&
  //     !loadingRecommendationsAndPrecautions
  //   )
  //     getRecommendationAndPrecautions();
  // }, [goal]);

  return (
    <div className="my-4 w-full">
      <h2 className="text-lg font-semibold mb-4">
        {$t.createTaskExpectedResults}
      </h2>
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
      {expectedResults.length > 0 && (
        <div className="divider my-6 tablet:my-8"></div>
      )}

      <div className="flex flex-col tablet:flex-row tablet:items-center gap-3">
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

      <div className="divider my-6 tablet:my-8"></div>

      <div className="space-y-4">
        <section className="space-y-3">
          <h3 className="text-start flex items-center gap-4">
            <span>{$t.createTaskExpectedResultRecommendations}</span>
            {loadingRecommendationsAndPrecautions && (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            )}
          </h3>

          <ul className="space-y-2">
            {recommendationsAndPrecautions?.recommendations.map(
              (recommendation: string, i: number) => (
                <li
                  key={i}
                  className="flex items-center text-start gap-2 bg-green-50 rounded-md p-2"
                >
                  <DeAlert type="success" text={recommendation} />
                </li>
              )
            )}
          </ul>
        </section>
        {/* <section className="space-y-4">
          <h3 className="text-start flex items-center gap-4">
            <span>Precautions</span>
            {loadingRecommendationsAndPrecautions && (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            )}
          </h3>
          <ul className="space-y-2">
            {recommendationsAndPrecautions?.precautions.map(
              (precaution: string, i: number) => (
                <li
                  key={i}
                  className="flex items-center text-start gap-2 bg-orange-50 rounded-md p-2"
                >
                  <DeAlert type="warning" text={precaution} />
                </li>
              )
            )}
          </ul>
        </section> */}
      </div>
    </div>
  );
};

export default ExpectedResults;
