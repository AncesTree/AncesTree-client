import React, { Component } from 'react';
import NavbarMobile from "./components/common/NavbarMobile";
import NavbarHeader from "./components/common/NavbarHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App(ComponentToRender) {
  return class extends Component {
      render() {
          return (
              <div className="App">
                  <NavbarHeader/>
                  <ComponentToRender />

                  <NavbarMobile/>
              </div>
          );
      }
  };
}