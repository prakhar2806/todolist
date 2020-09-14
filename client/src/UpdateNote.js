import React from 'react';
import './App.css'

class UpdateNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            token: null
        }
        this.update = this.update.bind(this);
        this.callBackendAPI_UpdateNote = this.callBackendAPI_UpdateNote.bind(this);
    }

    update() {
        let title = document.getElementById("updatetitle").value;
        let desc = document.getElementById("updatedescription").value;

        this.callBackendAPI_UpdateNote(title, desc)
            .then(res => {
                console.log("Note updated", res);
                document.getElementById("closeModelBtn_3").click();
                console.log("Note Added Successfully.Please refresh to update !");
                this.props.action();
            })
            .catch(err => console.log("Incorrect credentials. Please try again.", err));
    }

    callBackendAPI_UpdateNote = async (title, desc) => {

        var bearer = 'Bearer ' + this.props.value;
        var id = this.props.noteId;
        const response = await fetch('/list/update', {
            method: "post",
            withCredentials: true,
            credentials: 'include',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                title: title,
                description: desc,
                id: id,
                email:this.props.cardObj.email
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
            <div className="App" className='inlineBlock' >
                <div className="text-center">
                    <a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSubscriptionForm_2">Update</a>
                </div>

                <div className="modal fade" id="modalSubscriptionForm_2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Update Note</h4>
                                <button type="button" id="closeModelBtn_3" className="close_1" data-dismiss="modal" aria-label="Close" style={buttonhidden}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <i className="fas fa-user prefix grey-text"></i>
                                    <label htmlFor="updatetitle" >Title</label>
                                    <input type="text" id="updatetitle" className="form-control validate" placeholder="Enter Title" defaultValue={this.props.cardObj.title} />
                                </div>

                                <div className="form-group md-form mb-4">
                                    <i className="fas fa-envelope prefix grey-text"></i>
                                    <label htmlFor="updatedescription" >Description</label>
                                    <textarea className="form-control" id="updatedescription" rows="7" placeholder="Enter Description" defaultValue={this.props.cardObj.desc}></textarea>
                                </div>
                            </div>

                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-indigo" onClick={this.update}>Save Changes <i className="fas fa-paper-plane-o ml-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateNote;