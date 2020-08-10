import {Redirect, Route, Switch} from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import CatsFeed from "./CatsFeed/CatsFeed";
import Profile from "./Profile/Profile";
import React from "react";
import SearchFeed from "./SearchFeed/SearchFeed";
import ErrorFeed from "./CatsPage/ErrorFeed";
import FolderFeed from "./FolderFeed/FolderFeed";

function MainApp() {
    return (
        <div className="App">
            <TopBar/>
            <Switch>
                <Route path={"/breed/:breed"} exact><SearchFeed/></Route>
                <Route path={"/breed"} exact><ErrorFeed/></Route>
                <Route path={"/:id/folder/:breed"} exact><FolderFeed/></Route>
                <Route path={"/:id"} exact><Profile/></Route>
                <Route path={"/"}><CatsFeed/></Route>
                <Redirect to={"/404"}/>
            </Switch>
        </div>
    );
}

export default MainApp;