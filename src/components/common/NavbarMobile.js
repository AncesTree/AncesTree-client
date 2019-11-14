import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/all";
import history from "./history";

class NavbarMobile extends Component {

    classNavLink = (...nav) => {
        if (nav.includes(history.location.pathname)) {
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
                            <Nav.Link className={this.classNavLink("/home", "/")} onClick={() => history.push('/home')}><FaHome className="iconNav" size="1.4em"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={this.classNavLink("/tree")} onClick={() => history.push('/tree')}><FaProjectDiagram className="iconNav" size="1.4em"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={this.classNavLink("/message")} onClick={() => history.push('/message')}><FaEnvelope className="iconNav" size="1.4em"/></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
        )}
}

export default NavbarMobile;