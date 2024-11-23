import React, { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DeCardProps {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
}

const DeCard: React.FC<DeCardProps> = ({
  header,
  content,
  footer,
  loading,
}) => {
  return (
    <div className="border dark:border-zinc-700 rounded-md p-2 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-200">
          <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin" />
        </div>
      )}

      <div className="head">{header}</div>
      {content && (
        <>
          <div className="divider my-2"></div>
          <div className="content">{content}</div>
        </>
      )}

      {footer && (
        <>
          <div className="divider my-2"></div>
          <div className="footer">{footer}</div>
        </>
      )}
    </div>
  );
};

export default DeCard;
