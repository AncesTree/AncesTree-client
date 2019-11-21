import React, {Component} from 'react';
import {AiTwotoneLike} from 'react-icons/all'
export default class EventListItem extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-header">{this.props.title}</div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.date}</h5>
                    <p className="card-text">{this.props.content}</p>
                    <p><a href={this.props.link}>{this.props.link}</a></p>
                    
                    <a className="btn btn-primary"><AiTwotoneLike style={{color: "white"}}/></a>

                </div>
            </div>
        );
    }
}
