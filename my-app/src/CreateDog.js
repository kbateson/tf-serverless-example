import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

const baseUrl = 'https://cax8xrcb2j.execute-api.us-west-2.amazonaws.com/dev';

export default class CreateDog extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", breed: "" }
        this.onSubmit = this.onSubmit.bind(this);
        this.fileInput = React.createRef();
        this.onNameChange = this.onNameChange.bind(this);
        this.onBreedChange = this.onBreedChange.bind(this);
    }

    onNameChange = (e) => {
        const value = e.target.value;
        this.setState({ name: value });
    }

    onBreedChange(e) {
        const value = e.target.value;
        this.setState({ breed: value });
    }

    async onSubmit(event) {
        let file = this.fileInput.current.files[0];
      
        console.log(file);
        let response = await fetch(`${baseUrl}/dogs`,
            {
                method: "POST",
                body: JSON.stringify({ dog: { name: this.state.name, breed: this.state.breed } })
            });
        let resJSON = await response.json();
        console.log("where am i " + JSON.stringify(resJSON));
        try {
            let imgRes = await fetch(resJSON.uploadUrl,
                {
                    method: "PUT",
                    headers: { 'Content-Type': file.type },
                    body: file
                });
            console.log("hello " + JSON.stringify(imgRes));
        } catch (err) {
            console.log("please stop " + err);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <TextField id="name" label="Dog's Name" onChange={this.onNameChange} value={this.state.name} />
                    <TextField id="breed" label="Breed" onChange={this.onBreedChange} />
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
