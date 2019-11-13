import {connect} from 'react-redux'
import {fetchLineage} from '../actions/Tree'
import {Tree} from '../components/tree/Tree'

const mapDispatchToProps = dispatch => ({
    fetchApiLineage: (id) => dispatch(fetchLineage(id)),
  });
  
  const mapStateToProps = state => ({
    junior: state.tree.junior,
    senior: state.tree.senior,
    userFocus: undefined
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tree);