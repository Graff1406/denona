import { ReactElement } from "react";

// Widget

import { MainLayout } from "@/widgets/layouts";

// Pages

import { Home, Settings } from "@/pages";

interface Route {
  path: string;
  element: ReactElement;
  children?: { path: string; element: ReactElement }[];
}

const routes: Route[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/settings",
        element: Settings,
      },
    ],
  },
];

export default routes;
