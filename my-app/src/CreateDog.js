import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

export default class CreateDog extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    onSubmit(event) {
        console.log(this.fileInput.current.files[0]);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <TextField id="name" label="Dog's Name" />
                    <TextField id="breed" label="Breed" />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        ref={this.fileInput}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                            Choose Image
                        </Button>
                    </label>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}
