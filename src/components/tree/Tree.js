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
    componentDidMount(){
        this.fetchData();
      }
    render() {
        
        const nodesFetched = this.props.seniors.map(x => ({ id: x.node.id, shape: "circularImage", image: "/assets/images/404castelltort.png", label: x.node.firstname }))
        // TODO recup juniors et user focus

        // TODO recup links
        
        console.log(this.props.seniors)
        console.log(nodesFetched)
        

        
       // HARD DATA TREE VIZ
       
        
        const graph = {
            nodes : nodesFetched ,
            
              edges : [{from: 1, to: 2 ,value: 2, color: { color: "lightgray" }},
              {from: 2, to: 3 ,value: 2, color: { color: "lightgray" }},
              {from: 3, to: 1 ,value: 2, color: { color: "lightgray" }}]                 
          };
          graph.nodes.push(
              { id: 4, shape: "circularImage", image: "/assets/images/thibaut.png", label: "thibaut" },{ id: 5, shape: "circularImage", image: "/assets/images/thibaut.png", label: "thibaut" })
            
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
              color: "blue"
            }
          };
          
          const events = {
            select: function(event) {
                // TODO change this funtion to call API on the node clicked
              var { nodes, edges } = event;
              console.log("Selected nodes:");
              console.log(nodes);
              console.log("Selected edges:");
              console.log(edges);
            }
          };

          // HARD DATA END


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
            {/*<button onClick={() => this.fetchData()}>Fetch</button>
             <h1>juniors</h1>
            <ul>

            </ul>
            <h1>Seniors</h1>
            <ul>

            </ul> */}
            

            <div className =" container text-center tree-container">
            <button onClick={() => this.fetchData()}>Fetch</button>
                
                <div className = "row">
                    <div className = "col-8 col-sm-8 col-md-8">
                        <div className="input-group ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Username </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Arnaud Castelltort" aria-label="Username" aria-describedby="basic-addon1"></input>

                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Promotion</span>
                                </div>
                                <input type="text" className="form-control" placeholder="2020" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>
                    <div className = "col-4 col-sm-4 col-md-4">
                        <button type="button" className="btn bg-dark rounded find-btn"><img src="/assets/images/recruitment.svg" className = "img-fluid" alt="" /></button>
                    </div>
                </div>
                
                <Graph graph={graph} options={options} events={events}  style={{ height: "80%", display: "flex" }} />
                <div className = "row mt-2">
                    <div className = " col-6 col-sm-6 col-md-6">
                    <button type="button" className="btn bg-success rounded add-btn">
                        <div className = "row">
                        <div className = "col-6 col-sm-6 col-md-6"><img src="/assets/images/add.svg" className = "img-fluid" alt="" /></div>
                        <div className = "col"><img src="/assets/images/student.svg" className = "img-fluid" alt="" /></div>

                        </div>
                        
                            
                        </button>
                    </div>
                    
                    <div className = " col-6 col-sm-6 col-md-6">
                       
                        <button type="button" className="btn bg-success rounded add-btn">
                        <div className = "row">
                        <div className = "col-6 col-sm-6 col-md-6"><img src="/assets/images/add.svg" className = "img-fluid" alt="" /></div>
                        <div className = "col"><img src="/assets/images/relationship.svg" className = "img-fluid" alt="" /></div>

                        </div>
                        
                            
                        </button>
                    </div>

                </div>

               
            </div>
            
            </React.Fragment>
        )}
        }

export default Tree;