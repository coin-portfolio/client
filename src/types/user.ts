export type signUpParmasObj = {
  id: string;
  password: string;
  email: string;
  date?: any;
};

export type signUpObj = signUpParmasObj & {
  passwordConfirm: string;
};

export type signInObj = {
  id: string;
  password: string;
};

export type UserStateType = {
  userId: string;
};
