export type UserLocalData = {
  name: string,
  token: {
    value: string,
    exp: number
  }
  roles: string[],
  image: string
}

export type SuccessLoginResponse = {
  isBanned: boolean;
  requiresVerification: boolean;
  data: {
    token: string;
    user: {
      userName: string;
      email: string;
      image?: string;
      token: string;
      userRoles: { roleName: string }[];
    };
  };
  message: string
}

export type ErrorLoginResponse = {
  isBanned: boolean;
  requiresVerification: boolean;
  bannedAccountId: number;
  code: number;
  systemCode: string | null;
  message: string;
  data: null;
}

export type ErrorGenericResponse = {
  code: number | null,
  systemCode: number | null,
  message: string,
  data: any
}