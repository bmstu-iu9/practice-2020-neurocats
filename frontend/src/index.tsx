import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css"
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import Axios from "axios";

(async () => {
    const {data: user} = await Axios.get("http://localhost:5000/users/1");
    ReactDOM.render(
        <React.StrictMode>
            <App user={user}/>
        </React.StrictMode>,
        document.getElementById("root"),
    );
})()

serviceWorker.register();
