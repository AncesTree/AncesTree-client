import React, {useState} from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
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
import CallbackAssociateLinkedIn from "./callback/CallbackAssociateLinkedIn";
import CallbackRegisterLinkedIn from "./callback/CallbackRegisterLinkedIn";
import CallbackMyDash  from "./callback/CallbackMyDash";
import Invitation from "../components/Invitation";
import Login from "./Login";
import Agora from "./agora/Agora";
import Conversation from "./agora/Conversation";
import ConversationSettings from "./agora/ConversationSettings";
import Home from "./home/HomeScreen";
import { Alert } from "react-bootstrap";
import Register from "./Register";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";

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
                <Route exact path="/join/:id" component={JoinContainer}/>
                <Route exact path="/join/:id/:error" component={JoinContainer}/>
                <Route exact path="/invitation" component={App(Invitation)}/>    
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/:error_msg" component={Login} />
                <Route exact path="/token/:token" component={Token}/>
                <Route exact path="/register" component={withAuth(Register)}/>
                <Route exact path="/updateProfile" component={App(withAuth(UpdateProfile))}/>
                <Route exact path="/callback_linkedin_associate" component={CallbackAssociateLinkedIn}/>
                <Route exact path="/callback_linkedin_login" component={CallbackLoginLinkedIn}/>
                <Route exact path="/callback_linkedin_join" component={CallbackRegisterLinkedIn}/>
                <Route exact path="/callback_mydash" component={CallbackMyDash}/>
                <Route exact path="/me" component={App(withAuth(Profile))}/>
                <Route exact path="/home" component={App(withAuth(Home))} />
                <Route exact path="/tree" component={App(withAuth(TreeContainer))} />
                <Route exact path="/agora" component={App(withAuth(Agora))} />
                <Route exact path="/agora/conversation/:id" component={App(withAuth(Conversation))} />
                <Route exact path="/agora/conversation/settings/:id" component={App(withAuth(ConversationSettings))} />
                <Route exact path="/" component={App(withAuth(Home))} />
                <Error404/>
            </Switch>
        </Router>
    </Provider>
    )}

export default Root;
