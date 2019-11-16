import React from "react";
import history from "../../components/common/history";
import "./css/ListItemConversation.css"

const ListItemConversation = ({ roomName, roomId, roomSize }) => {
  const handleClick = () => {
    history.push("/agora/conversation/"+roomId)
  }

  return (
    <div className="conversation-list-item" onClick={handleClick}>
      <div className="conversation-info">
        <h1 className="conversation-title"> { roomName } </h1>
        <p className="conversation-snippet"> {roomSize} person{roomSize>1? "s":""} </p>
        <p> {roomId} </p>
      </div>
    </div>
  )
}

export default ListItemConversation;