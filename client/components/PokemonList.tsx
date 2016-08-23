import * as React from "react";
import { PokemonListItem } from "./PokemonListItem";

export interface Props {
  pokemonList: Array<any>;
}

export class PokemonList extends React.Component<Props, {}> {
  render() {
    const { pokemonList } = this.props;
    let pokeItems: Array<any> = [];

    pokemonList.forEach((poke, index) => {
      pokeItems.push(<PokemonListItem key={index} poke={poke} />);
    });

    return (
      <ul className="pokemon-list">
        {pokeItems}
      </ul>
    )
  }
}