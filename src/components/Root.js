import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import history from "./common/history";
import App from "../App";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import Error404 from "./common/Error404";
import TreeContainer from "../Containers/TreeContainer";
import Token from "../components/Token";
import LoginContainer from "../Containers/LoginContainer";
import withAuth from "./auth/withAuth";
import JoinContainer from "../Containers/JoinContainer";
import CallbackLoginLinkedIn from "./callback/CallbackLoginLinkedIn";
import CallbackRegisterLinkedIn from "./callback/CallbackRegisterLinkedIn";
import CallbackMyDash  from "./callback/CallbackMyDash";
import Invitation from "../components/Invitation";

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
                <Route exact path="/join/:id/:error" component={App(JoinContainer)}/>
                <Route exact path="/invitation" component={App(Invitation)}/>    
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/login/:error_msg" component={LoginContainer} />
                <Route exact path="/token/:token" component={Token}/>

                <Route path="/callback_linkedin_login" component={CallbackLoginLinkedIn}/>
                <Route path="/callback_linkedin_join" component={CallbackRegisterLinkedIn}/>
                <Route path="/callback_mydash" component={CallbackMyDash}/>
                
                <Route exact path="/join/:id" component={App(JoinContainer)}/>
                <Route exact path="/home" component={App(withAuth(Error404))} />
                <Route exact path="/tree" component={App(withAuth(TreeContainer))} />
                <Route exact path="/message" component={App(withAuth(Error404))} />
                <Route exact path="/" component={App(withAuth(Error404))} />
                <Error404 />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
