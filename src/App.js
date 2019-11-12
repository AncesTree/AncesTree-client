import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavbarMobile from "./components/common/NavbarMobile";
import NavbarHeader from "./components/common/NavbarHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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

        <NavbarHeader/>
        <NavbarMobile/>
    </div>
  );
}

export default App;
