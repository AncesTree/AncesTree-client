import React, {Component} from 'react'
import {Navbar} from 'react-bootstrap'
import CheeseburgerMenu from "cheeseburger-menu";
import {Link} from "react-router-dom";
import history from "./history";

class NavbarHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuOpen: false,
        }
    }

    openMenu() {
        this.setState({menuOpen: true })
    }

    closeMenu() {
        this.setState({menuOpen: false })
    }

    disconnect() {
        localStorage.removeItem("Authorization");
        history.push("/login")
    }

    render() {
        return (
        <React.Fragment>
            <Navbar bg="dark" fixed="top">
                <Navbar.Brand>
                    <img
                        onClick={() => this.setState({menuOpen: !this.state.menuOpen})}
                        src="/assets/images/ancestree-logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top logoHeader"
                        alt="Ancestree logo"
                    />
                    {" Ancestree"}
                </Navbar.Brand>
            </Navbar>
            <CheeseburgerMenu isOpen={this.state.menuOpen} closeCallback={this.closeMenu.bind(this)} backgroundColor="#6c757d">
                <div className="my-menu-content">
                    <ul>
                        <li><Link to="/home" onClick={this.closeMenu.bind(this)}>Menu item 1</Link></li>
                        <li><Link to="/home" onClick={this.disconnect.bind(this)}>Déconnexion</Link></li>
                    </ul>
                </div>
            </CheeseburgerMenu>
        </React.Fragment>
        )
    }

}

export default NavbarHeader;