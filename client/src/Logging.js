import React, { Component } from 'react';


class Logging extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: null,
        token: null
      }
      this.loginButton = this.loginButton.bind(this);
      this.callBackendAPI_forLogging = this.callBackendAPI_forLogging.bind(this);
    }
  
    loginButton() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
  
      this.callBackendAPI_forLogging(username, password)
        .then(res => {
          this.setState({ token: res.token });
          this.props.action(this.state.token);
          document.getElementById("closeModelBtn_1").click();
        })
        .catch(err => alert("Incorrect credentials. Please try again."));
    }
  
    callBackendAPI_forLogging = async (username, password) => {
      const response = await fetch('/login', {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    };
  
    render() {
      const buttonhidden = {
        display: 'none'
      }
      return (
        <div className="App" >
          <div class="text-center">
            {this.state.token != null
              ? <a href="" class="btn btn-default btn-rounded mb-4" onClick={() => { this.setState({ token: null }) }}>Logout</a>
              : <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSubscriptionForm">Login</a>
            }
          </div>
  
          <div class="modal fade" id="modalSubscriptionForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">To-Do list Login</h4>
                  <button type="button" id="closeModelBtn_1" class="close_1" data-dismiss="modal" aria-label="Close" style={buttonhidden}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-user prefix grey-text"></i>
                    <input type="text" id="username" class="form-control validate" placeholder="Enter User Name" />
                    <label data-error="wrong" data-success="right" for="form3">User Name</label>
                  </div>
  
                  <div class="md-form mb-4">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input type="email" id="password" class="form-control validate" placeholder="Enter Password" />
                    <label data-error="wrong" data-success="right" for="form2">Password</label>
                  </div>
  
                </div>
  
                <div class="modal-footer d-flex justify-content-center">
                  <button class="btn btn-indigo" onClick={this.loginButton}>Login <i class="fas fa-paper-plane-o ml-1"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Logging;