import * as E from "electron";

import EventEmitter = require("wolfy87-eventemitter");
const md5: (v: string) => string = require("js-md5");
export interface IMsg {
  id: string;
  args: any[];
}

export function onM(
  channel: string,
  returnChannel: string,
  listener: (...args: any[]) => any[]
): void {
  E.ipcMain.on(channel, (event: E.IpcMessageEvent, msg: IMsg) => {
    event.sender.send(returnChannel, <IMsg>{
      id: msg.id,
      args: listener(...msg.args)
    });
  });
}

export function onMAsync(
  channel: string,
  returnChannel: string,
  listener: (...args: any[]) => Promise<any[]>
): void {
  E.ipcMain.on(channel, async (event: E.IpcMessageEvent, msg: IMsg) => {
    event.sender.send(returnChannel, <IMsg>{
      id: msg.id,
      args: await listener(...msg.args)
    });
  });
}

export interface IMsg {
  id: string;
  args: any[];
}

const bus = new EventEmitter();
const returnChannelRecord = new Set<string>();

function idGenerator(name: string): string {
  return `${name}:${md5(Math.random().toString())}`;
}

export function sendM(
  channel: string,
  returnChannel: string,
  ...args: any[]
): (id?: number) => Promise<any[]> {
  if (!returnChannelRecord.has(returnChannel)) {
    E.ipcMain.on(returnChannel, (event: E.IpcMessageEvent, msg: IMsg) => {
      bus.emit(msg.id, msg.args);
    });
    returnChannelRecord.add(returnChannel);
  }
  const msg: IMsg = {
    id: idGenerator(channel),
    args: args
  };
  return id =>
    new Promise(resolve => {
      bus.once(msg.id, resolve);
      if (id) {
        E.webContents.fromId(id).send(channel, msg);
      } else E.webContents.getAllWebContents()[0].send(channel, msg);
    });
}
