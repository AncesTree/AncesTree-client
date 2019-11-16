import {connect} from 'react-redux'
import { login } from "../actions/Login";
import Login from "../components/Login";

const mapDispatchToProps = dispatch => ({
    login: ( email, password ) => dispatch(login(email, password))
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);