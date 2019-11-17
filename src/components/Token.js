import React, { Component } from 'react';
import history from "../components/common/history";

export default class Token extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: history.location.pathname.split("/")[2]
        }
    }
    componentDidMount() {
        localStorage.setItem("Authorization",this.state.token);
        history.push('/')
    }

    render() {
        return (
            <div></div>
        );
    }
}