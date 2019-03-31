import React from 'react';

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

        this.callBackendAPI_forNoteAdd(title, desc)
            .then(res => {
                console.log("Note Added", res); 
                document.getElementById("closeModelBtn_2").click();
            })
            .catch(err => console.log("Incorrect credentials. Please try again.", err));
    }

    callBackendAPI_forNoteAdd = async (title, desc) => {

        var bearer = 'Bearer ' +this.props.value;
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
                description: desc
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

                    <a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSubscriptionForm_1">Add New Note</a>

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
                                    <label data-error="wrong" data-success="right" htmlFor="form3">Title</label>
                                    <input type="text" id="title" className="form-control validate" placeholder="Enter Title" />
                                </div>

                                <div class="form-group md-form mb-4">
                                    <i className="fas fa-envelope prefix grey-text"></i>
                                    <label for="description" >Rounded corners</label>
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

export default AddNewNote;