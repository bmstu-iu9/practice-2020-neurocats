import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css"
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import Axios from "axios";

if (process.env.NODE_ENV !== "production") {
    Axios.defaults.baseURL = "http://localhost:5000/api";
} else {
    Axios.defaults.baseURL = `http://${window.location.host}/api`;
}

(async () => {
    const {data: user} = await Axios.get("/users/1");
    ReactDOM.render(
        <React.StrictMode>
            <App user={user}/>
        </React.StrictMode>,
        document.getElementById("root"),
    );
})()

serviceWorker.register();
