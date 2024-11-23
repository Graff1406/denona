import { FC } from "react";

// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

interface Props {
  loading: boolean;
  pendingText: string;
  successText: string;
}

const DeLoadingBanner: FC<Props> = ({ loading, pendingText, successText }) => {
  return (
    <div className="space-y-6 text-sm tablet:text-base">
      {loading ? (
        <div className="flex justify-center items-center gap-4 bg-orange-50 dark:bg-zinc-800 dark:border-yellow-600 dark:border rounded-md p-4">
          <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 text-yellow-600" />

          <p className="text-yellow-600">{pendingText}</p>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 bg-green-50 dark:bg-zinc-800 dark:border-green-600 dark:border rounded-md p-4">
          <FaCheck className="w-8 h-8 text-green-600" />

          <p className="text-green-600">{successText}</p>
        </div>
      )}
    </div>
  );
};

export default DeLoadingBanner;
