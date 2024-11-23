import { FC, useState } from "react";

// Entities

import { Goal, Sphere } from "@/entities/models";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeButton } from "@/shared/ui";

interface Props {
  sphere: Sphere;
  goal: Goal;
}

const TaskRecommendAndPrecaution: FC<Props> = ({ sphere, goal }) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [loading, setLoading] = useState(false);

  // Methods

  const generateRecommendAndPrecaution = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("GoalRecommendAndPrecaution", sphere, goal);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="space-y-4 tablet:space-y-6">
      <div className="divider"></div>
      <p className="text-start text-sm tablet:text-lg">
        {$t.createGoalRecommendPrecautionHint}
      </p>
      <div className="flex justify-center">
        <DeButton
          label="Generate recommend"
          areaLabel="Generate recommend"
          className="w-full tablet:w-1/2"
          loading={loading}
          onClick={generateRecommendAndPrecaution}
        />
      </div>
    </div>
  );
};

export default TaskRecommendAndPrecaution;
