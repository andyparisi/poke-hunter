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
      // Parse the Pokemon list
      let pokes: Array<Object> = [];

      res.forEach((poke: any, index: number) => {
        let dexNum: String = String(index + 1);

        // Add leading zeroes
        while(dexNum.length < 3) {
          dexNum = "0" + dexNum;
        }

        pokes.push({
          dexNum: dexNum,
          name: poke
        });
      });

      this.setState({
        pokemonList: pokes
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