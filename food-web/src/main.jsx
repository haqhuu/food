import React from "react";
import ReactDOM from "react-dom/client";
import RouteLoader from "./routes/RouteLoader";
import "./styles/index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "./context/Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider >
    <RouteLoader />
  </Provider>
);
