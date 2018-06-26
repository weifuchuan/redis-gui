import { createClient, RedisClient } from "redis";
import { ConnectOpts } from "common/types";
import store from "../store";
import { channels } from "common/channel";

export function connect(
  opts: ConnectOpts
): Promise<channels.ConnectReturnMsg> {
  return new Promise<{
    ok: boolean;
    error?: Error;
  }>((resolve) => {
    store.client = createClient(opts);
    store.client.on("ready", () => {
      resolve({ ok: true });
    });
    store.client.on("error", err => {
      resolve({ ok: false, error: err });
    });
  });
}
