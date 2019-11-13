import React from 'react';
import NavbarMobile from "./components/common/NavbarMobile";
import NavbarHeader from "./components/common/NavbarHeader";

import {
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TreeContainer from "./Containers/TreeContainer";

function App() {
  return (
      <div className="App">
          <NavbarHeader/>
          <Switch>
            <Route exact path="/home" component={TreeContainer} />
            <Route exact path="/tree" component={TreeContainer} />
            <Route exact path="/message" component={TreeContainer} />
            <Route exact path="/" component={TreeContainer} />
          </Switch>

          <NavbarMobile/>
    </div>
  );
}

export default App;
