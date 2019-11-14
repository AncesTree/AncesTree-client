import {connect} from 'react-redux'
import {accountCreation} from '../actions/Join'
import Join from "../components/join/Join";

const mapDispatchToProps = dispatch => ({
    accountCreation: (id,email,password) => dispatch(accountCreation(id,email,password)),
  });
  
  const mapStateToProps = state => ({
  });
  
  export default connect(null, mapDispatchToProps)(Join);