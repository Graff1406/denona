import { FC, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Shared

import { path } from "@/shared/constants";
import { useTranslations } from "@/shared/hooks";

// Icon

import { IoHome } from "react-icons/io5";
import { GiLifeInTheBalance, GiStairsGoal } from "react-icons/gi";
import { MdOutlineAddTask } from "react-icons/md";

const Menu: FC = () => {
  interface Menu {
    id: number;
    label: string;
    areaLabel: string;
    route: string;
    icon: ReactNode;
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
      icon: <IoHome />,
    },
    {
      id: 2,
      label: $t.appPageTaskTitle,
      areaLabel: $t.appPageTaskDescription,
      route: path.create,
      icon: <MdOutlineAddTask />,
    },
    {
      id: 3,
      label: $t.createTaskCalendarSingleTaskGoalLabel,
      areaLabel: $t.goalDescription,
      route: path.goal,
      icon: <GiStairsGoal />,
    },
    {
      id: 4,
      label: $t.createTaskCalendarSingleTaskSphereLabel,
      areaLabel: $t.createTaskPageAddLifeSphereProggressListNoyetSpheres,
      route: path.defineLifeSphere,
      icon: <GiLifeInTheBalance />,
    },
  ];

  return (
    <nav>
      <ul role="navigation">
        {menu.map((el) => (
          <li
            key={el.id}
            className={`px-3 py-2 animation hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer rounded-md text-lg ${
              location.pathname === el.route
                ? "text-yellow-700 bg-zinc-50 dark:bg-zinc-900"
                : "text-base  dark:text-zinc-400"
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
              <span className="text-2xl">{el.icon}</span>
              <span>{el.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
