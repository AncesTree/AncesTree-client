import React, { Component } from "react";
import SearchConversation from "./SearchConversation";
import ListConversation from "./ListConversation";
import ListMessage from "./ListMessage";
import "./css/Agora.css";
import socketIOClient from "socket.io-client";
var socket;

class Agora extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:4001"
        }
        socket = socketIOClient(this.state.endpoint);
    }

    render() {
        return (
            <div>
                <SearchConversation />
                <div className="scrollable sidebar">
                    <ListConversation />
                </div>
            </div>
        )
    }
}

export { Agora, socket };

// https://chaewonkong.github.io/posts/socket-io.html