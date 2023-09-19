import { FC, useState, ReactNode } from "react";

// Icons
import { MdKeyboardArrowUp } from "react-icons/md";

interface Props {
  children: ReactNode;
  title: string;
}

const DeExpand: FC<Props> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="border rounded-lg mb-2 overflow-hidden">
      <button
        onClick={toggleExpansion}
        className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300"
        area-label={title}
        aria-expanded={expanded}
        aria-controls="expandable-content"
        role="button"
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold">{title}</span>
          <MdKeyboardArrowUp
            className={`w-6 h-6 animation ${
              expanded ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
      </button>
      <div
        className={`bg-white overflow-hidden transition-max-h duration-300 ${
          expanded ? "max-h-screen" : "max-h-0"
        }`}
        id="expandable-content"
        aria-hidden={!expanded}
      >
        {children}
      </div>
    </div>
  );
};

export default DeExpand;
