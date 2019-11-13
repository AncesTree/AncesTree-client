import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import withAuth from "./auth/withAuth";
import App from "../App";
import Login from "./Login";

const Root = ({ store }) => (
    <Provider store={store}>
        <button className="add-button">Add to home screen</button>
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;