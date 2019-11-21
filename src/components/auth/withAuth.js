import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setUserId, setUser } from "../../actions/User";
import { connect } from 'react-redux';
import AuthAPIService from "../../services/AuthAPIService";
import Neo4jAPIService from "../../services/Neo4jAPIService";

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
            AuthAPIService.checkTocken()
                .then(id => {
                    this.props.dispatch(setUserId(id));
                    Neo4jAPIService.getUser(id)
                        .then(user => {
                            this.props.dispatch(setUser(user));
                            this.setState({loading: false});
                        })
                        .catch(err => {console.error(err)})
                })
                .catch(err => {
                    if(localStorage.getItem('refresh_token')){
                        AuthAPIService.refreshToken()
                            .then(res => {
                                this.setState({loading: false});
                                console.log(res)
                        })
                            .catch(err => {
                                this.setState({loading: false, redirect: true})
                                console.log(err)
                        })
                    }
                    else{
                        this.setState({loading: false, redirect: true})
                        console.log(err)
                    }   
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
