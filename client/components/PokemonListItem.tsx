import * as React from "react";

export interface Props {
  poke: any;
  selectPoke: Function;
  isSelected: Boolean;
}

export class PokemonListItem extends React.Component<Props, {}> {
  render() {
    const { poke, isSelected } = this.props;
    const { dexNum, name, displayName } = poke;
    let itemClass = "poke-list-item";

    // Add a selected class
    if(isSelected) itemClass += " is-selected";

    return (
      <li className={itemClass} title={`#${dexNum}: ${displayName}`} onClick={this.selectPoke.bind(this)}>
        <span className="num">{dexNum}</span>
        <span className="name">{displayName}</span>
        <span className={`pkspr pkmn-${name}`}>
          <i />
        </span>
      </li>
    )
  }

  selectPoke() {
    this.props.selectPoke(this.props.poke);
  }
}