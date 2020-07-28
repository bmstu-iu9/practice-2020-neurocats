import {Redirect, Route, Switch} from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import CatsFeed from "./CatsFeed/CatsFeed";
import FolderPage from "./FolderPage/FolderPage";
import Profile from "./Profile/Profile";
import React from "react";

function MainApp() {
    return (
        <div className="App">
            <TopBar/>
            <Switch>
                <Route path={"/:id/folder"} exact><FolderPage/></Route>
                <Route path={"/:id"} exact><Profile/></Route>
                <Route path={"/"}><CatsFeed/></Route>
                <Redirect to={"/404"}/>
            </Switch>
        </div>
    );
}

export default MainApp;