import React, { Component } from 'react'
import Graph from "react-graph-vis";
import history from '../common/history'
import { Form, Button, Row, Col } from 'react-bootstrap';


class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.fetchData = this.fetchData.bind(this)

    };

    fetchData = (id) => {
        const { fetchLineage } = this.props;
        fetchLineage(id);
    };

    componentDidMount() {
        this.fetchData("9291b16a-fa11-4b0b-9c05-fbb3d0546b8c");
    };

    getNodes(userArray) {
        return userArray.map(x => ({ id: x.node.id, shape: "circularImage", image: "/assets/images/404castelltort.png", label: x.node.firstname }))
    };

    getEdges(userArray, isJunior) {
        let edges = [];
        for (let i = 0; i < userArray.length; i++) {
            let iDistance = userArray[i].distance
            let iPlusOne = userArray.filter(x => x.distance === iDistance + 1)
            if (isJunior) {
                for (let j = 0; j < iPlusOne.length; j++) {
                    edges.push({ from: iPlusOne[j].node.id, to: userArray[i].node.id, value: 2, color: { color: "lightgray" } })
                }
            } else {
                for (let j = 0; j < iPlusOne.length; j++) {
                    edges.push({ from: userArray[i].node.id, to: iPlusOne[j].node.id, value: 2, color: { color: "lightgray" } })
                }
            }
        }
        return edges
    };

    goToInvitation() {
        history.push('/invitation')
    };

    render() {
        const userNode = {
            distance: 0,
            node:
            {
                id: this.props.userFocus.id,
                shape: "circularImage",
                image: "/assets/images/404castelltort.png",
                label: this.props.userFocus.firstname
            }
        }

        const juniorsNodes = this.getNodes(this.props.juniors).sort((a, b) => a.distance - b.distance)
        const seniorsNodes = this.getNodes(this.props.seniors).sort((a, b) => a.distance - b.distance)
        const nodesFetched = seniorsNodes.concat(juniorsNodes).concat()

        const juniorsEdges = this.getEdges(this.props.juniors.concat([userNode]), true)
        const seniorsEdges = this.getEdges(this.props.seniors.concat([userNode]), false)
        const edgesFetched = juniorsEdges.concat(seniorsEdges)
        // TODO recup  user focus
        const graph = {
            nodes: nodesFetched,
            edges: edgesFetched
        };

        graph.nodes.push({ id: this.props.userFocus.id, shape: "circularImage", image: "/assets/images/404castelltort.png", label: this.props.userFocus.firstname })

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
            click: (event) => this.fetchData(event.nodes[0])
        };

        return (
                <div className="container text-center tree-container">
                    <div className="row">
                        <div className="col-8 col-sm-8 col-md-8">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Nom</span>
                                </div>
                                <input type="text" className="form-control" placeholder="Rechercher une personne" aria-label="Username" aria-describedby="basic-addon1"></input>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Promo</span>
                                </div>
                                <input type="text" className="form-control" placeholder="Année diplomante" aria-label="Username" aria-describedby="basic-addon1"></input>
                            </div>
                        </div>
                        <div className="col-4 col-sm-4 col-md-4">
                            <button type="button" className="btn bg-dark rounded find-btn"><img src="/assets/images/recruitment.svg" className="img-fluid" alt="" /></button>
                        </div>
                    </div>

                    <Graph graph={graph} options={options} events={events} style={{ height: "90%", display: "block" }} />
                    <div className="row mt-2">
                        <div className=" col-6 col-sm-6 col-md-6">
                            <Button variant="success" onClick={() => history.push('/invitation')} >
                                <div className="inside-btn row">
                                    <div className="col-6 col-sm-6 col-md-6"><img src="/assets/images/add.svg" className="image-btn" alt="" /></div>
                                    <div className="col-6 col-sm-6 col-md-6"><img src="/assets/images/student.svg" className="image-btn" alt="" /></div>
                                </div>
                            </Button>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6">
                            <Button variant="success">
                                <div className="inside-btn row">
                                    <div className="col-6 col-sm-6 col-md-6"><img src="/assets/images/add.svg" className="image-btn" alt="" /></div>
                                    <div className="col-6 col-sm-6 col-md-6"><img src="/assets/images/relationship.svg" className="image-btn" alt="" /></div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Tree;