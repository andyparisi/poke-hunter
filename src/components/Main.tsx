import * as React from "react";

export interface MainProps {
  username: string;
  pokemonCount: number;
}

export interface MainState {
  isBlue: boolean;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isBlue: false
    };
  }

  render() {
    const {username, pokemonCount} = this.props;
    const {isBlue} = this.state;

    return (
      <div className="content">
        <h1 className={(isBlue) ? "is-blue" : ""}>Hello {username}. There are {pokemonCount} Pokemon!</h1>
        <button onClick={() => this.makeBlue()}>Make it blue</button>
      </div>
     );
  }

  makeBlue() {
    this.setState({
      isBlue: true
    });
  }
}