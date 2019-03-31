import React from 'react';

class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,

        }
        this.AddUser = this.AddUser.bind(this);
        this.callBackendAPI_forNewUser = this.callBackendAPI_forNewUser.bind(this);
    }

    AddUser() {
        let Username = document.getElementById("user_name").value;
        let Password = document.getElementById("pass_word").value;
        let Emailid = document.getElementById("email_id").value;

        this.callBackendAPI_forNewUser(Username, Password, Emailid)
            .then(res => {
                console.log("User Added", res);
                alert("user Added");
                window.location.href="/";
            })
            .catch(err => console.log("Incorrect credentials. Please try again.", err));
    }

    callBackendAPI_forNewUser = async (Username, Password, Emailid) => {

        const response = await fetch('/login/adduser', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                username: Username,
                password: Password,
                emailid: Emailid
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
            <div className="App" style={{width:"50%", margin:"auto",paddingTop:"20px" }}>

                <div className="md-form mb-5">
                    <i className="fas fa-user prefix grey-text"></i>
                    <label for="username" >User Name</label>
                    <input type="text" id="user_name" className="form-control validate" placeholder="Enter username" />
                </div>

                <div class="form-group md-form mb-4">
                    <i className="fas fa-envelope prefix grey-text"></i>
                    <label for="emailid" >Emailid</label>
                    <input type="text" id="email_id" className="form-control validate" placeholder="Enter Emailid...abc@xyz.com" />
                </div>

                <div class="form-group md-form mb-4">
                    <i className="fas fa-envelope prefix grey-text"></i>
                    <label for="password" >Password</label>
                    <input type="password" id="pass_word" className="form-control validate" placeholder="Enter Password" />
                </div>

                <div className="modal-footer d-flex justify-content-center">
                    <button className="btn btn-indigo" onClick={this.AddUser}>Add User <i className="fas fa-paper-plane-o ml-1"></i></button>
                </div>

            </div >

        )
    }
}

export default NewUser;