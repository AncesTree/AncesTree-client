import React from 'react'
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
import ChatAPIService from '../../services/ChatAPIService';

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

    const deleteRoom = (id) => {
        const roomsUpdated = rooms.map(r => r._id).filter(r => r !== id);
        ChatAPIService.patchUser(userId, {rooms: roomsUpdated})
            .then(response => {
                callParent(false);
            })
            .catch(err => {
                console.log(err.message)
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