import React from "react";
import logo from "./components/database.svg";
import "./App.css";
import Template from "./components/Template";
import BusinessSearch from "./components/BusinessSearch";
import ListBusiness from "./components/ListBusiness"
import ListState from "./components/ListState"
import ListCities from "./components/ListCities"

function App() {
  return (
    <div className="App">
      <ListBusiness />
      <Template />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
      </header> */}
      <ListState />
      <br></br>
      <ListCities />
      <BusinessSearch />
    </div>
  );
}

export default App;
