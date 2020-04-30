import React, { Component } from 'react'
import Dog from './Dog.js';

export default class Dogs extends Component {
    render() {
        console.log(this.props.dogs);
        if(this.props.dogs.length > 0)
        return (
            <div>
                {this.props.dogs.map(dog =>
                    <Dog name={dog.name} breed={dog.breed} />
                )}
            </div>
        );
        else return (
            <div>No dogs found.</div>
        )
    }
}
