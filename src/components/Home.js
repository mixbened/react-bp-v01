import React, { Component } from 'react';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            someValue: ''
        }
    }



    render(){
        return (
            <div>
                <h1>This is the Home Component</h1>
            </div>
        )
    }
}
