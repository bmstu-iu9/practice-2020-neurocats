import "mobx-react-lite/batchingForReactDom";
import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css"
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import {StoresProvider} from "./store/store";

ReactDOM.render(
    <React.StrictMode>
        <StoresProvider>
            <App/>
        </StoresProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

serviceWorker.register();
