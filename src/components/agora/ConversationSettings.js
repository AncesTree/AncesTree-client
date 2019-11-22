import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
    }
}));

const ConversationSettings = () => {
    const roomId = useState(history.location.pathname.split("/")[4])
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