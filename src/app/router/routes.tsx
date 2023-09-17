import { ReactElement } from "react";

// Widget

import { MainLayout } from "@/widgets/layouts";

// Pages

import { Home, Settings } from "@/pages";

// Shared

import { path } from "@/shared/constants";

interface Route {
  path: string;
  element: ReactElement;
  children?: { path: string; element: ReactElement }[];
}

const routes: Route[] = [
  {
    path: path.home,
    element: <MainLayout />,
    children: [
      {
        path: path.home,
        element: <Home />,
      },
      {
        path: path.settings,
        element: <Settings />,
      },
    ],
  },
];

export default routes;
