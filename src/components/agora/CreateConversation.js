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
import { get, post, patch } from './methods';

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
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [roomID, setRoomID] = useState("")

    const classes = useStyles();

    const handleClick = () => {
        setShowForm(!showForm)
    }

    const fetchUsers = () => {
        const query = GET_CHAT_API.url + "users"; 
        get(query, { headers: GET_CHAT_API.header })
            .then(res => {
                setAllUsers(res);
                setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [load])

    const { register, handleSubmit, errors } = useForm();

    const postRoom = () => {
        const queryRoom = GET_CHAT_API.url + "rooms";
        const room = { "name": input, "users": [user._id], "messages": [] };
        const headers = {headers:GET_CHAT_API.header};
        post(queryRoom, room, headers)
            .then(
                res => {
                    const queryUser = GET_CHAT_API.url + "users/" + user._id;
                    const userUpdate = { "rooms": [...user.rooms,res._id] };
                    patch(queryUser, userUpdate, headers)
                        .then()
                        .catch( err => {
                            setError(err.message)
                        })
                }
            )
            .catch( err => {
                setError(err.message)
            })
    }
    const onSubmit = data => {
        console.log(user)
        if (input !== '') {
            
            const query = GET_CHAT_API.url + "rooms"; 

            get(query, { headers: GET_CHAT_API.header })
            .then(res => console.log(res))
            //axios.delete( GET_CHAT_API.url + "users/db6f904f-7291-4d66-a95c-e8515253ae0a", { headers: GET_CHAT_API.header })
            /*axios.patch(
                GET_CHAT_API.url + "users/" + user._id, 
                { "rooms": []}, 
                {headers:GET_CHAT_API.header})
                .then(response => console.log(response))
                .catch(err => err)
                */
            const room = { "name": input, "users": [user._id], "messages": [] }
            axios.post(
                GET_CHAT_API.url + "rooms", 
                room, 
                {headers:GET_CHAT_API.header})
                .then(
                response => {
                    axios.patch(
                        GET_CHAT_API.url + "users/" + user._id, 
                        { "rooms": user.rooms.push(response.data._id)}, 
                        {headers:GET_CHAT_API.header})
                        .then(response => console.log(response))
                        .catch(err => err)
                    }
                ).catch( err => err)  
            
                
            setInput('')
            handleClick();
        } else {
            alert("Please enter a name for the conversation")
        }
    };



    const handleChange = (value) => {

    }
/*
TODO : dynamic search for users
clickable users and then add on click above the search field
*/
    const renderCreateConversation = () => (
        <>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClick}>
                <AddIcon />
            </Fab>
            {showForm ?
                <div>
                    <List>
                    {
                        userIn.map( user => (
                            <ListItem >
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
                </div>
                : ""
            }
        </>
    )

    if (load) {
        return (<ul>
            {error ? <li>{error.message}</li> : renderCreateConversation()}
        </ul>);
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
}
export default CreateConversation;
