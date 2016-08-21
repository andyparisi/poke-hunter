import * as React from "react";
import * as ReactDOM from "react-dom";

import { Main } from "./components/Main";

import './styles/application';

ReactDOM.render(
  <Main compiler="TypeScript" framework="React" />,
  document.getElementById("app")
);