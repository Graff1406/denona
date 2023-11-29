import { FC } from "react";

// Icons

import { MdRecommend } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

interface AlertProps {
  type: "success" | "warning" | "error";
  text: string;
}

const Alert: FC<AlertProps> = ({ type, text }) => {
  let bgColor = "";
  let iconColor = "";
  let Icon: React.ElementType = RiErrorWarningFill;
  switch (type) {
    case "success":
      bgColor = "bg-green-50";
      iconColor = "text-green-500";
      Icon = MdRecommend;
      break;
    case "warning":
      bgColor = "bg-orange-50";
      iconColor = "text-orange-500";
      break;
    case "error":
      bgColor = "bg-red-50";
      iconColor = "text-red-500";
      break;
    default:
      bgColor = "bg-zinc-50";
      iconColor = "text-zinc-500";
  }

  return (
    <div
      className={`flex items-center text-start gap-3 rounded-md p-2 ${bgColor}`}
    >
      <span className="w-7 h-7">
        <Icon className={`${iconColor} w-7 h-7`} />
      </span>
      <span>{text}</span>
    </div>
  );
};

export default Alert;
