import * as React from "react";

export interface Props {
  poke: any;
  selectPoke: Function;
  isSelected: boolean;
  openLocation: Function;
  shiftEngaged: boolean;
}

export class PokemonListItem extends React.Component<Props, {}> {
  render() {
    const { poke, isSelected } = this.props;
    const { dexNum, name, displayName } = poke;
    let itemClass: string = "poke-list-item";
    let caughtString: string = `I have ${displayName}!`;

    // Add a selected class
    if(isSelected) {
      itemClass += " is-selected";
      caughtString = `I don't have ${displayName}.`;
    }

    return (
      <li className={itemClass} title={`#${dexNum}: ${displayName}`} onClick={this.openLocation.bind(this)}>
        <span className="num">{dexNum}</span>
        <span className="caught" title={caughtString} onClick={this.selectPoke.bind(this)}></span>
        <span className="name">{displayName}</span>
        <span className={`pkspr pkmn-${name}`}>
          <i />
        </span>
      </li>
    )
  }

  selectPoke(e: Event) {
    e.stopPropagation();
    this.props.selectPoke(this.props.poke);
  }

  openLocation() {
    const { openLocation, poke, shiftEngaged, selectPoke } = this.props;

    // When shift is engaged, select the Pokemon instead of view location
    if(shiftEngaged) {
      return selectPoke(poke);
    }
    openLocation(poke);
  }
}