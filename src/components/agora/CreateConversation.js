import React, { useState, useEffect } from 'react'
import useForm from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from "@material-ui/core/List";
import Checkbox from '@material-ui/core/Checkbox';
import { GET_CHAT_API } from "../../conf/config";
import { get, post, patch } from './methods';
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(8),
        right: theme.spacing(1),
        zIndex: "1035",
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    textField: {
        left: theme.spacing(2),
        width: "60%",
    },
    save: {
        position: "fixed",
        bottom: theme.spacing(8),
        left: theme.spacing(20),
        zIndex: "1035",
    }
}));

const CreateConversation = ({ user, callParent }) => {
    const [showForm, setShowForm] = useState(false);
    const [input, setInput] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [dico, setDico] = useState({})
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const me = useSelector(state => state.user);
    const classes = useStyles();

    const handleClick = () => {
        setShowForm(!showForm)
    }

    const fetchUsers = () => {
        const query = GET_CHAT_API.url + "users";
        get(query, { headers: GET_CHAT_API.header })
            .then(res => {
                const dico = {};
                res.forEach(element => {
                    if (element.id != user._id) {
                        dico[element._id] = false
                    }
                });
                setDico(dico);
                setAllUsers(res.filter(user => user._id !== me.id));
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

    const { handleSubmit } = useForm();

    const postRoom = () => {
        const users = [user._id]
        for (var key in dico) {
            if (dico[key]) {
                users.push(key)
            }
        }
        const queryRoom = GET_CHAT_API.url + "rooms";
        const room = { "name": input, "users": users, "messages": [] };
        const headers = { headers: GET_CHAT_API.header };
        post(queryRoom, room, headers)
            .then(
                res => {
                    const queryUser = GET_CHAT_API.url + "users/" + user._id;
                    const userUpdate = { "rooms": [...user.rooms, res._id] };
                    patch(queryUser, userUpdate, headers)
                        .then(response => {
                            callParent();
                            setInput('');
                            setShowForm(!showForm);
                        })
                        .catch(err => {
                            setError(err.message)
                        })
                }
            )
            .catch(err => {
                setError(err.message)
            })
    }

    const onSubmit = () => {
        if (input != "") {
            postRoom();
        } else {
            alert("Please insert a name for the conversation");
        }
    }


    const handleChange = id => event => {
        dico[id] = event.target.checked /* ATTENTION CRITIQUE ICI */
        setDico(dico => ({ ...dico, [id]: event.target.checked }));
    };



    const renderCreateConversation = () => (
        <>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClick}>
                <AddIcon />
            </Fab>
            {showForm ?
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Fab className={classes.save} type="submit">
                        <SaveIcon />
                    </Fab>
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
                    <List>
                        {
                            allUsers.map((user, key) => (
                                <ListItem key={key}>
                                    <Checkbox checked={dico[user._id]} onChange={handleChange(user._id)} value={user._id} />
                                    <ListItemText primary={user.firstName} secondary={user.lastName} />
                                </ListItem>
                            ))
                        }
                    </List>
                </form>
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
