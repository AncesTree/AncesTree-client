import React, { Component } from "react";
import "./css/ListConversation.css";
import ListItemConversation from "./ListItemConversation";
import { socket } from "./Agora";

class ListConversation extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        socket.emit("load_room");


    }

    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                <ListItemConversation />
                <ListItemConversation />
                <ListItemConversation />
                <p> Paul est un humain </p>
            </div>
        );
    }
}

export default ListConversation;