import React, {Component} from 'react'
import Graph from "react-graph-vis";

class Tree extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
        this.fetchData = this.fetchData.bind(this)
        
    };
    updateData(id) {
        const { fetchLineage } = this.props;
        fetchLineage(id);

    }
    fetchData = (id) => {
        console.log("FD called on " + id)
         //id = "9291b16a-fa11-4b0b-9c05-fbb3d0546b8c"
         
        const { fetchLineage } = this.props;
        fetchLineage(id);
    };
    componentDidMount(){
        this.fetchData("90a9b490-af53-46a3-9b83-fcc3c9ddb6b2");
      }

    getNodes(userArray){
        const nodes = userArray.map(x => ({ id: x.node.id, shape: "circularImage", image: "/assets/images/404castelltort.png", label: x.node.firstname }))
        return nodes
    }
    getEdges(userArray,isJunior){
        let edges = [];
        for(let i=0;i<userArray.length;i++){
          
            let iDistance = userArray[i].distance
            let iPlusOne = userArray.filter(x => x.distance === iDistance +1)
           
            if(isJunior){
                for(let j =0; j < iPlusOne.length; j++) {
                
                    edges.push({from: iPlusOne[j].node.id, to:   userArray[i].node.id,value: 2, color: { color: "lightgray" }})
                }
                
            }else {
               
                for(let j =0; j < iPlusOne.length; j++) {
                
                    edges.push({from: userArray[i].node.id, to: iPlusOne[j].node.id ,value: 2, color: { color: "lightgray" }})
                }
                
            }

            
           
            
        }
       
        

        return edges

    }
  
    
    render() {
        
        const userNode = {distance : 0, 
            node :
             {
                id : this.props.userFocus.id,
                shape: "circularImage",
                image: "/assets/images/404castelltort.png",
                label: this.props.userFocus.firstname }}

        const juniorsNodes = this.getNodes(this.props.juniors).sort((a,b) => a.distance - b.distance)
        const seniorsNodes = this.getNodes(this.props.seniors).sort((a,b) => a.distance - b.distance)
        const nodesFetched = seniorsNodes.concat(juniorsNodes).concat()

        
        console.log(this.props.juniors.concat([userNode]))
        const juniorsEdges = this.getEdges(this.props.juniors.concat([userNode]),true)
        const seniorsEdges = this.getEdges(this.props.seniors.concat([userNode]),false)
        const edgesFetched = juniorsEdges.concat(seniorsEdges)
        // TODO recup  user focus

        const graph = {
            nodes : nodesFetched ,
            
              edges : edgesFetched               
          };
          
      
          
          
          console.log(this.props.userFocus.id)
       
          graph.nodes.push({id : this.props.userFocus.id,shape: "circularImage", image: "/assets/images/404castelltort.png", label: this.props.userFocus.firstname })
        

        
        
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

              var { nodes, edges } = event;
              console.log("Selected nodes:");
              console.log(nodes);
               
              console.log("Selected edges:");
              console.log(edges);
              
              
            },
            click : (event) => this.fetchData(event.nodes[0])
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
            
            <div className =" container text-center tree-container">
                
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