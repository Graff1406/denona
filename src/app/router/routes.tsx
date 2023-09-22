import { ReactElement } from "react";
import AuthorizedRoute from "./AuthorizedRoute.private";

// Widget

import { MainLayout } from "@/widgets/layouts";

// Pages

import { AuthorizedHome, Settings } from "@/pages";

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
        element: <AuthorizedRoute component={AuthorizedHome} />,
      },
      {
        path: path.settings,
        element: <AuthorizedRoute component={Settings} />,
      },
    ],
  },
];

export default routes;
