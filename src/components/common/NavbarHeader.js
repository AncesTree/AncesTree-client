import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/all";


const navStyle = {
    width: '100%',
};

const NavbarHeader = () => (
    <Navbar bg="dark" variant="pills" fixed="top">
        <Navbar.Brand href="#home">
            <img
                src="/assets/images/ancestree-logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top logoHeader"
                alt="Ancestree logo"
            />
            {" Ancestree"}
        </Navbar.Brand>
    </Navbar>
);

export default NavbarHeader;