import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./components/Main";
import './styles/application';

const pokemonCount = 721;
const username = "Andrew"

ReactDOM.render(
  <Main />,
  document.getElementById("app")
);