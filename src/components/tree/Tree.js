import React, {Component} from 'react'

class Tree extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    };

    fetchData = () => {
        console.log("fetchData")
        const { fetchApiLineage } = this.props;
        fetchApiLineage("9291b16a-fa11-4b0b-9c05-fbb3d0546b8c");
    }

    render() {
    const {junior, senior, focusUser} = this.props
    return (
    <React.Fragment>
        <button onClick={() => this.fetchData()}>Fetch</button>
            <p>{junior}</p>
            <p>{senior}</p>
        </React.Fragment>
    )}
    };

export default Tree;