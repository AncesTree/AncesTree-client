import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CHECK_TOKEN_URL } from "../../conf/config";

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            fetch(CHECK_TOKEN_URL)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        this.setState({ loading: false, redirect: true });
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
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
}