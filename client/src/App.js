import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
    this.callBackendAPI = this.callBackendAPI.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('list/getList');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  render() {

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

export default App;
