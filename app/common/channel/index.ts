export namespace channels {
  export const CONNECT = "connect";
  export const CONNECT_RETURN = "connectReturn";
  export interface ConnectReturnMsg {
    ok: boolean;
    error?: any;
  }
}
