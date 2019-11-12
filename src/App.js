import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavbarMobile from "./components/common/NavbarMobile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <button className="add-button">Add to home screen</button>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/"/>
          </Switch>
        </div>
      </BrowserRouter>
      <NavbarMobile/>
    </div>
  );
}

export default App;
