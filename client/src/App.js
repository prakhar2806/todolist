import React, { Component } from 'react';
import './App.css';
import NewUser from './NewUser';
import Logging from './Logging';
import Lists from './Lists';
import AddNewNote from './AddNewNote';




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

    let todolistItems = this.state.token != null ? <Lists value={this.state.token}></Lists> : <h2>Please Login/SignUp to continue</h2>
    let newNote = this.state.token != null ? <AddNewNote value={this.state.token}></AddNewNote> : ""
    let login = this.state.token == null ? <NewUser></NewUser> : ""
    return (
      <div className="App">
        <div className="header" id="myHeader" style={headerStyle}>
          <h2>To-do List</h2>
          <Logging action={this.loggingHandler} />
        </div>
        {login}
        {newNote}
        {todolistItems}
      </div>
    );
  }
}

export default App;
