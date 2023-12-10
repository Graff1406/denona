import { FC, useState, useEffect } from "react";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";

// Entities

import { RecommendationsAndPrecautions } from "@/entities/models";

// Shared

import { DeAlert } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

// Icon

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CautiousRecommender {
  sphere: string;
  goal?: string;
  task?: string;
  cautious?: boolean;
  recommend?: boolean;

  onGetCautiousRecommenderItem: (item: string) => void;
}

const DeCautiousRecommender: FC<CautiousRecommender> = ({
  sphere,
  goal,
  task,
  onGetCautiousRecommenderItem,
}) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [
    loadingRecommendationsAndPrecautions,
    setLoadingRecommendationsAndPrecautions,
  ] = useState(false);
  const [recommendationsAndPrecautions, setRecommendationsAndPrecautions] =
    useState<RecommendationsAndPrecautions | null>();

  // Methods

  const handleCautiousRecommender = (item: string) => {
    onGetCautiousRecommenderItem(item);
  };

  const getRecommendationAndPrecautions = async (): Promise<void> => {
    if (sphere && goal)
      try {
        setLoadingRecommendationsAndPrecautions(true);
        const prompt = generatePrompt("cautious", {
          LS: sphere,
          goal,
          task,
        });
        const res = await askGPT({
          content: prompt,
          max_tokens: 1000,
        });
        const data = res.toJSON<RecommendationsAndPrecautions>();
        if (!!data?.recommendations && Array.isArray(data?.recommendations))
          setRecommendationsAndPrecautions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRecommendationsAndPrecautions(false);
      }
  };

  useEffect(() => {
    if (
      recommendationsAndPrecautions !== null &&
      !loadingRecommendationsAndPrecautions
    )
      getRecommendationAndPrecautions();
  }, [goal]);

  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <h3 className="flex items-center justify-center gap-4">
          <span>{$t.createTaskExpectedResultRecommendations}</span>
          {loadingRecommendationsAndPrecautions ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
          ) : (
            !!recommendationsAndPrecautions?.recommendations &&
            `(${recommendationsAndPrecautions?.recommendations.length})`
          )}
        </h3>

        {!loadingRecommendationsAndPrecautions && (
          <ul className="space-y-2">
            {recommendationsAndPrecautions?.recommendations.map(
              (recommendation: string, i: number) => (
                <li
                  key={i}
                  className="flex items-center text-start gap-2 bg-green-50 rounded-md p-2 cursor-pointer"
                  onClick={() => handleCautiousRecommender(recommendation)}
                >
                  <DeAlert type="success" text={recommendation} />
                </li>
              )
            )}
          </ul>
        )}
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
  );
};

export default DeCautiousRecommender;
