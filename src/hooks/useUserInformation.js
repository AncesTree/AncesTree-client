import React, { useState, useEffect } from 'react';
import { GET_USER_URL } from "../conf/config";
import {setUserId} from "../actions/User";
import {useDispatch} from "react-redux";

function useUserInformation(userId) {
    const [user, setUser] = useState({id: userId})
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(GET_USER_URL.url,
            {headers: GET_USER_URL.header()})
            .then(res => {
                if (res.status === 200) {
                    this.setState({loading: false});
                    res.json().then(res =>  {
                        setUser(res)
                    })
                } else {
                    setUser({})
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({loading: false, redirect: true});
            });
    });

    return user;
}