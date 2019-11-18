import {connect} from 'react-redux'
import {basicAccountCreation, linkedInAccountCreation} from '../actions/Join'
import Join from "../components/join/Join";

const mapDispatchToProps = dispatch => ({
    basicAccountCreation: (id,email,password) => dispatch(basicAccountCreation(id,email,password)),
    linkedInAccountCreation: (id) => dispatch(linkedInAccountCreation(id))
  });
  
  const mapStateToProps = state => ({
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Join);