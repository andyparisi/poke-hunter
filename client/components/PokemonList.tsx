import * as React from "react";
import { PokemonListItem } from "./PokemonListItem";

import GENERATIONS from '../constants/generations';

export interface Props {
  pokemonList: Array<any>;
  openLocation: Function;
  shiftEngaged: Boolean;
  userPokes: Array<any>;
  filterTerm: String;
}

export interface State {
  selectedPokes?: any;
  genFilters?: any;
}

export class PokemonList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Populate the default filters object
    let genFilters: any = {};
    for(let i = 1; i <= GENERATIONS.GEN_COUNT; i++) {
      genFilters[i] = true;
    }

    this.state = {
      selectedPokes: props.userPokes || {},
      genFilters: genFilters,
    };
  }

  render() {
    const { pokemonList, shiftEngaged, userPokes, filterTerm } = this.props;
    const { selectedPokes, genFilters } = this.state;
    let pokeItems: Array<Array<any>> = [[]];
    let genList: Array<any> = [];
    let collected: Array<number> = [];
    let totalCollected: number = 0;
    let genFilterItems: any = [];

    // Go thru each gen and add a filter option
    for(let i = 1; i <= GENERATIONS.GEN_COUNT; i++) {
      genFilterItems.push(
        <li key={i} className="gen-filter-item">
          <label>
            <input type="checkbox" value={i} onChange={this.toggleFilter.bind(this, i)} checked={genFilters[i] ? 'checked' : ''} />
            {`Generation ${i}`}
          </label>
        </li>
      );      
    }

    // Iterate through all the Pokemon
    pokemonList.forEach((poke, index) => {
      const { gen, dexNum } = poke;
      let dn: number = +dexNum;

      // Skip disabled gens
      if (!genFilters[gen]) return;

      // Track if the user has collected this one
      if(selectedPokes[dexNum] != null) {
        if(collected[gen - 1] == null) {
          collected[gen - 1] = 0;
        }
        collected[gen - 1]++;
        totalCollected++;
      }

      if(pokeItems[gen - 1] == null && !filterTerm) {
        pokeItems[gen - 1] = [];
      }

      let item: any = <PokemonListItem key={index} poke={poke} selectPoke={this.selectPoke.bind(this)} isSelected={selectedPokes[poke.dexNum] != null} openLocation={this.openLocation.bind(this) } shiftEngaged={shiftEngaged} />;

      if (filterTerm) {
        pokeItems[0].push(item)
      }
      else {
        pokeItems[gen - 1].push(item);
      }
    });

    // Put each gen array in a new list
    pokeItems.forEach((genPokes, index) => {
      const gen: number = index + 1;
      const genCol: number = collected[gen - 1] || 0;
      const genStart: number = GENERATIONS[`GEN_${gen}_START`];
      const genEnd: number = GENERATIONS[`GEN_${gen}_END`];
      const genDiff: number = genEnd - genStart + 1;
      const genPct: number = (genCol / genDiff) * 100;


      // Add a gen marker to the beginning of each array
      if(!filterTerm) {
        let genGames: any = [];
        const gg: Array<any> = GENERATIONS[`GEN_${gen}`];

        // Skip disabled gens
        if (!genFilters[gen]) return;

        gg.forEach(game => {
          genGames.push(
            <li key={game.name} className="gen-game" style={{
              backgroundColor: game.color,
              color: game.textColor
            }}>
              {game.name}
            </li>
          );
        });

        genPokes.unshift(
          <div key={`genPokes-${gen}`} className="gen-marker">
            <header>{`Generation ${gen}`}</header>
            <div className="gen-collected">
              {`${genCol} / ${genDiff} captured`}
              <div className="collected-progress" style={{ width: `${genPct}%` }} />
            </div>
            <ul className="gen-games">
              {genGames}
            </ul>
          </div>
        );

      }
      genList.push(<ul key={gen} className={`pokemon-list gen-${gen}`}>{genPokes}</ul>);
    });
    
    return (
      <div className="pokemon-gens">
        <div className="info-box">
          <header className="gen-filter-header">Filter By Gen</header>
          <ul className="gen-filter">{genFilterItems}</ul>
          <div className="total-captured">{`${totalCollected} / ${pokemonList.length} captured`}</div>
        </div>
        {genList}
      </div>
    )
  }

  toggleFilter(gen: number) {
    let { genFilters } = this.state;

    // Flip to the opposite filter value
    genFilters[gen] = !genFilters[gen];

    // Set the toggled state
    this.setState({
      genFilters: genFilters
    });
  }

  selectPoke(poke: any) {
    let { selectedPokes } = this.state;
    let { dexNum } = poke;
    // Track in localStorage (temporary persistence)
    let storagePokes = JSON.parse(localStorage.getItem('_phPokes')) || {};
    let pokemon = storagePokes.pokemon || {};
    
    // De-select a tracked Pokemon
    if(selectedPokes[dexNum] != null) {
      delete selectedPokes[dexNum];
      if(pokemon[dexNum] != null) {
        delete pokemon[dexNum];
      }
    }

    // Track the selected Pokemon
    else {
      selectedPokes[dexNum] = poke;
      if(pokemon[dexNum] == null) {
        pokemon[dexNum] = {};
      }
    }

    this.setState({
      selectedPokes: selectedPokes
    });

    // Stringify then put the Pokes back in storage
    let up: string = JSON.stringify({
      pokemon: pokemon
    });
    localStorage.setItem('_phPokes', up);
  }

  openLocation(poke: any) {
    this.props.openLocation(poke);
  }
}