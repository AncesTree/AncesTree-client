import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import NearMeIcon from '@material-ui/icons/NearMe';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const ListConversation = ({ rooms }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                rooms.map(room => (
                    <div>
                        <ListItemLink href={`/agora/conversation/${room._id}`} >
                            <ListItemText primary={room.name} secondary={room.users.length}></ListItemText>
                            <ListItemIcon>
                                <NearMeIcon />
                            </ListItemIcon>
                        </ListItemLink>
                        <Divider />
                    </div>
                ))
            }
        </div>
    )
}

export default ListConversation;