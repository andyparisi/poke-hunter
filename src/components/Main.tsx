import * as React from "react";

export interface MainProps {
  username: string;
  pokemonCount: number;
}

export interface MainState {
  pokemonList?: Array<any>;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);

    // Set the initial state
    this.state = {
      pokemonList: [],
    };
  }

  componentWillMount() {
    // Fetch the list of Pokemon
    fetch(`/poke`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        pokemonList: res
      });
    });
  }

  render() {
    const {username, pokemonCount} = this.props;
    const {pokemonList} = this.state;
    let pokeItems: Array<any> = [];

    pokemonList.forEach(poke => {
      pokeItems.push(<li className="poke-item" key={poke.num}>{poke.name}</li>);
    });

    return (
      <div className="content">
        <h1 className={(pokemonList) ? "is-blue" : ""}>Hello {username}. There are {pokemonCount} Pokemon!</h1>
        <ul className="poke-items">
          {pokeItems}
        </ul>
      </div>
     );
  };
}