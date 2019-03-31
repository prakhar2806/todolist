import React, { Component } from 'react';
import Card from './Card';



class Lists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            token: null
        }
        this.callBackendAPI = this.callBackendAPI.bind(this);
    }

    componentDidMount() {
        console.log("token inside Lists", this.props.value);
        this.callBackendAPI()
            .then(res => {
                this.setState({ data: res });
                console.log("lists", res);
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

    render() {

        const headerStyle = {
            padding: '10px 16px',
            background: '#054cbf',
            color: '#f1f1f1'
        }

        return (
            <div className="App">

                <div class="gallery" id="gallery">
                    <div class="mb-3 pics animation all 2">
                        <Card></Card>
                    </div>
                    <div class="mb-3 pics animation all 2">
                        <Card></Card>
                    </div>
                    <div class="mb-3 pics animation all 2">
                        <Card></Card>
                    </div>
                    <div class="mb-3 pics animation all 2">
                        <Card></Card>
                    </div>
                    <div class="mb-3 pics animation all 2">
                        <Card></Card>
                    </div>
                    <div class="mb-3 pics animation all 2">
                        <Card></Card>
                    </div>
                </div>

            </div>
        );
    }
}

export default Lists;
