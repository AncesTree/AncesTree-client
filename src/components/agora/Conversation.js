import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { GET_CHAT_API } from "../../conf/config";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import { get } from './methods'
import List from '@material-ui/core/List';
const socket = io(GET_CHAT_API.url);

const useStyles = makeStyles(theme => ({
  textField: {
  },
  button: {
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(9),
    right: theme.spacing(2)
  },
  input: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(10)
  },
  root: {
  },
}));

const Conversation = () => {
  const user = useSelector(state => state.user);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(history.location.pathname.split("/")[3]);
  const [input, setInput] = useState('');
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();

  const fetchMessages = () => {
    const query = GET_CHAT_API.url + "rooms/messages/" + roomId;
    get(query, { headers: GET_CHAT_API.header })
      .then(res => {
        setMessages(res.messages);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true)
      })
  }

  useEffect(() => {
    fetchMessages();
    socket.on(roomId, payload => {
      setMessages([...messages, payload])
    });
  }, [load]);

  const handleSend = e => {
    e.preventDefault();
    if (input !== '') {
      const msg = { message: input, sender: user.id, room: roomId }
      socket.emit('chat message', msg);
      setMessages([...messages, { message: input, sender: user.id }])
      setInput('');
    }
  }

  const handleSettings = () => {
    history.push("/agora/conversation/settings/" + roomId);
  }

  const renderConversation = () => (
    <>
      <List className={classes.root}>
        {
          messages.map((message, key) => (
            <ListItem key={key} alignItems="flex-start" >
              <ListItemText
                primary={
                  message.sender == user.id ?
                    "You"
                    :
                    "Not You" //message.sender.name
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
      </List>
      <form onSubmit={e => handleSend(e)} id="chat">
          <Fab
          className={classes.fab}
            type="submit"
          > <SendIcon> Send </SendIcon>
          </Fab>
          <TextField
            value={input}
            className={classes.input}
            onChange={e => setInput(e.target.value)}
            id="outlined-basic"
            label="Message"
            margin="normal"
            variant="outlined"
            type="text"
          />
          
      </form>
    </>
  );

  if (load) {
    return (
      <ul>
        {error ? <p>{error.message}</p> : renderConversation()}
      </ul>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

export default Conversation;


/*
<Fab aria-label="add" className={classes.fab} onClick={handleSettings}>
  <SettingsIcon />
</Fab>
*/