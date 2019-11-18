import io from "socket.io-client";
import { GET_CHAT_API } from "../../conf/config";
const socket = io.connect(GET_CHAT_API.url)
export default socket;