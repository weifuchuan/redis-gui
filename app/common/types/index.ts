import { ClientOpts } from "redis";

export interface ConnectOpts extends ClientOpts {
  keepSetting: boolean;
  autoConnect: boolean;
}

export const defaultConnectOpts: ConnectOpts = {
  host: "127.0.0.1",
  port: 6379,
  path: "",
  url: "",
  string_numbers: false,
  socket_keepalive: true,
  password: "",
  db: "",
  family: "IPv4",
  prefix: "",
  keepSetting: true,
  autoConnect: false
};
