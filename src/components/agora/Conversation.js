import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { GET_CHAT_API } from "../../conf/config";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import socket from "./socketConnection";

const useStyles = makeStyles(theme => ({
  textField: {
    left: theme.spacing(2),
    width: "60%",
  },
  button: {
    color: "#08103b",
  },
  fab: {
    left: theme.spacing(1),
  },
}));

const Conversation = () => {
  const user = useSelector(state => state.user);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(history.location.pathname.split("/")[3]);
  const [input, setInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    let isFetching = true
    axios.get(GET_CHAT_API.url + "rooms/messages/" + roomId, { headers: GET_CHAT_API.header })
      .then(response => {
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
      const msg = { message: input, sender: user.id, room: roomId }
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
                  message.sender._id == user.id ?
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
          onChange={e => setInput(e.target.value)}
          id="outlined-basic"
          className={classes.textField}
          label="Message"
          margin="normal"
          variant="outlined"
          type="text"
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