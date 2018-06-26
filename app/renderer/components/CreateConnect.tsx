import * as React from "react";
import { Store } from "renderer/store";
import { get, redions } from "locales";
import { Button, Form, Input, InputNumber, Switch, Select } from "antd";
import { inject, observer } from "mobx-react";
import { FormCreateOption, FormComponentProps } from "antd/lib/form";
import { ConnectOpts } from "common/types";
import { toJS } from "mobx";
import { sendR } from "common/kit/renderer";
import { channels } from "common/channel";

const ScrollArea = require("./ScrollArea");

interface IPropsCreateConnect {
  store?: Store;
}

interface ISelfState {}

interface ICreateConnnet {
  selfState: ISelfState;
}

@inject("store")
@observer
export default class CreateConnect extends React.Component<IPropsCreateConnect>
  implements ICreateConnnet {
  selfState: ISelfState;

  constructor(props: IPropsCreateConnect) {
    super(props);
  }

  render() {
    const store = this.props.store || /* Impossible -> */ new Store() /* <- */;
    return (
      <div className="c-flex full">
        <div className="r-flex" style={{ width: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: "2em" }}>
            {get(["connect", "connectTitle"], store.redion)}
          </div>
          <div
            className={"r-flex"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <Button type="primary" onClick={this.connect}>
              {get(["connect", "connect"], store.redion)}
            </Button>
            <Button type="primary" onClick={this.connect}>
              {get(["connect", "connect"], store.redion)}
            </Button>
          </div>
        </div>
        <ScrollArea style={{ flex: 1 }}>
          <ConnectForm
            initOpts={toJS(store.clientOpts)}
            setGetClientOpts={this.setGetClientOpts}
          />
        </ScrollArea>
      </div>
    );
  }

  connect = async () => {
    const opts: ConnectOpts = this.getClientOpts() as ConnectOpts;
    const msg: channels.ConnectReturnMsg = (await sendR(
      channels.CONNECT,
      channels.CONNECT_RETURN,
      opts
    ))[0];
    if (msg.ok){
      console.log('connect success');
    }else{
      console.log("ERROR:", JSON.stringify(msg.error)); 
    }
  };

  setGetClientOpts = (fun: (fieldNames?: string[] | undefined) => Object) => {
    this.getClientOpts = fun;
  };

  getClientOpts = (fieldNames?: string[] | undefined): Object => {
    return {};
  };
}

const ConnectForm = inject("store")(
  observer(
    Form.create({})(
      class _ConnectForm extends React.Component<
        FormComponentProps & {
          initOpts: ConnectOpts;
          setGetClientOpts: (
            fun: (fieldNames?: string[] | undefined) => Object
          ) => void;
          store?: Store;
        }
      > {
        render() {
          const { getFieldsValue, getFieldDecorator } = this.props.form;
          const opts = this.props.initOpts;
          this.props.setGetClientOpts(getFieldsValue);
          const store =
            this.props.store || /* Impossible -> */ new Store() /* <- */;
          const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
          };
          return (
            <Form>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "host"], store.redion)}
                extra={get(["connect", "help", "host"], store.redion)}
              >
                {getFieldDecorator("host", {
                  initialValue: opts.host,
                  rules: [
                    {
                      pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s)|(([a-zA-Z0-9\-]+\.?)*[a-zA-Z0-9\-]+)$/,
                      message: get(["connect", "error", "host"], store.redion)
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "port"], store.redion)}
                extra={get(["connect", "help", "port"], store.redion)}
              >
                {getFieldDecorator("port", {
                  initialValue: opts.port,
                  rules: [
                    {
                      type: "integer",
                      message: get(["connect", "error", "port"], store.redion)
                    }
                  ]
                })(<InputNumber min={1} max={65535} />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "password"], store.redion)}
                extra={get(["connect", "help", "password"], store.redion)}
              >
                {getFieldDecorator("password", {
                  initialValue: opts.password,
                  rules: [
                    {
                      pattern: /^\S*$/,
                      message: get(
                        ["connect", "error", "password"],
                        store.redion
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "url"], store.redion)}
                extra={get(["connect", "help", "url"], store.redion)}
              >
                {getFieldDecorator("url", {
                  initialValue: opts.url,
                  rules: [
                    {
                      pattern: /^(rediss?)?\:\/\/((\S+?)?(\:\S+?@)?)?(([a-zA-Z0-9\-]+\.?)*[a-zA-Z0-9\-]+)?(\:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5]))?(\/[0-9]+)?(\?db=[0-9]+(&password=[^\s&]*?(&option=\S*)?)?)?$/,
                      message: get(["connect", "error", "url"], store.redion)
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "string_numbers"], store.redion)}
                extra={get(["connect", "help", "string_numbers"], store.redion)}
              >
                {getFieldDecorator("string_numbers", {
                  valuePropName: "checked",
                  initialValue: opts.string_numbers
                })(<Switch />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "socket_keepalive"], store.redion)}
                extra={get(
                  ["connect", "help", "socket_keepalive"],
                  store.redion
                )}
              >
                {getFieldDecorator("socket_keepalive", {
                  valuePropName: "checked",
                  initialValue: opts.socket_keepalive
                })(<Switch />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "db"], store.redion)}
                extra={get(["connect", "help", "db"], store.redion)}
              >
                {getFieldDecorator("db", {
                  initialValue: opts.db,
                  rules: [
                    {
                      type: "integer",
                      message: get(["connect", "error", "db"], store.redion)
                    }
                  ]
                })(<InputNumber min={1} />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "family"], store.redion)}
                extra={get(["connect", "help", "family"], store.redion)}
              >
                {getFieldDecorator("family", { initialValue: opts.family })(
                  <Select>
                    <Select.Option value="IPv4">IPv4</Select.Option>
                    <Select.Option value="IPv6">IPv6</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "prefix"], store.redion)}
                extra={get(["connect", "help", "prefix"], store.redion)}
              >
                {getFieldDecorator("prefix", {
                  initialValue: opts.prefix,
                  rules: [
                    {
                      pattern: /^\S*$/,
                      message: get(["connect", "error", "prefix"], store.redion)
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "keepSetting"], store.redion)}
                extra={get(["connect", "help", "keepSetting"], store.redion)}
              >
                {getFieldDecorator("keepSetting", {
                  valuePropName: "checked",
                  initialValue: opts.keepSetting
                })(<Switch />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={get(["connect", "autoConnect"], store.redion)}
                extra={get(["connect", "help", "autoConnect"], store.redion)}
              >
                {getFieldDecorator("autoConnect", {
                  valuePropName: "checked",
                  initialValue: opts.autoConnect
                })(<Switch />)}
              </Form.Item>
            </Form>
          );
        }
      }
    )
  )
);

/*
Property	Default	Description
host |	127.0.0.1 |	IP address of the Redis server

port |	6379 |	Port of the Redis server

path |	null |	The UNIX socket string of the Redis server

url |	null |	The URL of the Redis server. Format: [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]] (More info avaliable at IANA).

string_numbers |	null |	Set to true, node_redis will return Redis number values as Strings instead of javascript Numbers. Useful if you need to handle big numbers (above Number.MAX_SAFE_INTEGER === 2^53). Hiredis is incapable of this behavior, so setting this option to true will result in the built-in javascript parser being used no matter the value of the parser option. 设置为true，node_redis将返回Redis数字值作为字符串而不是javascript数字。如果您需要处理大数字（以上Number.MAX_SAFE_INTEGER === 2^53），这很有用。Hiredis不具备这种行为，因此将此选项设置为true将导致无论parser选项的值如何都会使用内置的JavaScript分析器。

return_buffers |	false |	If set to true, then all replies will be sent to callbacks as Buffers instead of Strings. 如果设置为true，则所有回复将作为缓冲区而不是字符串发送到回调。

detect_buffers |	false |	If set to true, then replies will be sent to callbacks as Buffers. This option lets you switch between Buffers and Strings on a per-command basis, whereas return_buffers applies to every command on a client. Note: This doesn’t work properly with the pubsub mode. A subscriber has to either always return Strings or Buffers. 如果设置为true，则回复将作为缓冲区发送到回调。此选项允许您在每个命令的基础上在缓冲区和字符串之间切换，而return_buffers适用于客户端上的每个命令。注意：这与pubsub模式无法正常工作。用户必须总是返回字符串或缓冲区。

socket_keepalive |	true |	If set to true, the keep-alive functionality is enabled on the underlying socket. 如果设置为true，则在底层套接字上启用保持活动功能。

no_ready_check |	false |	When a connection is established to the Redis server, the server might still be loading the database from disk. While loading, the server will not respond to any commands. To work around this, node_redis has a “ready check” which sends the INFO command to the server. The response from the INFO command indicates whether the server is ready for more commands. When ready, node_redis emits a ready event. Setting no_ready_check to true will inhibit this check. 当连接建立到Redis服务器时，服务器可能仍在从磁盘加载数据库。加载时，服务器不会响应任何命令。要解决这个问题，node_redis有一个“准备检查”，将INFO命令发送到服务器。该INFO命令的响应指示服务器是否准备好了更多命令。准备好后，node_redis发出一个ready事件。设置no_ready_check为true将禁止此检查。

enable_offline_queue |	true |	By default, if there is no active connection to the Redis server, commands are added to a queue and are executed once the connection has been established. Setting enable_offline_queue to false will disable this feature and the callback will be executed immediately with an error, or an error will be emitted if no callback is specified. 默认情况下，如果没有与Redis服务器的活动连接，则命令会添加到队列中，并在连接建立后执行。设置enable_offline_queue为false将禁用此功能，并且回调将立即执行并发生错误，或者如果未指定回调，则会发出错误。

retry_unfulfilled_commands |	false |	If set to true, all commands that were unfulfilled while the connection is lost will be retried after the connection has been reestablished. Use this with caution if you use state altering commands (e.g. incr). This is especially useful if you use blocking commands.

password |	null |	If set, client will run Redis auth command on connect. Alias auth_pass Note node_redis < 2.5 must use auth_pass 如果设置，客户端将在连接上运行Redis认证命令。别名auth_pass 注意 node_redis <2.5必须使用auth_pass

db |	null |	If set, client will run Redis select command on connect. 如果设置，客户端将select在连接上运行Redis 命令。

family |	IPv4 |	You can force using IPv6 if you set the family to ‘IPv6’. See Node.js net or dns modules on how to use the family type. 如果将系列设置为“IPv6”，则可以强制使用IPv6。有关如何使用族类型，请参阅Node.js net或dns模块。

disable_resubscribing |	false |	If set to true, a client won’t resubscribe after disconnecting. 如果设置为true，客户端在断开连接后不会重新订阅。

rename_commands |	null |	Passing an object with renamed commands to use instead of the original functions. For example, if you renamed the command KEYS to “DO-NOT-USE” then the rename_commands object would be: { KEYS : "DO-NOT-USE" } . See the Redis security topics for more info.传递具有重命名命令的对象以代替原始函数。例如，如果您将命令KEYS重命名为“DO-NOT-USE”，则rename_commands对象将为：{ KEYS : "DO-NOT-USE" }。有关更多信息，请参阅Redis安全性主题。

tls |	null |	An object containing options to pass to tls.connect to set up a TLS connection to Redis (if, for example, it is set up to be accessible via a tunnel).一个包含传递给tls.connect的选项的对象，用于设置与Redis的TLS连接（例如，如果它设置为可通过隧道访问）。

prefix |	null |	A string used to prefix all used keys (e.g. namespace:test). Please be aware that the keys command will not be prefixed. The keys command has a “pattern” as argument and no key and it would be impossible to determine the existing keys in Redis if this would be prefixed.用于前缀所有使用的键（例如namespace:test）的字符串。请注意，该keys命令不会加上前缀。该keys命令有一个“模式”作为参数，没有密钥，如果这将被加上前缀，就不可能确定Redis中现有的密钥。

retry_strategy |	function |	A function that receives an options object as parameter including the retry attempt, the total_retry_time indicating how much time passed since the last time connected, the error why the connection was lost and the number of times_connected in total. If you return a number from this function, the retry will happen exactly after that time in milliseconds. If you return a non-number, no further retry will happen and all offline commands are flushed with errors. Return an error to return that specific error to all offline commands. Example below.接收选项对象作为参数的函数，包括重试attempt，total_retry_time指示自上次连接以来经过的时间，error连接丢失的原因以及times_connected总数。如果你从这个函数返回一个数字，那么重试会在几毫秒后正好发生。如果您返回非数字，则不会再发生重试，并且所有脱机命令都会刷新并显示错误。返回错误以将特定错误返回给所有脱机命令。下面的例子。
*/
