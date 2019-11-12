import React, { Component } from "react";
import "./css/ListConversation.css";
import ListItemConversation from "./ListItemConversation";

class ListConversation extends Component {
    render() {
        return (
            <div>
                <ListItemConversation />
                <ListItemConversation />
                <ListItemConversation />
            </div>
        );
    }
}

export default ListConversation;