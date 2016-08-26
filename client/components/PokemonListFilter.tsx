import * as React from "react";
import KEYBOARD from "../constants/Keyboard";

export interface Props {
  pokemonList: Array<any>;
  setFilter: Function;
}

export class PokemonListFilter extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { pokemonList } = this.props;
    let pokeItems: Array<any> = [];

    return (
      <div className="pokemon-list-filter">
        <input ref="filter" onKeyUp={this.handleKeyUp.bind(this)} type="text" spellCheck="false" placeholder="Filter by number or name" onChange={this.handleChange.bind(this)} />
      </div>
    )
  }

  handleChange(e: any) {
    const { value } = e.target;
    e.stopPropagation();
    e.preventDefault();
    this.props.setFilter(value);
  }

  focus() {
    let filterRef: any = this.refs["filter"];
    filterRef.focus();
  }

  handleKeyUp(e: KeyboardEvent) {
    e.stopPropagation();
    if(e.keyCode === KEYBOARD.ESCAPE) {
      let filterRef: any = this.refs["filter"];
      filterRef.value = '';
      filterRef.blur();
      this.props.setFilter('');
    }
  }
}