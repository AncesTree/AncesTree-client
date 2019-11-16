import React from "react";
import "./css/ListConversation.css";
import ListItemConversation from "./ListItemConversation";

const ListConversation = ({ rooms }) => {

    return (
        <div>
            {
                rooms.map(room => (
                    <ListItemConversation roomName={room.name} roomId={room._id} roomSize={room.users.length} />
                ))
            }
        </div>
    )
}

export default ListConversation;