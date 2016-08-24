import * as React from "react";

export interface Props {
  poke: any;
  closeLocation: Function;
  locations: any;
  openLocation: Function;
  setLocation: Function;
}

export class PokemonLocation extends React.Component<Props, {}> {
  componentWillMount() {
    const { poke, setLocation, locations } = this.props;

    // Fetch it if we don't have it already
    if(locations[poke.dexNum] == null) {
      fetch(`/poke/${poke.dexNum}`)
      .then(res => res.json())
      .then(res => {
        setLocation(res);
      });
    }

    // Set key event handlers
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  render() {
    const { poke, locations } = this.props;
    const { dexNum, displayName } = poke;
    // Get the current Poke's location data
    const curLoc: any = locations[dexNum];
    let locationTableItems: any = [];

    for(let g in curLoc) {
      let loc: any = curLoc[g];
      let label:String;

      // Skip the `num` prop
      if(g === 'num') continue;

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
        <tr key={g} className={`pokemon-${g}`}>
          <td>{label}</td>
        </tr>
      );
      locationTableItems.push(
        <tr key={g + "_2"}>
          <td>{loc}</td>
        </tr>
      );
    }

    return (
      <div className="pokemon-location" onClick={this.close.bind(this)}>
        <div className="location-content" onClick={this.handleContentClick.bind(this)}>
          <header className="location-header">{`${poke.displayName} - Locations`}</header>
          <div className="location-body">
            <table className="location-table">
              <tbody>
                {locationTableItems}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  handleContentClick(e: any) {
    e.stopPropagation();
  }

  close() {
    this.props.closeLocation();
  }

  handleKeyUp(e: any) {
    e.stopPropagation();

    // Handle escape key to close
    if(e.keyCode === 27) {
      this.close();
    }
  }
}