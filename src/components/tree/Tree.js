import React, {Component} from 'react'
import Graph from "react-graph-vis";

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
        var DIR = "src/components/tree/img/users/";
        
        const graph = {
            nodes : [
                { id: 1, shape: "circularImage", image: DIR + "thibaut.png", label: "thibaut" },
                { id: 2, shape: "circularImage", image: DIR + "julien.jpg", label: "julien"},
                { id: 3, shape: "circularImage", image: DIR + "hugo.jpg", label: "Hugo" }
              ],
            
              // create connections between people
              // value corresponds with the amount of contact between two people
              edges : [{from: 1, to: 2 ,value: 2, color: { color: "blue" }},
              {from: 2, to: 3 ,value: 2, color: { color: "blue" }},
              {from: 3, to: 1 ,value: 2, color: { color: "blue" }}]
            
              
                
              
          };
          
          const options = {
            nodes: {
              borderWidth: 4,
              size: 30,
              color: {
                border: "#222222",
                background: "#666666"
              },
              font: { color: "black" }
            },
            edges: {
              color: "lightgray"
            }
          };
          
          const events = {
            select: function(event) {
              var { nodes, edges } = event;
              console.log("Selected nodes:");
              console.log(nodes);
              console.log("Selected edges:");
              console.log(edges);
            }
          };
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
    return (
    <React.Fragment>
        <button onClick={() => this.fetchData()}>Fetch</button>
        <h1>juniors</h1>
        <ul>

        </ul>
        <h1>Seniors</h1>
        <ul>

        </ul>
        <div className =" container text-center">
            <h1>IGenealogy</h1>
                        

            <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
        </div>
        </React.Fragment>
    )}
    }

export default Tree;