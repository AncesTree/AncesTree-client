import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CHECK_TOKEN_URL } from "../../conf/config";
import {setUserId} from "../../actions/User";
import { connect } from 'react-redux';

export default function withAuth(ComponentToProtect) {
    class WithAuth extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {

            fetch(CHECK_TOKEN_URL.url,
                {headers: CHECK_TOKEN_URL.header()})
                .then(res => {
                    if (res.status === 200) {
                        this.setState({loading: false});
                        res.json().then(res =>  this.props.dispatch(setUserId(res.id)))
                    } else {
                        this.setState({loading: false, redirect: true});
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({loading: false, redirect: true});
                });
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
    return connect()(WithAuth)
};
