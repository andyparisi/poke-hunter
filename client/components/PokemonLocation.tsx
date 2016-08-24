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
    const { poke, setLocation } = this.props;

    fetch(`/poke/${poke.dexNum}`)
    .then(res => res.json())
    .then(res => {
      setLocation(res);
    });
  }

  render() {
    const { poke, locations } = this.props;
    const { dexNum, displayName } = poke;

    if(locations != null) {
      const { x, y, or } = locations;
      const als = locations.as;
    }

    return (
      <div className="pokemon-location" onClick={this.close.bind(this)}>
        <div className="location-content" onClick={this.handleBackdropClick.bind(this)}>
          <header className="location-header">{`${poke.displayName} - Locations`}</header>
          <div className="location-body">
            location info here
          </div>
        </div>
      </div>
    )
  }

  handleBackdropClick(e: any) {
    e.stopPropagation();
  }

  close() {
    this.props.closeLocation();
  }

  handleKeyUp(e: any) {
    // e.stopPropagation();

    // Handle escape key to close
    if(e.keyCode === 27) {
      this.close();
    }
  }
}