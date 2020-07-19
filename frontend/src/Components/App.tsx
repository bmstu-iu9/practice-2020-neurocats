import React from "react";
import "./App.css";
import TopBar from "./TopBar/TopBar";
import CatsFeed from "./CatsFeed/CatsFeed";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile/Profile";
import FolderPage from "./FolderPage/FolderPage";


function App(props: any) {
  return (
    <BrowserRouter>
      <div className="App">
        <TopBar />
        <div className='appContent'>
          <Route path='/home' render = {() => <CatsFeed/>}/>
          <Route path='/folderName' render = {() => <FolderPage/>}/>
          <Route path='/profile' render = {() => <Profile {...props}/>}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
