import React, {useState} from 'react'
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
import withAuth from "./auth/withAuth";
import JoinContainer from "../Containers/JoinContainer";
import CallbackLoginLinkedIn from "./callback/CallbackLoginLinkedIn";
import CallbackRegisterLinkedIn from "./callback/CallbackRegisterLinkedIn";
import CallbackMyDash  from "./callback/CallbackMyDash";
import Invitation from "../components/Invitation";
import Login from "./Login";
import { Alert } from "react-bootstrap";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

function Root() {
    const [show, setShow] = useState(true);

    let alert;
    if (show) {
        alert =
        <Alert className="alertDownload" variant="primary" onClose={() => setShow(false)} dismissible>
            Download the app !
        </Alert>
    } else {
        alert =
            <Alert style={{display: "none"}} className="alertDownload" variant="primary" onClose={() => setShow(false)} dismissible>
                Download the app !
            </Alert>
    }

    return (
    <Provider store={store}>
        { alert }
        <Router history={history}>
            <Switch>
                <Route exact path="/join/:id" component={App(JoinContainer)}/>
                <Route exact path="/join/:id/:error" component={App(JoinContainer)}/>
                <Route exact path="/invitation" component={App(Invitation)}/>    
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/:error_msg" component={Login} />
                <Route exact path="/token/:token" component={Token}/>

                <Route exact path="/callback_linkedin_login" component={CallbackLoginLinkedIn}/>
                <Route exact path="/callback_linkedin_join" component={CallbackRegisterLinkedIn}/>
                <Route exact path="/callback_mydash" component={CallbackMyDash}/>
                
                <Route exact path="/join/:id" component={App(JoinContainer)}/>
                <Route exact path="/home" component={App(withAuth(Error404))}/>
                <Route exact path="/tree" component={App(withAuth(TreeContainer))}/>
                <Route exact path="/message" component={App(withAuth(Error404))}/>
                <Route exact path="/" component={App(withAuth(Error404))}/>
                <Error404/>
            </Switch>
        </Router>
    </Provider>
    )};

export default Root;
