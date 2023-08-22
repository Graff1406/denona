import { type UserState, setUser, resetUser } from "./user.private";
import { AuthUser } from "@/shared/firebase";

// Shared

import { useAppSelector, useAppDispatch } from "@/shared/hooks";

type UserStoreHook = {
  user: UserState;
  dispatchSetUser: (user: AuthUser) => void;
  dispatchResetUser: () => void;
};

export default (): UserStoreHook => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return {
    user,
    dispatchSetUser: (user: AuthUser) => dispatch(setUser(user)),
    dispatchResetUser: () => dispatch(resetUser()),
  };
};
