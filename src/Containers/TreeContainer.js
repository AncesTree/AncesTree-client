import {connect} from 'react-redux'
import {fetchLineage} from '../actions/Tree'
import Tree from "../components/tree/Tree";

const mapDispatchToProps = dispatch => ({
  fetchLineage: (id) => dispatch(fetchLineage(id)),
  });
  
  const mapStateToProps = state => ({
    juniors: state.tree.juniors,
    seniors: state.tree.seniors
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tree);