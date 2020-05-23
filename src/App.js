import React from "react";
import logo from "./database.svg";
import "./App.css";
import Template from "./components/Template";
import BusinessSearch from "./components/BusinessSearch";

function App() {
  return (
    <div className="App">
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
      <BusinessSearch />
    </div>
  );
}

export default App;
