import React, { useState, useEffect } from 'react'
import useForm from "react-hook-form";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from "@material-ui/core/List";
import { GET_CHAT_API } from "../../conf/config";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(8),
        right: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    textField: {
        left: theme.spacing(2),
        width: "60%",
    },
}));

const CreateConversation = ({ endpoint, user, userRooms }) => {
    const [showForm, setShowForm] = useState(false);
    const [input, setInput] = useState("");
    const [inputUser, setInputUser] = useState("");
    const [userIn, setUserIn] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const classes = useStyles();

    const handleClick = () => {
        setShowForm(!showForm)
    }

    useEffect(() => {
        let isFetching = true
        axios.get(GET_CHAT_API.url + "users", {headers:GET_CHAT_API.header})
            .then(response => {
                if (isFetching) {
                    setAllUsers(response.data)
                }
            })

        return () => isFetching = false
    })

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (input !== '') {
            const room = { "name": input, "users": [user.id], "messages": [] }
            axios.post(
                GET_CHAT_API.url + "rooms", 
                room, 
                {headers:GET_CHAT_API.header})
                .then(
                response => {
                    axios.patch(
                        GET_CHAT_API.url + "users/" + user.id, 
                        { rooms: userRooms.concat(response.data._id) }, 
                        {headers:GET_CHAT_API.header})
                        .then()
                        .catch(err => err)
                    }
                ).catch( err => err)
            setInput('')
            handleClick();
        } else {
            alert("Please enter a name for the conversation")
        }
    };

    const removeFromRoom = (user) => {

    }

    const handleChange = (value) => {

    }
/*
TODO : dynamic search for users
clickable users and then add on click above the search field
*/
    return (
        <>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClick}>
                <AddIcon />
            </Fab>
            {showForm ?
                <div>
                    <List>
                    {
                        userIn.map( user => (
                            <ListItem onClick={removeFromRoom(user)}>
                                <ListItemText primary={user.firstName} secondary={user.lastName} />
                            </ListItem>
                        ))
                    }
                    </List>

                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        id="outlined-basic"
                        className={classes.textField}
                        label="Conversation Name"
                        margin="normal"
                        variant="outlined"
                        type="text"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SaveIcon />}
                        type="submit"
                    > Save </Button>
                </form>
                <TextField
                    value={inputUser}
                    onChange={e => setInput(e.target.value)}
                    id="outlined-basic"
                    className={classes.textField}
                    label="Conversation Name"
                    margin="normal"
                    variant="outlined"
                    onChange={e => handleChange(e.target.value)}
                />
                </div>
                : ""
            }
        </>
    );
}
export default CreateConversation;