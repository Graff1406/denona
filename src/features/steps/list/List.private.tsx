import { FC, ReactNode } from "react";
import { useLocale } from "@/shared/hooks";

type ListItems<T> = {
  id: string;
  label: string;
  hint: string;
} & T;

interface Props<T> {
  children: (item: ListItems<T>) => ReactNode;
  items?: T[];
}

const List: FC<Props<any>> = ({ children, items = [] }) => {
  const { locale } = useLocale();

  return (
    <ul className="relative">
      {items.map((item: any) => {
        const listItem = {
          ...item[locale.code],
          ...item,
          id: item?.id,
        } as ListItems<any>;
        return children(listItem);
      })}
    </ul>
  );
};

export default List;
