import { FC, ReactNode } from "react";

// Entities

import { Sphere } from "@/entities/models";

// Shared

import { useLocale } from "@/shared/hooks";

type SphereItem = {
  id: string;
  label: string;
  hint: string;
};

interface Props {
  children: (sphere: SphereItem) => ReactNode;
  items: Sphere[];
}

const List: FC<Props> = ({ children, items }) => {
  // use

  const { locale } = useLocale();

  return (
    <ul className="relative">
      {items.map((sphere: Sphere) => {
        const item = {
          ...sphere[locale.code],
          id: sphere?.id,
        } as SphereItem;
        return children(item);
      })}
    </ul>
  );
};

export default List;
