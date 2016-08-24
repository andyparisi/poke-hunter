import * as React from "react";
import * as fetch from "isomorphic-fetch";

import { PokemonList } from "./PokemonList";
import { PokemonLocation } from "./PokemonLocation";

export interface State {
  pokemonList?: Array<any>;
  pokeLocation?: any;
  locations?: any;
}

export class Main extends React.Component<{}, State> {
  constructor() {
    super();

    // Set the initial state
    this.state = {
      pokemonList: [],
      pokeLocation: null,
      locations: {}
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
    const { pokemonList, pokeLocation, locations } = this.state;
    let pLoc: any = (pokeLocation) ? <PokemonLocation poke={pokeLocation} closeLocation={this.closeLocation.bind(this)} openLocation={this.openLocation.bind(this)} locations={locations} setLocation={this.setLocation.bind(this)} /> : null;

    return (
      <div className="container">
        <h1>Pokemon Hunter</h1>
        <PokemonList pokemonList={pokemonList} openLocation={this.openLocation.bind(this)} />
        {pLoc}
      </div>
     );
  }

  openLocation(poke: any) {
    this.setState({
      pokeLocation: poke
    })
  }

  closeLocation() {
    this.setState({
      pokeLocation: null
    });
  }

  setLocation(data: any) {
    let locs = this.state.locations;
    
    // Cache that Pokemon's location data
    locs[data.num] = data;

    this.setState({
      locations: locs
    });

    console.log(this.state);
  }
}