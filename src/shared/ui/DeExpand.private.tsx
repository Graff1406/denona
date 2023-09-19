import { FC, useState, ReactNode } from "react";

// Interfaces

interface Props {
  children: ReactNode;
  title: string;
}

const DeExpand: FC<Props> = ({ title, children }) => {
  // State

  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="border rounded-lg mb-2 overflow-hidden">
      <button
        onClick={toggleExpansion}
        className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300"
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold">{title}</span>
          <span>{expanded ? "▲" : "▼"}</span>
        </div>
      </button>
      <div
        className={`bg-white animation overflow-hidden ${
          expanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DeExpand;
