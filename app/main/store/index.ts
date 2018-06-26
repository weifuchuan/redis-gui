import { RedisClient } from "redis";
import * as Lowdb from "lowdb";
import FileSync = require("lowdb/adapters/FileSync");
import { ConnectOpts } from "common/types";
import { AES, enc } from "crypto-js";

const key = "DA828FE6C8A0D0A20670CCCA2EDE8B69";

class MainStore {
  private _connectOptsLocal: Lowdb.LowdbSync<ConnectOpts>;

  client: RedisClient;
  get connectOptsLocal(): Lowdb.LowdbSync<ConnectOpts> {
    if (this._connectOptsLocal) return this._connectOptsLocal;
    else {
      this._connectOptsLocal = Lowdb(
        new FileSync<ConnectOpts>("data/connect_opts.dat", {
          defaultValue: {
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
          },
          serialize: (opts: ConnectOpts): string => {
            const str = JSON.stringify(opts);
            return AES.encrypt(str, key).toString();
          },
          deserialize: (raw: string): ConnectOpts => {
            raw = AES.decrypt(raw, key).toString(enc.Utf8);
            return JSON.parse(raw);
          }
        })
      );
      return this._connectOptsLocal;
    }
  }
}

export default new MainStore();
