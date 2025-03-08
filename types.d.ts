declare interface IAuthGetResponse {
  id: number;
  email: string;
}

declare interface IAuthPostResponse {
  id: number;
  email: string;
}

declare interface ILoginData {
  email: string;
  password: string;
}

declare interface ILoginResponse {
  accessToken: string
}

declare interface IRegistrationData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

declare interface IRegistrationResponse {
  id: number;
  email: string;
}

declare interface INote {
  id: number;
  title: string;
  content: string;
}

declare interface ICreateNote {
  title: string;
  content: string;
}
