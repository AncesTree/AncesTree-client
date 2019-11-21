import React, {Component} from "react";
import "./css/ListItemConversation.css"

class ListItemConversation extends Component {
    render () {
        return (
        <div className="conversation-list-item">
          {/* <img className="conversation-photo" src="../../logo.svg" alt="conversation" /> */}
          <div className="conversation-info">
            <h1 className="conversation-title"> Paul ARNAUD </h1>
            <p className="conversation-snippet"> Lorem Ipsum MDR </p>
          </div>
        </div>
      );
    }    
}

export default ListItemConversation;