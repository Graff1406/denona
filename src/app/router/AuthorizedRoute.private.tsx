import { FC, ComponentType, useEffect } from "react";
import { redirect, useLocation } from "react-router-dom";

// Features
import { useUserStore } from "@/features/auth";

// Pages
import { Home } from "@/pages";

// Shared
import { path } from "@/shared/constants";

const accessiblePages = [path.help];

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

  // Garde conditions

  const unAuthorizedUser = !user.auth && path.home;

  useEffect(() => {
    if (unAuthorizedUser) redirect(path.home);
  }, [locate.pathname]);

  return unAuthorizedUser ? (
    accessiblePages.includes(locate.pathname) ? (
      <Component {...rest} />
    ) : (
      <Home />
    )
  ) : (
    <Component {...rest} />
  );
};

export default AuthorizedRoute;
