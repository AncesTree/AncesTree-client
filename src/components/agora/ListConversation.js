import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { GET_CHAT_API } from "../../conf/config";
import { patch } from "./methods";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const ListConversation = ({ rooms, userId, callParent }) => {
    const classes = useStyles();
    const [error, setError] = useState('');

    const deleteRoom = (id) => {
        const roomsUpdated = rooms.map(r => r._id).filter(r => r != id);
        const query = GET_CHAT_API.url + "users/" + userId;
        patch(query, { "rooms": roomsUpdated }, { headers: GET_CHAT_API.header })
            .then(response => {
                callParent();
            })
            .catch(err => {
                setError(err.message)
            })

    }

    return (
        <List subheader={<ListSubheader>Your conversations</ListSubheader>} className={classes.root}>
            {
                rooms.map((room) => (
                    <React.Fragment key={room._id}>
                        <ListItemLink href={`/agora/conversation/${room._id}`} >
                            <ListItemText primary={room.name} secondary={room.users.length}></ListItemText>
                            <ListItemSecondaryAction>
                                <ListItemIcon>
                                    <IconButton edge="end" aria-label="delete" onClick={e => deleteRoom(room._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItemSecondaryAction>
                        </ListItemLink>
                        <Divider />
                    </React.Fragment>
                ))
            }
        </List>
    )
}

export default ListConversation;