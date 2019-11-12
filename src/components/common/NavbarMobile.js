import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/all";

const navStyle = {
    width: '100%',
};

const NavbarMobile = () => (
    <div className="spacer">
        <Navbar bg="dark" variant="pills" fixed="bottom">

            <Nav fill style={navStyle} className="d-flex justify-content-around">
                <Nav.Item>
                    <Nav.Link href="#home"><FaHome className="iconNav" size="1.4em"/></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#graph"><FaProjectDiagram className="iconNav" size="1.4em"/></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#message"><FaEnvelope className="iconNav" size="1.4em"/></Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    </div>
);

export default NavbarMobile;