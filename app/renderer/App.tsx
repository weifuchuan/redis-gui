import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Store } from "./store";
import CreateConnect from "renderer/components/CreateConnect";

export interface IAppProps {
  store?: Store;
}

interface ISelfState {
  loading: boolean;
}

interface IApp {
  selfState: ISelfState;
}

@inject("store")
@observer
export default class App extends React.Component<IAppProps> implements IApp {
  selfState: ISelfState = observable({
    loading: false
  });

  render() {
    const store = this.props.store || /* Impossible -> */ new Store() /* <- */;

    return (
      <div className="full flex-center">
      <div style={{width:"80%",height:"80%"}}>
        <CreateConnect />
        </div>
      </div>
    );
  }
}
