import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { GET_CHAT_API } from "../../conf/config";
import axios from "axios";
import io from "socket.io-client";
import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const socket = io.connect(GET_CHAT_API.url);

const useStyles = makeStyles(theme => ({
    fab: {
    }
}));

const ConversationSettings = () => {
    const [userId, setUserId] = useState("5dd015790a792e19ae646734")
    const [roomId, setRoomId] = useState(history.location.pathname.split("/")[4])
    const classes = useStyles();

    useEffect(() => { });

    const handleToRoom = () => {
        history.push("/agora/conversation/" + roomId);
    }

    return (
        <div>
            <Fab aria-label="add" className={classes.fab} onClick={handleToRoom}>
                <ChatIcon />
            </Fab>
        </div>
    );
}

export default ConversationSettings;