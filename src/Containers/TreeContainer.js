import {connect} from 'react-redux'
import {fetchLineage, fetchResearch,fetchPromo} from '../actions/Tree'
import Tree from "../components/tree/Tree";

const mapDispatchToProps = dispatch => ({
  fetchLineage: (id) => dispatch(fetchLineage(id)),
  searchUser: (search) => dispatch(fetchResearch(search)),
  searchPromo : (search) => dispatch(fetchPromo(search))
  });
  
  const mapStateToProps = state => ({
    juniors: state.tree.juniors,
    seniors: state.tree.seniors,
    userFocus : state.tree.userFocus,
    user: state.user,
    searchResult: state.tree.searchResult
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tree);