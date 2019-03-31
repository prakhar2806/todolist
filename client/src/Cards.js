import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
        this.deleteNote = this.deleteNote.bind(this);
        this.callBackendAPI = this.callBackendAPI.bind(this);
    }

    deleteNote(id) {
        this.callBackendAPI(id)
            .then(res => {
                // alert("Note Deleted")
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async (id) => {

        var bearer = 'Bearer ' ; //token
        const response = await fetch('/list/delete', {
            method: "post",
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
            //make sure to serialize your JSON body
            body: JSON.stringify({
                id: id,
            })
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


    render() {
        return (
            <Card bg="info" text="white" style={{ width: "30%", float: "left", margin: "1.5%" }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.value.title}</Card.Title>
                    <Card.Text>
                        {this.props.value.description}
                    </Card.Text>
                    <Button variant="light" style={{ margin: "5px" }}>Update</Button>
                    <Button variant="light" style={{ margin: "5px" }} >Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Cards;
