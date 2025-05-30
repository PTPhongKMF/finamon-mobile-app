export type LoginResponse = {
  isBanned: boolean;
  requiresVerification: boolean;
  data: {
    token: string;
    user: {
      userName: string;
      email: string;
      image?: string;
      userRoles: { roleName: string }[];
    };
  };
}

export type UserLocalData = {
  name: string,
  token: {
    value: string,
    exp: number
  }
  roles: string[],
  image: string
}