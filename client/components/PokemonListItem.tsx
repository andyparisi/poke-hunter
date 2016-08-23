import * as React from "react";

export interface Props {
  poke: any;
}

export class PokemonListItem extends React.Component<Props, {}> {
  render() {
    const { poke } = this.props;

    return (
      <li className="poke-item">{poke.name}</li>
    )
  }
}