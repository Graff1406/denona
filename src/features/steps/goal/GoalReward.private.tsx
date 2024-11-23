import { FC, ChangeEvent } from "react";

// Shared

import { DeTextarea } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

interface Props {
  reward: string;
  onChange: (sc: string) => void;
}

const GoalReward: FC<Props> = ({ reward, onChange }) => {
  // Use
  const { $t } = useTranslations();

  // Methods

  const handleReward = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <div className="divider"></div>
      <p className="text-start text-sm tablet:text-lg">
        {$t.goalPersonalRewardHint}
      </p>
      <DeTextarea
        value={reward ?? ""}
        placeholder={$t.goalPersonalReward}
        onChange={handleReward}
      />
    </div>
  );
};

export default GoalReward;
