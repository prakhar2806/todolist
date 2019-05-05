import React from 'react';
import { connect } from 'react-redux';

class AddNewNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            token: null
        }
        this.saveNote = this.saveNote.bind(this);
        this.callBackendAPI_forNoteAdd = this.callBackendAPI_forNoteAdd.bind(this);
    }

    saveNote() {
        let title = document.getElementById("title").value;
        let desc = document.getElementById("description").value;
        let email = this.props.email;
        console.log(email);

        this.callBackendAPI_forNoteAdd(title, desc, email)
            .then(res => {
                console.log("Note Added", res);
                //dispatch 
                let _id = res;
                this.props.saveNote(_id, title, desc, email);
                document.getElementById("closeModelBtn_2").click();
                // alert("Note Added Successfully.Please refresh to update !");
            })
            .catch(err => console.log("Incorrect credentials. Please try again.", err));
    }

    callBackendAPI_forNoteAdd = async (title, desc, email) => {

        var bearer = 'Bearer ' + this.props.value;
        const response = await fetch('/list/create', {
            method: "post",
            withCredentials: true,
            credentials: 'include',
            headers: {
                'authorization': bearer,
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                title: title,
                description: desc,
                email: email
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
                <div className="text-center">

                    <a className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSubscriptionForm_1" style={{ width: "40%", margin: "10px" }}>Add New Note</a>

                </div>

                <div className="modal fade" id="modalSubscriptionForm_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Add a new Note</h4>
                                <button type="button" id="closeModelBtn_2" className="close_1" data-dismiss="modal" aria-label="Close" style={buttonhidden}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <i className="fas fa-user prefix grey-text"></i>
                                    <label for="title" >Title</label>
                                    <input type="text" id="title" className="form-control validate" placeholder="Enter Title" />
                                </div>

                                <div class="form-group md-form mb-4">
                                    <i className="fas fa-envelope prefix grey-text"></i>
                                    <label for="description" >Description</label>
                                    <textarea class="form-control" id="description" rows="7" placeholder="Enter Description"></textarea>
                                </div>
                            </div>

                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-indigo" onClick={this.saveNote}>Save <i className="fas fa-paper-plane-o ml-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveNote: (_id, title, desc, email) => dispatch({ type: "SAVE_NOTE", value: { _id: _id, title: title, description: desc, email: email } })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewNote);