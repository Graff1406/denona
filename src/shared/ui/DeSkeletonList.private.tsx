import { FC, ReactNode } from "react";

interface List {
  loading: boolean;
  children?: ReactNode;
  limit?: number;
  className?: string;
}
const DeSkeletonList: FC<List> = ({
  loading,
  limit = 10,
  children,
  className,
}) => {
  return (
    <>
      {loading ? (
        Array.from({ length: limit }).map((_item, i) => (
          <div
            key={`skeleton-item-${i}`}
            className={["skeleton w-full h-14 mb-2 rounded-md", className].join(
              " "
            )}
          ></div>
        ))
      ) : children ? (
        <div>{children}</div>
      ) : null}
    </>
  );
};

export default DeSkeletonList;
