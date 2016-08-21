import * as React from "react";

export interface MainProps {
  compiler: string;
  framework: string;
}

export class Main extends React.Component<MainProps, {}> {
  render() {
    let favPoke = "Xerneas";
    return <h1>Hello {favPoke} from {this.props.compiler} and {this.props.framework}!!!!!</h1>;
  }
}