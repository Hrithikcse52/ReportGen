import React from "react";
// import { API } from "./API";

import "./App.css";
import Base from "./Base";
import Creatept from "./Creatept";

function App() {
  return (
    <div className="App">
      <Base className="container">
        <Creatept />
      </Base>
    </div>
  );
}

export default App;
