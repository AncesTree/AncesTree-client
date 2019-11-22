import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import List from '@material-ui/core/List';
import ChatAPIService from "../../services/ChatAPIService";


const socket = io(process.env.REACT_APP_CHAT_API);

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
  const [roomId, ] = useState(history.location.pathname.split("/")[3]);
  const [input, setInput] = useState('');
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();

  useEffect(() => {
    ChatAPIService.getMessages(roomId)
      .then(res => {
        setMessages(res.messages);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true)
      });
      socket.on(roomId, newMessage => {
        setMessages(messages => [...messages, newMessage])
      });
  }, [load, messages.length, roomId]);

  const handleSend = e => {
    e.preventDefault();
    if (input !== '') {
      const msg = { message: input, sender: user.id, room: roomId }
      socket.emit('chat message', msg);
      setMessages([...messages, { message: input, sender: user.id }])
      setInput('');
    }
  }

  /**
  const handleSettings = () => {
    history.push("/agora/conversation/settings/" + roomId);
  }*/

  const renderConversation = () => (
    <>
      <List className={classes.root}>
        {
          messages.map((message, key) => (
            <ListItem key={key} alignItems="flex-start" >
              <ListItemText
                primary={
                  message.sender._id === user.id ?
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