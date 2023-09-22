import { FC, ComponentType, useEffect } from "react";
import { redirect, useLocation } from "react-router-dom";

// Features

import { useUserStore } from "@/features/auth";

// Pages

import { Home } from "@/pages";

interface AuthorizedRouteProps {
  component: ComponentType;
}

const AuthorizedRoute: FC<AuthorizedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  // Use

  const { user } = useUserStore();
  const locate = useLocation();

  useEffect(() => {
    if (!user.auth && locate.pathname !== "/") redirect("/");
  }, [locate.pathname]);

  return user.auth ? <Component {...rest} /> : <Home />;
};

export default AuthorizedRoute;
