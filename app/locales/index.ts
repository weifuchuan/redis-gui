export namespace redions {
  export type T = "English" | "简体中文";
  export const EN = "English";
  export const ZH = "简体中文";
}

interface ITransfer {
  (...args: any[]): string;
}

class Dict {
  [id: string]: Dict | ITransfer;
}

const dict: Dict = {
  connect: {
    connectTitle: {
      [redions.EN]: () => "Connect To Redis",
      [redions.ZH]: () => "连接到Redis"
    },
    connect: {
      [redions.EN]: () => "Connect",
      [redions.ZH]: () => "连接"
    },
    host:{
      [redions.EN]: () => "Host",
      [redions.ZH]: () => "主机"
    },
    password:{
      [redions.EN]: () => "Password",
      [redions.ZH]: () => "密码"
    },
    port:{
      [redions.EN]: () => "Port",
      [redions.ZH]: () => "端口"
    },
    url:{
      [redions.EN]: () => "URL",
      [redions.ZH]: () => "URL"
    },
    string_numbers:{
      [redions.EN]: () => "Stringify number",
      [redions.ZH]: () => "字符串化数字"
    },
    socket_keepalive:{
      [redions.EN]: () => "Keep socket alive",
      [redions.ZH]: () => "保持Socket活动"
    },
    db:{
      [redions.EN]: () => "Database",
      [redions.ZH]: () => "数据库"
    },
    family:{
      [redions.EN]: () => "Family",
      [redions.ZH]: () => "协议族"
    },
    prefix:{
      [redions.EN]: () => "Key prefix",
      [redions.ZH]: () => "键的前缀"
    },
    keepSetting:{
      [redions.EN]: () => "Keep setting",
      [redions.ZH]: () => "保存设置"
    },
    autoConnect:{
      [redions.EN]: () => "Auto connect",
      [redions.ZH]: () => "自动连接"
    },
    help:{
      host:{
        [redions.EN]: () => "IP address of the Redis server",
        [redions.ZH]: () => "Redis服务器IP地址"
      },
      password:{
        [redions.EN]: () => "If set, client will run Redis auth command on connect.",
        [redions.ZH]: () => "如果设置，客户端将在连接上运行Redis认证命令。"
      },
      port:{
        [redions.EN]: () => "Port of the Redis server",
        [redions.ZH]: () => "Redis服务器端口"
      },
      url:{
        [redions.EN]: () => "The URL of the Redis server. Format: [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]",
        [redions.ZH]: () => "Redis服务器URL，格式：[redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]"
      },
      string_numbers:{
        [redions.EN]: () => "Return Redis number values as Strings instead of javascript Numbers.",
        [redions.ZH]: () => "将数字值作为字符串返回"
      },
      socket_keepalive:{
        [redions.EN]: () => "If set to true, the keep-alive functionality is enabled on the underlying socket.",
        [redions.ZH]: () => "如果设置为true，则在底层套接字上启用“保持活动”功能"
      },
      db:{
        [redions.EN]: () => "If set, client will run Redis select command on connect.",
        [redions.ZH]: () => "如果设置，客户端将在连接上运行select命令"
      },
      family:{
        [redions.EN]: () => "You can force using IPv6 if you set the family to ‘IPv6’. ",
        [redions.ZH]: () => "如果将系列设置为“IPv6”，则可以强制使用IPv6。"
      },
      prefix:{
        [redions.EN]: () => "A string used to prefix all used keys (e.g. namespace:test). Please be aware that the keys command will not be prefixed. The keys command has a “pattern” as argument and no key and it would be impossible to determine the existing keys in Redis if this would be prefixed.",
        [redions.ZH]: () => "用于前缀所有使用的键（例如namespace:test）的字符串。请注意，该keys命令不会加上前缀。该keys命令有一个“模式”作为参数，没有密钥，如果这将被加上前缀，就不可能确定Redis中现有的密钥。"
      },
      keepSetting:{
        [redions.EN]: () => "Keep current setting",
        [redions.ZH]: () => "保存当前设置"
      },
      autoConnect:{
        [redions.EN]: () => "Next time you enter automatic connection",
        [redions.ZH]: () => "下次进入自动连接"
      }
    },
    error:{
      host:{
        [redions.EN]: () => "Must be valid HOST address",
        [redions.ZH]: () => "必须是合法主机地址"
      },
      password:{
        [redions.EN]: () => "Must match \S*",
        [redions.ZH]: () => "必须匹配 \S*"
      },
      port:{
        [redions.EN]: () => "1-65535",
        [redions.ZH]: () => "1-65535"
      },
      url:{
        [redions.EN]: () => "The URL of the Redis server. Format: [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]",
        [redions.ZH]: () => "Redis服务器URL，格式：[redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]"
      },
      string_numbers:{
        [redions.EN]: () => "Return Redis number values as Strings instead of javascript Numbers.",
        [redions.ZH]: () => "将数字值作为字符串返回"
      },
      socket_keepalive:{
        [redions.EN]: () => "If set to true, the keep-alive functionality is enabled on the underlying socket.",
        [redions.ZH]: () => "如果设置为true，则在底层套接字上启用“保持活动”功能"
      },
      db:{
        [redions.EN]: () => "If set, client will run Redis select command on connect.",
        [redions.ZH]: () => "如果设置，客户端将在连接上运行select命令"
      },
      family:{
        [redions.EN]: () => "You can force using IPv6 if you set the family to ‘IPv6’. ",
        [redions.ZH]: () => "如果将系列设置为“IPv6”，则可以强制使用IPv6。"
      },
      prefix:{
        [redions.EN]: () => "A string used to prefix all used keys (e.g. namespace:test). Please be aware that the keys command will not be prefixed. The keys command has a “pattern” as argument and no key and it would be impossible to determine the existing keys in Redis if this would be prefixed.",
        [redions.ZH]: () => "用于前缀所有使用的键（例如namespace:test）的字符串。请注意，该keys命令不会加上前缀。该keys命令有一个“模式”作为参数，没有密钥，如果这将被加上前缀，就不可能确定Redis中现有的密钥。"
      },
    }
  }
};

export function get(keys: string[], redion: redions.T, ...args: any[]): string {
  let d: Dict = dict;
  for (let key of keys) {
    if (d[key]) {
      d = d[key] as Dict;
    } else return "";
  }
  return (d[redion] as ITransfer)(...args);
}
