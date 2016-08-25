import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./components/Main";
import './styles/application';

// See if the user has saved Pokes in their localStorage (temporary persistence)
var userData = localStorage.getItem('_phPokes') || "{}";

ReactDOM.render(
  <Main userData={userData} />,
  document.getElementById("app")
);