import * as React from "react";

export interface Props {
  poke: any;
  itemsList: Array<any>;
}

export class PokemonEvolveFamily extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { poke, itemsList } = this.props;

    return (
      <div className="pokemon-evolve-family">
        <span className={`pkspr evo-item-dawn-stone`}>
          <i />
        </span>
      </div>
    )
  }
}