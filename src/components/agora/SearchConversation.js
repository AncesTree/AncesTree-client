import React from 'react'
import "./css/SearchConversation.css";

const SearchConversation = () => {
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
export default SearchConversation;