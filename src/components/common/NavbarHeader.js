import React from 'react'
import {Navbar} from 'react-bootstrap'

const NavbarHeader = () => (
    <div className="spacer">
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
    </div>
);

export default NavbarHeader;