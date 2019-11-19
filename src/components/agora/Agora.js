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
import socket from "./socketConnection";
import SearchElement from "./SearchElement";

const useStyles = makeStyles(theme => ({
    button: {
        margin: "dense",
    },
    fab: {
        position: 'absolute',
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

const Agora = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [user_id, setUser_id] = useState("5dd015790a792e19ae646734");
    const [rooms, setRooms] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [input, setInput] = useState("");
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        socket.emit("User connected", { userId: user.id, firstName: user.firstname, lastName: user.lastname });

        let isFetching = true
        axios.get(GET_CHAT_API.url + "users/rooms/" + user_id).then(response => {
            if (isFetching) {
                setRooms(response.data.rooms)
            }
        })
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
            <p> {user.id} </p>
            <SearchElement element="room" />
            <CreateConversation endpoint={GET_CHAT_API.url} userId={user_id} userRooms={rooms} className="fidex-bottom" />
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleSearch}>
                <SearchRoundedIcon />
            </Fab>
            {
                isSearching ?
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            value={input}
                            onChange={e => setInput(e.target.value.trim())}
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
                            className={classes.button}
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

export default Agora;