import * as React from "react";
import { PokemonListItem } from "./PokemonListItem";

export interface Props {
  pokemonList: Array<any>;
}

export interface State {
  selectedPokes?: any;
}

export class PokemonList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedPokes: []
    };
  }

  render() {
    const { pokemonList } = this.props;
    const { selectedPokes } = this.state;
    let pokeItems: Array<any> = [];

    pokemonList.forEach((poke, index) => {
      pokeItems.push(<PokemonListItem key={index} poke={poke} selectPoke={this.selectPoke.bind(this)} isSelected={selectedPokes[poke.dexNum] != null} />);
    });

    return (
      <ul className="pokemon-list">
        {pokeItems}
      </ul>
    )
  }

  selectPoke(poke: any) {
    let { selectedPokes } = this.state;
    
    // De-select a tracked Pokemon
    if(selectedPokes[poke.dexNum] != null) {
      delete selectedPokes[poke.dexNum];
    }
    // Track the selected Pokemon
    else {
      selectedPokes[poke.dexNum] = poke;
    }

    this.setState({
      selectedPokes: selectedPokes
    });

    console.log(selectedPokes);
  }
}