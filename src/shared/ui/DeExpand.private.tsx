import { FC, useState, ReactNode, MouseEventHandler, MouseEvent } from "react";

// Icons
import { MdKeyboardArrowUp } from "react-icons/md";

interface Props {
  children: ReactNode;
  title: string;
  id?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DeExpand: FC<Props> = ({ id, title, children, icon, onClick }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = (e: MouseEvent<HTMLButtonElement>) => {
    setExpanded(!expanded);
    if (onClick) onClick(e);
  };

  return (
    <section
      id={id}
      className="border dark:border-zinc-700 rounded-lg overflow-hidden"
    >
      <button
        onClick={toggleExpansion}
        className="w-full text-left dark:text-zinc-400 py-2 px-4 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 focus:outline-none focus:bg-zinc-200 animation"
        area-label={title}
        aria-expanded={expanded}
        aria-controls="expandable-content"
        role="button"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {icon}
            <span className="font-semibold">{title}</span>
          </div>
          <MdKeyboardArrowUp
            className={`w-6 h-6 animation dark:text-zinc-400 ${
              expanded ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
      </button>
      <div
        className={`bg-white dark:bg-zinc-800 overflow-hidden animation ${
          expanded ? "max-h-screen" : "max-h-0"
        }`}
        id="expandable-content"
        aria-hidden={!expanded}
      >
        {children}
      </div>
    </section>
  );
};

export default DeExpand;
