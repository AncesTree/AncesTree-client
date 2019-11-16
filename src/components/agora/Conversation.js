import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { GET_CHAT_API } from "../../conf/config";
import axios from "axios";
import io from "socket.io-client";
import Message from "./Message";
import './css/InputMessage.css';
import { Button, InputGroup, FormGroup, FormControl } from "react-bootstrap";

const socket = io.connect("http://localhost:4001");

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("5dd015790a792e19ae646734")
  const [roomId, setRoomId] = useState(history.location.pathname.split("/")[3])
  const [input, setInput] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    let isFetching = true
    axios.get(GET_CHAT_API.url + "/rooms/messages/" + roomId).then(response => {
      if (isFetching) {
        setMessages(response.data.messages);
        setUsers(response.data.users);
      }
    })

    socket.on("message", message => setMessages(drafts => { drafts.push(message) }))

    return () => {
      isFetching = false;
      socket.disconnect()
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

  const handleClick = () => {
    setShowUsers(!showUsers);
  }

  return (
    <div>
      <Button variant="dark" onClick={handleClick}>Info</Button>
      {
        showUsers ?
          users.map(user => (
            <p> {user.name} </p>
          ))
          :
          ''
      }
      {
        messages.map(message => (
          <Message data={message.message} isMine={true} startsSequence={true} endsSequence={false} showTimestamp={false} />
        ))
      }
      <form onSubmit={e => handleSend(e)} >
      <InputGroup className="mb-3" >
        <FormControl
          alue={input}
          onChange={e => setInput(e.target.value.trim())}
          type="text"
          placeholder="Write your message .."
        />
        <InputGroup.Append>
          <Button variant="dark" type="submit">Send</Button>
        </InputGroup.Append>
      </InputGroup>
      </form>
    </div>
  );
}

export default Conversation;