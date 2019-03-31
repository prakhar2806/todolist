import React, { Component } from 'react';
import Cards from './Cards';
import './App.css';
import CardColumns from 'react-bootstrap/Card'

class Lists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            token: null
        }
        this.callBackendAPI = this.callBackendAPI.bind(this);
        this.cardsHandler = this.cardsHandler.bind(this);
    }

    componentDidMount() {
        console.log("token inside Lists", this.props.value);
        this.callBackendAPI()
            .then(res => {
                this.setState({ data: res });
                this.setState({ token: this.props.value });
                console.log("lists", res);
                console.log("token", this.state.token);
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        var bearer = 'Bearer ' + this.props.value; //token

        const response = await fetch('list/getList', {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'authorization': bearer,
                // 'X-FP-API-KEY': 'iphone',
                'Content-Type': 'application/json'
            }
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    cardsHandler() {
        this.componentDidMount()
    }

    render() {

        let itemLists = this.state.data != null && this.state.token != null ? this.state.data.map(element => {
            return (
                <Cards key={element._id} id={element._id} value={element} token={this.state.token} action={this.cardsHandler}></Cards>
            )
        }) : ""

        return (
            <>
                <CardColumns>
                    {itemLists}
                </CardColumns>
            </>
        );
    }
}

export default Lists;
