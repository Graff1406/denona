type User = {
  accessToken: string | null;
  uid: string;
  email: string | null;
  emailVerified: boolean;
  photoURL?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  inProgressLifeSpheres?: string[];
  hide?: {
    banner?: {
      welcomeAuthorizedUser?: boolean;
    };
  };
};

export default User;
