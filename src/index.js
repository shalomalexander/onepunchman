import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import "bootstrap/dist/css/bootstrap.min.css";





import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <div className="body-container">
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
