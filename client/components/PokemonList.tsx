import * as React from "react";
import { PokemonListItem } from "./PokemonListItem";

export interface Props {
  pokemonList: Array<any>;
  openLocation: Function;
  shiftEngaged: Boolean;
  userPokes: Array<any>;
}

export interface State {
  selectedPokes?: any;
}

export class PokemonList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedPokes: props.userPokes || {}
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log(nextProps);
  }

  render() {
    const { pokemonList, shiftEngaged, userPokes } = this.props;
    const { selectedPokes } = this.state;
    let pokeItems: Array<any> = [];

    pokemonList.forEach((poke, index) => {
      pokeItems.push(<PokemonListItem key={index} poke={poke} selectPoke={this.selectPoke.bind(this)} isSelected={selectedPokes[poke.dexNum] != null} openLocation={this.openLocation.bind(this)} shiftEngaged={shiftEngaged} />);
    });

    return (
      <ul className="pokemon-list">
        {pokeItems}
      </ul>
    )
  }

  selectPoke(poke: any) {
    let { selectedPokes } = this.state;
    let { dexNum } = poke;
    // Track in localStorage (temporary persistence)
    let storagePokes = JSON.parse(localStorage.getItem('_phPokes')) || {};
    let pokemon = storagePokes.pokemon || {};
    
    // De-select a tracked Pokemon
    if(selectedPokes[dexNum] != null) {
      delete selectedPokes[dexNum];
      if(pokemon[dexNum] != null) {
        delete pokemon[dexNum];
      }
    }

    // Track the selected Pokemon
    else {
      selectedPokes[dexNum] = poke;
      if(pokemon[dexNum] == null) {
        pokemon[dexNum] = {};
      }
    }

    this.setState({
      selectedPokes: selectedPokes
    });

    // Stringify then put the Pokes back in storage
    let up: string = JSON.stringify({
      pokemon: pokemon
    });
    localStorage.setItem('_phPokes', up);
  }

  openLocation(poke: any) {
    this.props.openLocation(poke);
  }
}