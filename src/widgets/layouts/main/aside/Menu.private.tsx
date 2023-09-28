import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Shared

import { path } from "@/shared/constants";
import { useTranslations } from "@/shared/hooks";

// Icon

import { IoHome } from "react-icons/io5";

const Menu: FC = () => {
  interface Menu {
    id: number;
    label: string;
    areaLabel: string;
    route: string;
    icon: string;
  }

  // Use

  const { $t } = useTranslations();
  const location = useLocation();

  const menu: Menu[] = [
    {
      id: 1,
      label: $t.appMenuLinkHomeLabel,
      areaLabel: $t.appMenuLinkHomeAreaLabel,
      route: path.home,
      icon: "home",
    },
  ];

  return (
    <nav>
      <ul role="navigation">
        {menu.map((el) => (
          <li
            key={el.id}
            className={`px-3 py-2 animation hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-400 cursor-pointer rounded-md text-lg ${
              location.pathname === el.route
                ? "text-yellow-700 bg-zinc-50 dark:bg-zinc-900"
                : "text-base"
            }`}
          >
            <NavLink
              to={el.route}
              className="flex gap-4 items-center"
              aria-label={el.areaLabel}
              title={el.areaLabel}
              tabIndex={0}
              aria-current={location.pathname === el.route ? "page" : undefined}
            >
              <span className="text-2xl">
                <IoHome />
              </span>
              <span>{el.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
