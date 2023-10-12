import { FC } from "react";

// Icons

import { MdCheckCircle } from "react-icons/md";

interface Props {
  value: string;
  id: string;
  label: string;
  hint: string;
  scrollDirectionY?: "down" | "up" | null;
  onClick?: (label: string) => void;
}

const ListItem: FC<Props> = ({
  value,
  id,
  label,
  hint,
  scrollDirectionY,
  onClick,
}) => {
  // method

  const handleClick = (id: string) => {
    if (onClick) onClick(id);
  };

  return (
    <li
      key={id}
      className={[
        "flex border p-2 my-2 rounded-md cursor-pointer animation",
        value && id === value
          ? "bg-yellow-700 text-white border-yellow-800 shadow-md sticky"
          : "bg-zinc-100  border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:border dark:border-zinc-700",
        scrollDirectionY === "down" ? " top-3" : "bottom-20",
      ].join(" ")}
      onClick={() => handleClick(id)}
    >
      <div
        className={[
          "flex items-center px-2 animation",
          value && id === value ? "w-10" : "w-0",
        ].join(" ")}
      >
        <MdCheckCircle className="h-6 w-6 text-white" />
      </div>
      <div className="grow">
        <p className="font-semibold">{label}</p>
        <p className="text-xs">{hint}</p>
      </div>
    </li>
  );
};

export default ListItem;
