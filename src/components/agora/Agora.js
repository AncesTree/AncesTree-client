import React, { Component } from "react";
import SearchConversation from "./SearchConversation";
import ListConversation from "./ListConversation";
import ListMessage from "./ListMessage";
import "./css/Agora.css";

class Agora extends Component {
    render() {
        return (
            <div>
                <SearchConversation />
                <div className="scrollable sidebar">
                    <ListConversation />
                </div>
                <div className="scrollable content">
                    <ListMessage />
                </div>
            </div>
        )
    }
}

export default Agora;