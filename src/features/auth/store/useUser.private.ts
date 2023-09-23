import { setUser, resetUser } from "./user.private";

// Entities

import { User, Auth } from "@/entities/models";

// Shared

import { useAppSelector, useAppDispatch } from "@/shared/hooks";

type UserStoreHook = {
  user: Auth;
  dispatchSetUser: (user: User) => void;
  dispatchResetUser: () => void;
};

export default (): UserStoreHook => {
  const user: Auth = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return {
    user,
    dispatchSetUser: (user: User) => dispatch(setUser(user)),
    dispatchResetUser: () => dispatch(resetUser()),
  };
};
