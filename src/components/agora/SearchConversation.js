import React from 'react'
import "./css/SearchConversation.css";

class SearchConversation extends React.Component {
    render () {
        return (
        <div className="conversation-search">
          <input
            type="search"
            className="conversation-search-input"
            placeholder="Search Conversation"
          />
        </div>
      );
    }
}
export default SearchConversation;