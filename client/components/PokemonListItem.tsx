import * as React from "react";

export interface Props {
  poke: any;
}

export class PokemonListItem extends React.Component<Props, {}> {
  render() {
    const { poke } = this.props;
    const { dexNum, name } = poke;

    return (
      <li className="poke-item">
        <i className={`pkspr pkmn-${dexNum}`} />
        {`#${dexNum}: ${name}`}
      </li>
    )
  }
}