import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import history from "./common/history";
import App from "../App";
import Login from "./Login";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import Error404 from "./common/Error404";
import TreeContainer from "../Containers/TreeContainer";
import withAuth from "./auth/withAuth";
import JoinContainer from "../Containers/JoinContainer";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

const Root = () => (
    <Provider store={store}>
        <button className="add-button">Add to home screen</button>
        <Router history={history}>
            <Switch>
                <Route exact path="/join/:id" component={App(JoinContainer)}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={App(Error404)} />
                <Route exact path="/tree" component={App(TreeContainer)} />
                <Route exact path="/message" component={withAuth(App(Error404))} />
                <Route exact path="/" component={App(Error404)} />
                <Error404 />
            </Switch>
        </Router>
    </Provider>
);

export default Root;