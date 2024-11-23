import { FC, ChangeEvent } from "react";

// Shared

import { DeField, DeTextarea } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

interface Props {
  title: string;
  description: string;
  onChange: (data: { title: string; description: string }) => void;
}

const TaskDescription: FC<Props> = ({ title, description, onChange }) => {
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
      <section>
        <p className="step-hint">{$t.createTaskTitleHint}</p>
        <DeField
          value={title}
          placeholder={`${$t.createTaskTitle} *`}
          onChange={handleTitle}
        />
      </section>

      <section>
        <p className="step-hint">{$t.createTaskDescriptionHint}</p>
        <DeTextarea
          value={description}
          placeholder={`${$t.createTaskDescription} *`}
          onChange={handleDescription}
        />
      </section>
    </div>
  );
};

export default TaskDescription;
