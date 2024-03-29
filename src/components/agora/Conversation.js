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
import { animateScroll as scroll } from 'react-scroll';
import Grid from "@material-ui/core/Grid";

const socket = io(process.env.REACT_APP_CHAT_API);

const useStyles = makeStyles(theme => ({
  containerForm: {

  },
  fab: {
  },
  form: {
    flexGrow: 1,
  },
  gridInput: {
    height: "75px",
    bottom: "56px",
  },
  gridFab: {
    marginLeft: "-7px",
    paddingLeft: "0px !important",
    paddingTop: "18px !important",
    right: theme.spacing(1)
  },
  input: {
    marginTop: 9,
    marginLeft: "0.25%",
    marginRight: "0.25%",
    width: "99.5%"
  },
  root: {
    top: "0px",
    marginBottom: "130px"
  },
  divMessage: {
    bottom: "57px",
    height: "75px",
    position: "fixed",
    background: "white",
    width: "100%",
    borderTop: "0.5px solid",
    borderColor: "grey"
  }
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
        scroll.scrollToBottom()
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
      scroll.scrollToBottom()
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
                    `${message.sender.firstName} ${message.sender.lastName}`
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

      <div className={classes.divMessage}>
      <form className={classes.form} onSubmit={e => handleSend(e)} id="chat">
        <Grid container className={classes.containerForm} spacing={3}>


          <Grid item xs={10} className={classes.gridInput}>
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
        </Grid>

          <Grid item xs={2} className={classes.gridFab}>
            <Fab
                className={classes.fab}
                type="submit"
            > <SendIcon> Send </SendIcon>
            </Fab>
          </Grid>
        </Grid>
          
      </form>
      </div>
    </>
  );

  if (load) {
    return (
      <div>
        {error ? <p>{error.message}</p> : renderConversation()}
      </div>
    );
  } else {
    return null;
  }
};


export default Conversation;


/*
<Fab aria-label="add" className={classes.fab} onClick={handleSettings}>
  <SettingsIcon />
</Fab>
*/
