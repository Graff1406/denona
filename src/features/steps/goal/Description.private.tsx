import { FC, ChangeEvent } from "react";

// Shared

import { DeField, DeTextarea } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

interface Props {
  title: string;
  description: string;
  onChange: (data: { title: string; description: string }) => void;
}

const GoalDescription: FC<Props> = ({ title, description, onChange }) => {
  // Use
  const { $t } = useTranslations();

  // Methods

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ title: event.target.value, description });
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ description: event.target.value, title });
  };

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <div className="divider"></div>
      <p className="text-start text-sm tablet:text-lg">{$t.goalTitleHint}</p>
      <DeField
        value={title}
        placeholder={`${$t.goalTitle} *`}
        onChange={handleTitle}
      />

      <div className="divider"></div>
      <p className="text-start text-sm tablet:text-lg">
        {$t.goalDescriptionHint}
      </p>

      <DeTextarea
        value={description}
        placeholder={`${$t.goalDescription} *`}
        onChange={handleDescription}
      />
    </div>
  );
};

export default GoalDescription;
