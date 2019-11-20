import React, { useState, useEffect } from "react";
import ListConversation from "./ListConversation";
import CreateConversation from "./CreateConversation";
import axios from "axios";
import { GET_CHAT_API } from "../../conf/config";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
//import socket from "./socketConnection";
import SocketService from "../../services/SocketService";
import SocketContext from "../SocketContext";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(8),
        left: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    textField: {
        left: theme.spacing(2),
        width: "60%",
    },
}));

const Agora = (props) => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [rooms, setRooms] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [input, setInput] = useState("");
    //const [socketS, setSocket] = useState(props.socket)
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        //setSocket(SocketService.getInstance())
        let isFetching = true
        const backUser = {userId: user.id, firstName: user.firstname, lastName: user.lastname};
        //props.socket.emit("User connected", backUser);
        SocketService.emit("User connected", backUser);
        axios.get(GET_CHAT_API.url + "users/rooms/" + user.id, { headers: GET_CHAT_API.header })
            .then(response => {
                if (isFetching) {
                    setRooms(response.data.rooms)
                }
            })
            .catch(err => console.error(err))
        return () => isFetching = false
    });

    const handleSearch = () => {
        setIsSearching(!isSearching);
    }

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div className='container'>
            <CreateConversation endpoint={GET_CHAT_API.url} user={user} userRooms={rooms} className="fidex-bottom" />
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleSearch}>
                <SearchRoundedIcon />
            </Fab>
            {
                isSearching ?
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            id="outlined-basic"
                            className={classes.textField}
                            label="Conversation Name"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"

                            endIcon={<SearchRoundedIcon />}
                        > Search </Button>
                    </form>
                    :
                    <div className="scrollable sidebar">
                        <ListConversation rooms={rooms} />
                    </div>
            }
        </div>
    );
};

const AgoraSocket = props => (
    <SocketContext.Consumer >
        {
            socket => <Agora {...props} socket={socket}/>
        }
    </SocketContext.Consumer>
)

export default AgoraSocket;