import * as React from "react";
import { PokemonListItem } from "./PokemonListItem";
import GENERATIONS from '../constants/generations';

export interface Props {
  pokemonList: Array<any>;
  openLocation: Function;
  shiftEngaged: Boolean;
  userPokes: Array<any>;
  filterTerm: String;
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

  render() {
    const { pokemonList, shiftEngaged, userPokes, filterTerm } = this.props;
    const { selectedPokes } = this.state;
    let pokeItems: Array<Array<any>> = [[]];
    let genList: Array<any> = [];

    pokemonList.forEach((poke, index) => {
      const { gen } = poke;

      if(pokeItems[gen - 1] == null && !filterTerm) {
        pokeItems[gen - 1] = [];
      }

      let item: any = <PokemonListItem key={index} poke={poke} selectPoke={this.selectPoke.bind(this) } isSelected={selectedPokes[poke.dexNum] != null} openLocation={this.openLocation.bind(this) } shiftEngaged={shiftEngaged} />;

      if (filterTerm) {
        pokeItems[0].push(item)
      }
      else {
        pokeItems[gen - 1].push(item);
      }
    });

    // Put each gen array in a new list
    pokeItems.forEach(gen => {
      genList.push(<ul key={gen} className="pokemon-list">{gen}</ul>);
    });

    return (
      <div>
        {genList}
      </div>
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