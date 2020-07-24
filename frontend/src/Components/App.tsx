import React from "react";
import "./App.css";
import TopBar from "./TopBar/TopBar";
import CatsFeed from "./CatsFeed/CatsFeed";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile/Profile";
import FolderPage from "./FolderPage/FolderPage";
import MainPage from "./SignInSignUp/MainPage";


function App(props: any) {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/home' render = {() => <TopBar/>}/>
        <Route path='/folderName' render = {() => <TopBar/>}/>
        <Route path='/profile' render = {() => <TopBar/>}/>
        <div className='appContent'>
          <Route path='/signIn' render = {() => <MainPage/>}/>
          <Route path='/signUp' render = {() => <MainPage/>}/>
          <Route path='/home' render = {() => <CatsFeed/>}/>
          <Route path='/folderName' render = {() => <FolderPage/>}/>
          <Route path='/profile' render = {() => <Profile state={props.state} dispatch={props.dispatch}/>}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
