import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UpdateNote from './UpdateNote';

class Cards extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
        this.deleteNote = this.deleteNote.bind(this);
        this.callBackendAPI_delete = this.callBackendAPI_delete.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
    }

    deleteNote(id) {

        this.callBackendAPI_delete(id)
            .then(res => {
                console.log(res);
                alert("Note Deleted");
                this.props.action();
            })
            .catch(err => console.log(err));
    }

    callBackendAPI_delete = async (id) => {

        var bearer = 'Bearer ' + this.props.token; //token
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

    updateHandler() {
        this.props.action();
    }


    render() {
        return (
            <Card bg="info" text="white" style={{ width: "30%", float: "left", margin: "1.5%" }}>
                <Card.Body>
                    <Card.Title>{this.props.value.title}</Card.Title>
                    <Card.Text>
                        {this.props.value.description}
                    </Card.Text>
                    <Card.Text>{this.props.value._id}</Card.Text>
                    <UpdateNote noteId={this.props.value._id} value={this.props.token} style={{ float: "left" }} action={this.updateHandler}></UpdateNote>
                    <Button variant="outline-primary" style={{ margin: "5px" }} onClick={(e) => this.deleteNote(this.props.value._id)}>Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Cards;
