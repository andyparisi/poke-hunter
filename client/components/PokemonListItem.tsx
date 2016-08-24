import * as React from "react";

export interface Props {
  poke: any;
  selectPoke: Function;
  isSelected: Boolean;
  openLocation: Function;
}

export class PokemonListItem extends React.Component<Props, {}> {
  render() {
    const { poke, isSelected } = this.props;
    const { dexNum, name, displayName } = poke;
    let itemClass: String = "poke-list-item";
    let caughtString: String = `I have ${displayName}!`;

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
    this.props.openLocation(this.props.poke);
  }
}