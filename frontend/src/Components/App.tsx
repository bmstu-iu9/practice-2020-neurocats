import React from "react";
import "./App.css";
import TopBar from "./TopBar/TopBar";
import CatsFeed from "./CatsFeed/CatsFeed";

function App() {
  return (
    <div className="App">
        <TopBar/>
        <CatsFeed/>
    </div>
  );
}

export default App;
