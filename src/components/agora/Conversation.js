import React, { useState, useEffect } from 'react';
import history from "../../components/common/history";
import { GET_CHAT_API } from "../../conf/config";
import axios from "axios";

const Conversation = () => {
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    const roomId = history.location.pathname.split("/")[3];
    let isFetching = true
    axios.get(GET_CHAT_API.url + "/rooms/messages/" + roomId).then(response => {
      if (isFetching) {
        setMessages(response.data.messages)
      }
    })
    return () => isFetching = false
  }, []);

  return (
    <div>
      <p> {} </p>
    </div>
  );
}

export default Conversation;