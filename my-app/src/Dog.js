import React, { Component } from 'react'

export default class Dog extends Component {
    render() {
        return (
            <span>
                <p>[ img here ]</p>
                <p>{this.props.name}</p>
                <p>{this.props.breed}</p>
            </span>
        )
    }
}
