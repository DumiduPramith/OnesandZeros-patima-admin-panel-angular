export interface LoginResponseInterface {
  status: string;
  token: {
    refresh: string;
    access: string;
  };
  message: string;
}
