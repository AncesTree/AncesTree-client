import React from 'react'
import {Navbar} from 'react-bootstrap'

const NavbarHeader = () => (
        <Navbar bg="dark" fixed="top">
            <Navbar.Brand>
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