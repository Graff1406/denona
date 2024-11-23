import { FC, useState, ChangeEvent } from "react";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";

// Entities

import {
  SuccessCriteria,
  RecommendationsAndPrecautions,
} from "@/entities/models";

// Shared

import { DeButton, DeField, DeIconButton, DeAlert } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
import { PENDING } from "@/shared/constants";

// Icon

import { MdDelete } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";

interface Props {
  successCriteria?: SuccessCriteria[];
  lifeSphereTitle: string;
  goalTitle: string;
  onChange: (results: SuccessCriteria[]) => void;
}

const GoalExpectedResult: FC<Props> = ({
  lifeSphereTitle,
  goalTitle,
  successCriteria = [],
  onChange,
}) => {
  // Use

  const { $t } = useTranslations();

  // State

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
      onChange([...successCriteria, { status: PENDING, text: newResult }]);
      setNewResult("");
    }
  };

  const handleRemoveResult = (index: number) => {
    const updatedResults = successCriteria?.filter((_, i) => i !== index);
    onChange(updatedResults);
  };

  const handleClearAllResults = () => {
    onChange([]);
  };

  const getRecommendationAndPrecautions = async (): Promise<void> => {
    if (lifeSphereTitle && goalTitle)
      try {
        setLoadingRecommendationsAndPrecautions(true);
        const prompt = generatePrompt("taskRecommendedExpectedResults", {
          LS: lifeSphereTitle,
          goal: goalTitle,
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

    onChange([...successCriteria, { status: PENDING, text: recommendation }]);

    setRecommend(recommendations);
  };

  return (
    <div className="w-full relative space-y-3">
      <div className="divider"></div>
      <p className="text-sm tablet:text-lg">{$t.successCriteriaHint}</p>

      <div className="flex flex-col tablet:flex-row tablet:items-center gap-3  bg-white dark:bg-zinc-800 py-2">
        <DeField
          value={newResult}
          placeholder="Add a new criteria"
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
        {successCriteria?.map((result, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-between w-full bg-zinc-50 mt-2 hover:bg-zinc-100 p-2 rounded-md animation"
          >
            <p className="text-start flex gap-2 items-center">
              <GiSandsOfTime className="w-4 h-4" />
              <span>{result.text}</span>
            </p>
            <DeIconButton
              className="text-red-500"
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
            successCriteria?.length > 1
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

      <div className="pb-10">
        <section className="space-y-3">
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="divider"></div>
              <p>OR</p>
              <div className="divider"></div>
            </div>
            <div className="flex justify-center">
              <DeButton
                label="Generate criteria"
                areaLabel="Generate criteria"
                className="w-full tablet:w-1/2"
                loading={loadingRecommend}
                onClick={getRecommendationAndPrecautions}
              />
            </div>
            {/* <div className="divider"></div> */}
          </div>

          {!loadingRecommend && !!recommend?.length && (
            <ul className="space-y-2 pt-4">
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

export default GoalExpectedResult;
