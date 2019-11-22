import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { useSelector } from "react-redux";

import ListConversation from "./ListConversation";
import CreateConversation from "./CreateConversation";
import { GET_CHAT_API } from "../../conf/config";

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { get } from './methods'

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(8),
        left: theme.spacing(1),
        zIndex: "1035",
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
    const [userDB, setUserDB] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [input, setInput] = useState("");
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const { handleSubmit } = useForm();

    const fetchUser = () => {
        const query = GET_CHAT_API.url + "users/rooms/" + user.id;
        get(query, { headers: GET_CHAT_API.header })
            .then(res => {
                setUserDB(res);
                setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
    };

    useEffect(() => {
        fetchUser();
    }, [load]);

    const handleSearch = () => {
        setIsSearching(!isSearching);
    };

    const onSubmit = data => {
        console.log(data)
    };

    const renderAgora = () => (
        <div className='container agoraStuff'>
            <CreateConversation endpoint={GET_CHAT_API.url} user={userDB} userRooms={userDB.rooms} callParent={fetchUser} className="fidex-bottom" />
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
                        <ListConversation rooms={userDB.rooms} userId={userDB._id} callParent={fetchUser} />
                    </div>
            }
        </div>
    );

    if (load) {
        return (
            <ul>
                {error ? <p>{error.message}</p> : renderAgora()}
            </ul>
        );
    } else {
        return (
            <div>
                Loading...
            </div>
        );

    }
};

export default Agora;