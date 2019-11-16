import React, { useState } from 'react'
import useForm from "react-hook-form";
import axios from "axios";

const CreateConversation = ({ endpoint, userId, userRooms }) => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm)
    }

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        const room = { name: data.name, users: [userId], messages: [] }
        axios.post(endpoint + "/rooms", room).then(
            response => {
                axios.patch(endpoint + "/users/" + userId, { rooms: userRooms.concat(response.data._id) })
            }
        )
        handleClick();
    };

    return (
        <>
            <button onClick={handleClick}> New conversation </button>
            {showForm ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" ref={register({ required: true })} placeholder="Conversation Name" />
                    {errors.lastname && 'Name is required.'}
                    <input type="submit" value="OK"/>
                </form>
                : ""
            }
        </>
    );
}
export default CreateConversation;