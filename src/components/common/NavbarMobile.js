import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/all";
import history from "./history";

class NavbarMobile extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeNav: "home"
        }
    };

    activate = (nav) => {
        this.setState({activeNav: nav})
        history.push('/'+nav)
    };

    classNavLink = (nav) => {
        if (this.state.activeNav === nav) {
            return "active"
        } else {
            return ""
        }

    };

    navStyle = {
        width: '100%',
    };

    render() {
        const navStyle = this.navStyle;
        return (
            <div className="spacer">
                <Navbar bg="dark" variant="pills" fixed="bottom">

                    <Nav fill style={navStyle} className="d-flex justify-content-around">
                        <Nav.Item>
                            <Nav.Link className={this.classNavLink("home")} onClick={() => this.activate("home")}><FaHome className="iconNav" size="1.4em"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={this.classNavLink("tree")} onClick={() => this.activate("tree")}><FaProjectDiagram className="iconNav" size="1.4em"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={this.classNavLink("message")} onClick={() => this.activate("message")}><FaEnvelope className="iconNav" size="1.4em"/></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
        )}
}

export default NavbarMobile;