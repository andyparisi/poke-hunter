import * as React from "react";

export interface Props {
  poke: any;
  itemsList: Array<any>;
  family: Array<any>;
  pokemonList: Array<any>;
}

export class PokemonEvolveFamily extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { poke, itemsList, family } = this.props;
    // Parse the family data
    let familyItems: any = [];
    
    if(family != null) {
      familyItems = this.parseFamily(family);
    }

    return (
      <div className="pokemon-evolve-family">
        {familyItems}
      </div>
    )
  }

  parseFamily(fam: Array<any>): Array<any> {
    let familyItems: any = [];
    // Loop through the linear structure
    // An array represents a fork in evolution possibilities
    fam.forEach((f, i) => {
      // Check for arrays
      if (Array.isArray(f)) {
        let fi: any = [];
        for(var j = 0; j < f.length; j++) {
          const sub = f[j];
          fi.push(this.parseFamilyMember(sub, j));
        }
        familyItems.push(<div key={i} className="family-fork">{fi}</div>);
      }
      else {
        familyItems.push(this.parseFamilyMember(f));
      }
    });

    return familyItems;
  }

  parseFamilyMember(f: any, subIndex?: number): any {
    const { happiness, holdItem, knowMove, level, levelInArea, num, other, trade, unique, useItem } = f;
    const { pokemonList } = this.props;
    const dn: number = +num;
    const pk: any = pokemonList[dn - 1];

    return (
      <div key={num} className="family-member">
        <div className="member">
          <span className={`pkspr pkmn-${pk.name}`}>
            <i />
          </span>
          <span className="name">{pk.displayName}</span>
        </div>
      </div>
    );
  }
}