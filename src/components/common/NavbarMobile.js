import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/all";

const navStyle = {
    width: '100%',
};

const NavbarMobile = () => (
    <Navbar bg="dark" variant="pills" fixed="bottom">

        <Nav fill style={navStyle} className="d-flex justify-content-around">
            <Nav.Item>
                <Nav.Link href="#home"><FaHome size="1.5em" color="00adef"/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#graph"><FaProjectDiagram size="1.5em" color="00adef"/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#message"><FaEnvelope size="1.5em" color="00adef"/></Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
);

export default NavbarMobile;