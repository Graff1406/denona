import { FC, ReactNode } from "react";

interface StepProps {
  children?: ReactNode;
  title?: string;
  active: boolean;
}

const Step: FC<StepProps> = ({ children, active, title }) => {
  return (
    <div
      className={["w-full space-y-4", active ? "block" : "hidden"].join(" ")}
    >
      {title && <h2 className="text-2xl">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default Step;
