import * as React from "react";
import { PokemonList } from "./PokemonList";

export interface MainState {
  pokemonList?: Array<any>;
}

export class Main extends React.Component<{}, MainState> {
  constructor() {
    super();

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
    const {pokemonList} = this.state;
    
    return (
      <div className="content">
        <h1>Pokemon Hunter</h1>
        <PokemonList pokemonList={pokemonList} />
      </div>
     );
  }
}