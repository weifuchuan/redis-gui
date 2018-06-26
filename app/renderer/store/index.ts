import { observable } from "mobx";
import { redions } from "locales";
import { ConnectOpts } from "common/types";
import { sendR } from "common/kit/renderer";

export class Store {
  @observable redion: redions.T = redions.ZH;
  @observable
  clientOpts: ConnectOpts = {
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

  async connect(opts: ConnectOpts) {
    
  }
}

export default new Store();
