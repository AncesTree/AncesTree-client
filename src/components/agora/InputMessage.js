import React from 'react';
import './css/InputMessage.css';
import socketIOClient from "socket.io-client";

class InputMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            channel: "private"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        const socket = socketIOClient("http://localhost:4001");
        socket.emit('chat message', { message: this.state.message, sender: "me", date: new Date.now() })
        this.setState({ message: '' })
    }

    render() {
        return (
            <form className="compose" onSubmit={this.handleSubmit}>
                <input
                    value={this.state.message}
                    onChange={this.handleChange}
                    type="text"
                    className="compose-input"
                    placeholder="Write your message .."
                ></input>
                <button type="submit">
                    Send
                </button>
            </form>
        )
    };
}

export default InputMessage;