import { channels } from "common/channel";
import { onM, onMAsync } from "common/kit/main";
import { connect } from "main/handler";
import { ConnectOpts } from "common/types";

onMAsync(
  channels.CONNECT,
  channels.CONNECT_RETURN,
  async (...args: any[]): Promise<any[]> => {
    return [
      await connect(args[0] as ConnectOpts)
    ];
  }
);
