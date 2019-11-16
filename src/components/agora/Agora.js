import React, { useState, useEffect } from "react";
import SearchConversation from "./SearchConversation";
import ListConversation from "./ListConversation";
import "./css/Agora.css";
import CreateRoom from "./CreateRoom";
import axios from "axios";
import { GET_CHAT_API } from "../../conf/config";

const Agora = () => {
    const [user_id, setUser_id] = useState("5dd015790a792e19ae646734");
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        let isFetching = true
        axios.get(GET_CHAT_API.url + "/users/rooms/" + user_id).then(response => {
            if (isFetching) {
                setRooms(response.data.rooms)
            }
        })
        return () => isFetching = false
    }, []);

    const renderAgora = () => {
        return (
            <div className='container'>
                <SearchConversation />
                <CreateRoom endpoint={GET_CHAT_API.url} userId={user_id} userRooms={rooms} />
                <div className="scrollable sidebar">
                    <ListConversation rooms={rooms} />
                </div>
            </div>
        )
    };

    return (
        renderAgora()
    );
};

export default Agora;

// https://chaewonkong.github.io/posts/socket-io.html