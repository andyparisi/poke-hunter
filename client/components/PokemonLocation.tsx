import * as React from "react";
import { PokemonLocationDetails } from "./PokemonLocationDetails";
import { PokemonEvolveFamily } from "./PokemonEvolveFamily";

import KEYBOARD from "../constants/Keyboard";

export interface Props {
  poke?: any;
  closeLocation?: Function;
  locations?: any;
  openLocation?: Function;
  setLocation?: Function;
  itemsList?: any;
  pokemonList: Array<any>;
}

export interface State {
  detailsActive?: boolean;
  family?: any;
  loading?: boolean;
}

export class PokemonLocation extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailsActive: false,
      family: [],
      loading: true
    };
  }

  componentWillMount() {
    const { loading } = this.state;
    const { poke, setLocation, locations } = this.props;
    const { dexNum, family } = poke;

    // Location and family data
    fetch(`/poke/${dexNum}`)
    .then(res => res.json())
    .then(res => {
      setLocation(res);
    })
    // Fetch the evolution family data
    .then(() => {
      if(family) {
        fetch(`/family/${family}`)
        .then(fam => fam.json())
        .then(fam => {
          this.setState({
            family: fam.family,
            loading: false
          });
        });
      }
    });

    // Set key event handlers
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if(prevState.detailsActive) {
      let body: any = this.refs['body'];
      body.scrollTop = 0;
    }
  }

  render() {
    const { poke, locations, itemsList, pokemonList } = this.props;
    const { detailsActive, loading, family } = this.state;
    const { dexNum, displayName } = poke;

    // Get the current Poke's location data
    const curLoc: any = locations[dexNum];
    let locationTableItems: any = [];
    let locationDetails: any = (curLoc != null && curLoc.details != null) ? <PokemonLocationDetails detailsActive={detailsActive} curLoc={curLoc} /> : null;
    let locationBodyClass: string = (detailsActive) ? "location-body details-active" : "location-body";
    let showDetailsClass: string = (curLoc != null && curLoc.details != null) ? "show-details" : "show-details is-hidden";
    let showDetailsText: string = (detailsActive) ? "< Hide Details" : "Show Details >";
    let loadingItem = (loading) ? <div className="loading">Loading...</div> : null;

    for(let g in curLoc) {
      let loc: any = curLoc[g];
      let label: string;

      // Skip the `num` prop
      if(g === 'num' || g === 'details') continue;

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
        <tr key={g + "_2"} className="location">
          <td>{loc}</td>
        </tr>
      );
    }

    return (
      <div className="pokemon-location" onClick={this.close.bind(this)}>
        <div className="location-content" onClick={this.handleContentClick.bind(this)}>
          <header className="location-header">
            {`${poke.displayName} - Locations`}
            <button className={showDetailsClass} onClick={this.toggleDetailsPane.bind(this)}>{showDetailsText}</button>
          </header>
          <div ref="body" className={locationBodyClass}>
            <PokemonEvolveFamily pokemonList={pokemonList} poke={poke} itemsList={itemsList} family={family} />
            <table className="location-table">
              <tbody>
                {locationTableItems}
              </tbody>
            </table>
            {locationDetails}
          </div>
          {loadingItem}
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
    if(e.keyCode === KEYBOARD.ESCAPE) {
      this.close();
    }
  }

  toggleDetailsPane() {
    this.setState({
      detailsActive: !this.state.detailsActive
    });
  }
}