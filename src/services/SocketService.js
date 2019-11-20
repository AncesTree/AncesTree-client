import io from "socket.io-client";

class SocketService {
    _socket = null;

    static getInstance() {
        if (SocketService._socket === null){
            this._socket = io(process.env.REACT_APP_CHAT_API)
        }
        return this._socket
    }

}

export default SocketService.getInstance();

