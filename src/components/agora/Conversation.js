import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { GET_CHAT_API } from "../../conf/config";
import axios from "axios";
import io from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const socket = io.connect(GET_CHAT_API.url);

const useStyles = makeStyles(theme => ({
  textField: {
    left: theme.spacing(2),
    width: "60%",
  },
  button: {
    color: "#08103b",
  },
  fab: {
  },
}));

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("5dd015790a792e19ae646734")
  const [roomId, setRoomId] = useState(history.location.pathname.split("/")[3])
  const [input, setInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    let isFetching = true
    axios.get(GET_CHAT_API.url + "/rooms/messages/" + roomId).then(response => {
      if (isFetching) {
        setMessages(response.data.messages);
      }
    })

    socket.on(roomId, message => setMessages(drafts => { drafts.push(message) }))

    return () => {
      isFetching = false;
    }
  });

  const handleSend = e => {
    e.preventDefault();
    if (input !== '') {
      const msg = { message: input, sender: userId, room: roomId }
      socket.emit('chat message', msg);
      setInput('');
    }
  }

  const handleSettings = () => {
    history.push("/agora/conversation/settings/" + roomId);
  }

  return (
    <div>
      <Fab aria-label="add" className={classes.fab} onClick={handleSettings}>
        <SettingsIcon />
      </Fab>
      <div>
        {
          messages.map(message => (
            <ListItem alignItems="flex-start" >
              <ListItemText
                primary={
                  message.sender._id == userId ?
                    "You"
                    :
                    message.sender.name
                }
                secondary={
                  <React.Fragment>
                    {message.message}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))
        }
      </div>
      <form onSubmit={e => handleSend(e)}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value.trim())}
          id="outlined-basic"
          className={classes.textField}
          label="Message"
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<SendIcon> Send </SendIcon>}
          type="submit"
        > Send </Button>
      </form>
    </div>
  );
}

export default Conversation;