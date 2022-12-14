export interface LoginResInterface {
  token: string;
  activeID: string;
  ok: boolean;
  error?: string;
}
export interface RegResponseInterface {
  ok: boolean;
  alreadyExist: true;
}
