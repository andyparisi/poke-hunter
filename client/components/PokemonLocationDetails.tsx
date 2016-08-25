import * as React from "react";

export interface Props {
  curLoc: any;
}

export class PokemonLocationDetails extends React.Component<Props, {}> {
  render() {
    const { details } = this.props.curLoc;
    let locationTableItems: any = [];

    for(let g in details) {
      let loc: Array<any> = details[g];
      let label: String;

      // Skip the `num` prop
      if(g === 'num' || loc == null) continue;

      // Set the header label
      switch(g) {
        case 'x':
          label = "X"
          break;
        case 'y':
          label = "Y"
          break;
        case 'or':
          label = "Omega Ruby"
          break;
        case 'as':
          label = "Alpha Sapphire"
          break;
      }

      locationTableItems.push(
        <tr key={`game_${g}`} className={`pokemon-${g}`}>
          <td colSpan="5">{label}</td>
        </tr>
      );

      locationTableItems.push(
        <tr key={`headers_${g}`} className="headers">
          <td>Location</td>
          <td>Method</td>
          <td>Rarity</td>
          <td>Min Level</td>
          <td>Max Level</td>
        </tr>
      );

      // Loop through that game's locations
      loc.forEach((l, index) => {
        const { location, maxlevel, minlevel, rarity, method } = l;
        locationTableItems.push(
          <tr key={`${index}_${g}`} className="location">
            <td key="1">{location}</td>
            <td key="2">{method}</td>
            <td key="3">{rarity}</td>
            <td key="4">{minlevel}</td>
            <td key="5">{maxlevel}</td>
          </tr>
        );
      })
    }

    return (
      <table className="location-table details">
        <tbody>
          {locationTableItems}
        </tbody>
      </table>
    )
  }
}