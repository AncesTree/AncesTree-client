import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import withAuth from "./auth/withAuth";
import history from "./common/history";
import App from "../App";
import Login from "./Login";
import TreeContainer from "../Containers/TreeContainer";


const Root = ({ store }) => (
    <Provider store={store}>
        <button className="add-button">Add to home screen</button>
        <Router history={history}>
            <Switch>
                <Route exact path="/home" component={App} />
                <Route exact path="/tree" component={App} />
                <Route exact path="/message" component={App} />
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