import * as React from "react";

export interface Props {
  curLoc: any;
  detailsActive: boolean;
}

export class PokemonLocationDetails extends React.Component<Props, {}> {
  render() {
    const { curLoc, detailsActive } = this.props;
    const { details } = curLoc;
    let locationTableItems: any = [];
    let detailsPaneClass: string = (detailsActive) ? "details-pane is-active" : "details-pane";

    for(let g in details) {
      let loc: Array<any> = details[g];
      let label: string;

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
          <td colSpan={4}>{label}</td>
        </tr>
      );

      locationTableItems.push(
        <tr key={`headers_${g}`} className="headers">
          <td>Location</td>
          <td>Method</td>
          <td>Rarity</td>
          <td>Level</td>
        </tr>
      );

      // Loop through that game's locations
      loc.forEach((l, index) => {
        let { location, maxlevel, minlevel, rarity, method } = l;

        // Normalize rarity
        rarity = rarity || '--';

        // Normalize level range
        maxlevel = maxlevel || '?';
        minlevel = minlevel || '?';
        let levelRange = `${minlevel} - ${maxlevel}`;
        levelRange = (minlevel === maxlevel) ? minlevel : levelRange;

        locationTableItems.push(
          <tr key={`${index}_${g}`} className="location">
            <td key="1">{location}</td>
            <td key="2">{method}</td>
            <td key="3">{rarity}</td>
            <td key="4">{levelRange}</td>
          </tr>
        );
      })
    }

    return (
      <div className={detailsPaneClass}>
        <header className="details-header">Details</header>
        <table className="location-table details">
          <tbody>
            {locationTableItems}
          </tbody>
        </table>
      </div>
    )
  }
}