import React from 'react';
import NavbarMobile from "./components/common/NavbarMobile";
import NavbarHeader from "./components/common/NavbarHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
      <div className="App">
        <button className="add-button">Add to home screen</button>
          <NavbarHeader/>
          <NavbarMobile/>

    </div>
  );
}

export default App;
