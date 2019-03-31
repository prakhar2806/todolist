import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import Logging from './Logging'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      token: null
    }
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.loggingHandler = this.loggingHandler.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res });
        console.log("res", res);
      })
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    var bearer = 'Bearer '+ this.state.token;

    const response = await fetch('list/getList',{
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          'authorization': bearer,
          // 'X-FP-API-KEY': 'iphone',
          'Content-Type': 'application/json'}
      });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  loggingHandler(dataFromLogging) {
    // log our state before and after we updated it
    // console.log('%cPrevious Parent State: ' + JSON.stringify(this.state), "color:orange");
    console.log("dataFromLogging", dataFromLogging);
    this.setState({
      token: dataFromLogging
    });
    console.log("this.state", this.state.token);
  }

  render() {

    const headerStyle = {
      padding: '10px 16px',
      background: '#054cbf',
      color: '#f1f1f1'
    }

    return (
      <div className="App">
        <div class="header" id="myHeader" style={headerStyle}>
          <h2>To-do List</h2>
          <Logging action={this.loggingHandler} />
        </div>
        {this.state.token != null
          ?
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
          : <h2>Please Login to continue</h2>}
      </div>
    );
  }
}

export default App;
