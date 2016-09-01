import * as React from "react";

export interface Props {
  poke: any;
  itemsList: any;
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
          fi.push(this.parseFamilyMember(sub, i, j));
        }
        familyItems.push(<div key={i} className="family-fork">{fi}</div>);
      }
      else {
        familyItems.push(this.parseFamilyMember(f, i));
      }
    });

    return familyItems;
  }

  parseFamilyMember(f: any, index: number, subIndex?: number): any {
    const { happiness, holdItem, knowMove, level, levelInArea, num, other, trade, unique, useItem } = f;
    const { pokemonList, itemsList } = this.props;
    const dn: number = +num;
    const pk: any = pokemonList[dn - 1];
    let reqsClass: string = "family-member";
    let reqsItems: any = [];

    // Build the html
    if(index > 0) {
      let reqs: any = [];

      // Go thru the various types of requirements
      // Happiness
      if(happiness) {
        let hap: string = happiness.split(/([0-9]+)/);
        let hapString: string = ((h: string) => {
          switch(h) {
            case '>= ':
              return 'at least';
            case '= ':
              return 'equal to';
            case '< ':
              return 'under';
          }
        })(hap[0])
        hapString = `Level up when Happiness ${hapString} ${hap[1]}`;

        reqs.push(
          <div key={num} className="req happiness" title={hapString}>{`:) ${happiness}`}</div>
        );
      }

      // Holding an item
      if(holdItem) {
        const item: any = itemsList[holdItem];
        let tradeOrLevel: string = (trade) ? "Trade" : "Level up";
        let holdString: string = `${tradeOrLevel} while holding ${item.displayName}`;
        reqs.push(
          <div key={num + holdItem} className="req holdItem" title={holdString}>
            <span className={`pkspr evo-item-${holdItem}`}>
              <i />
            </span>
          </div>
        );
      }

      // Use an item
      if(useItem) {
        const item: any = itemsList[useItem];
        let useString: string = `Use ${item.displayName}`;
        reqs.push(
          <div key={num + useItem} className="req useItem" title={useString}>
            <span className={`pkspr evo-item-${useItem}`}>
              <i />
            </span>
          </div>
        );
      }

      // Know moves
      if(knowMove.length) {
        let moves: string = `Know one of these moves: ${knowMove.join(', ')}`;
        reqs.push(
          <div key={num + moves} className="req knowMove" title={moves}>
            {moves}
          </div>
        );
      }

      // Level
      if(level) {
        reqs.push(
          <div key={num + level} className="req level" title={`Reach level ${level}`}>
            {`Level ${level}`}
          </div>
        );
      }

      // Level up in area
      if(levelInArea.length) {
        let areaString: string = `Level up in one of these areas: ${levelInArea.join(', ')}`;
        reqs.push(
          <div key={num + areaString} className="req area" title={areaString}>
            {areaString}
          </div>
        );
      }

      let reqString: string = "requirements";
      if(trade) {
        reqString += " trade";
      }
      if(level) {
        reqString += " level";
      }


      reqsItems.push(
        <div key={num} className={reqString}>
          {reqs}
        </div>
      );
    }

    return (
      <div key={num} className={reqsClass}>
        {reqsItems}
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