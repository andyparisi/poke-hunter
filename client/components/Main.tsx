import * as React from "react";
import * as fetch from "isomorphic-fetch";
import * as _ from "lodash";

import { PokemonList } from "./PokemonList";
import { PokemonLocation } from "./PokemonLocation";
import { PokemonListFilter } from "./PokemonListFilter";

import KEYBOARD from "../keyboard";

export interface State {
  pokemonList?: Array<any>;
  pokeLocation?: any;
  locations?: any;
  shiftEngaged?: Boolean;
  filterTerm?: String;
}

export class Main extends React.Component<{}, State> {
  constructor() {
    super();

    // Set the initial state
    this.state = {
      pokemonList: [],
      pokeLocation: null,
      locations: {},
      shiftEngaged: false,
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

    // Track when shift is pressed down
    window.addEventListener('keydown', this.toggleShift.bind(this));
    window.addEventListener('keyup', this.toggleShift.bind(this));
    window.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress.bind(this));
    window.removeEventListener('keydown', this.toggleShift.bind(this));
  }

  render() {
    const { pokemonList, pokeLocation, locations, shiftEngaged, filterTerm } = this.state;
    let filteredList: Array<any> = pokemonList;
    
    // Apply a filter term
    if(filterTerm) {
      let ft: String = filterTerm.toLowerCase();
      // Check for a dex number filter
      let filterByNum: Boolean = (!isNaN(+filterTerm[0])) ? true : false;

      // Filter the Pokemon list
      filteredList = filteredList.filter(p => {
        let pk = p.displayName.toLowerCase();
        pk = filterByNum ? p.dexNum : pk;
        return pk.search(ft) > -1
      });
    }

    let pLoc: any = (pokeLocation) ? <PokemonLocation 
                                      poke={pokeLocation} 
                                      locations={locations} 
                                      closeLocation={this.closeLocation.bind(this)} 
                                      openLocation={this.openLocation.bind(this)} 
                                      setLocation={this.setLocation.bind(this)} /> : null;

    return (
      <div className="container">
        <h1 className="main-header">Pokemon Hunter</h1>
        <PokemonListFilter ref="filter" pokemonList={pokemonList} setFilter={this.setFilter.bind(this)} />
        <PokemonList pokemonList={filteredList} openLocation={this.openLocation.bind(this)} shiftEngaged={shiftEngaged} />
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
    
    // Cache that Pokemon's location data.
    locs[data.num] = data;

    this.setState({
      locations: locs
    });
  }

  toggleShift(e: KeyboardEvent) {
    if(e.keyCode === KEYBOARD.SHIFT) {
      e.preventDefault();
      this.setState({
        shiftEngaged: !this.state.shiftEngaged
      });
    }
  }

  setFilter(term: String) {
    this.setState({
      filterTerm: term
    });
  }

  handleKeyPress(e: KeyboardEvent) {
    let filterRef: any = this.refs["filter"];
    filterRef.focus();
    this.setFilter(e.key);
  }
}