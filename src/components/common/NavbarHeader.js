import {Navbar} from 'react-bootstrap'
import CheeseburgerMenu from "cheeseburger-menu";
import {Link} from "react-router-dom";
import history from "./history";
import React, { useState } from 'react';
import {GiExitDoor} from "react-icons/all";

function NavbarHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false)
    }

    function disconnect() {
        localStorage.removeItem("Authorization");
        history.push("/login")
    }


    return (
    <React.Fragment>
        <Navbar bg="dark" fixed="top">
            <Navbar.Brand>
                <img
                    onClick={() => setMenuOpen(!menuOpen)}
                    src="/assets/images/ancestree-logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top logoHeader"
                    alt="Ancestree logo"
                />
                {" Ancestree"}
            </Navbar.Brand>
        </Navbar>
        <CheeseburgerMenu isOpen={menuOpen} closeCallback={closeMenu} backgroundColor="#6c757d">
            <div className="my-menu-content">
                <ul>
                    <li><Link to="/home" onClick={closeMenu}>Menu item 1</Link></li>
                    <li><GiExitDoor/><Link to="/home" onClick={disconnect}>Déconnexion</Link></li>
                </ul>
            </div>
        </CheeseburgerMenu>
    </React.Fragment>
    )
}

export default NavbarHeader;