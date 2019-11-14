import React from 'react';
import NavbarMobile from "./components/common/NavbarMobile";
import NavbarHeader from "./components/common/NavbarHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TreeContainer from "./Containers/TreeContainer";

function App() {
  return (
      <div className="App">
          <NavbarHeader/>
          <TreeContainer/>

          <NavbarMobile/>
    </div>
  );
}

export default App;
