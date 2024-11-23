import { FC, ChangeEvent } from "react";

// Shared

import { DeTextarea } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

interface Props {
  successCriteria: string;
  onChange: (sc: string) => void;
}

const GoalSuccessCriteria: FC<Props> = ({ successCriteria, onChange }) => {
  // Use
  const { $t } = useTranslations();

  // Methods

  const handleSuccessCriteria = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <DeTextarea
        value={successCriteria ?? ""}
        placeholder={$t.goalSuccessCriteria}
        hint={$t.successCriteriaHint}
        onChange={handleSuccessCriteria}
      />
    </div>
  );
};

export default GoalSuccessCriteria;
