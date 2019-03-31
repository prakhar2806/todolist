import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import Logging from './Logging'
import Lists from './Lists'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      token: null
    }
    this.loggingHandler = this.loggingHandler.bind(this);
  }

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

    let todolistItems = this.state.token != null ? <Lists value={this.state.token}></Lists> : <h2>Please Login to continue</h2>

    return (
      <div className="App">
        <div class="header" id="myHeader" style={headerStyle}>
          <h2>To-do List</h2>
          <Logging action={this.loggingHandler} />
        </div>
        {todolistItems}
      </div>
    );
  }
}

export default App;
