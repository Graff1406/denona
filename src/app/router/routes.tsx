import React from "react";

// Pages

import { Home } from "@/pages";

interface Route {
  path: string;
  element: React.ReactElement;
  children?: { path: string; element: React.ReactElement }[];
}

const routes: Route[] = [
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/user",
  //   element: <h1>404</h1>,
  //   children: [
  //     { path: "/*", element: <div>404</div> },
  //     { path: "/**", element: <div>404</div> },
  //   ],
  // },
];

export default routes;
