import React, {Component} from 'react'

class Tree extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    };

    fetchData = () => {
        const { fetchLineage } = this.props;
        fetchLineage("9291b16a-fa11-4b0b-9c05-fbb3d0546b8c");
    };

    render() {
    const {juniors, seniors, focusUser} = this.props;
    let juniorsClean, seniorsClean;
    if (juniors === undefined){
        juniorsClean = []
    } else {
        juniorsClean = juniors
    }

    if (seniors === undefined){
        seniorsClean = []
    } else {
        seniorsClean = seniors
    }
    console.log(juniorsClean)

    return (
    <React.Fragment>
        <button onClick={() => this.fetchData()}>Fetch</button>
        <h1>juniors</h1>
        <ul>

        </ul>
        <h1>Seniors</h1>
        <ul>

        </ul>
        </React.Fragment>
    )}
    }

export default Tree;