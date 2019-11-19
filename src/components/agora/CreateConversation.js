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
    button: {
        margin: "dense",
    },
    fab: {
        position: 'absolute',
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

const CreateConversation = ({ endpoint, userId, userRooms }) => {
    const [showForm, setShowForm] = useState(false);
    const [input, setInput] = useState("")
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
            const room = { name: input, users: [userId], messages: [] }
            axios.post(endpoint + "/rooms", room).then(
                response => {
                    axios.patch(endpoint + "users/" + userId, { rooms: userRooms.concat(response.data._id) })
                }
            )
            setInput('')
            handleClick();
        } else {
            alert("Please enter a name for the conversation")
        }
    };

    const removeFromRoom = () => {

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
                            <ListItem onClick={removeFromRoom}>
                                <ListItemText primary={user.firstName} secondary={user.lastName} />
                            </ListItem>
                        ))
                    }
                    </List>

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
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SaveIcon />}
                        type="submit"
                    > Save </Button>
                </form>
                </div>
                : ""
            }
        </>
    );
}
export default CreateConversation;