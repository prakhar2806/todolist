import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
        //   this.callBackendAPI = this.callBackendAPI.bind(this);
    }

    // componentDidMount() {
    //   this.callBackendAPI()
    //     .then(res => {
    //       this.setState({ data: res.express });
    //     })
    //     .catch(err => console.log(err));
    // }

    // callBackendAPI = async () => {
    //   const response = await fetch('express_backend');
    //   const body = await response.json();

    //   if (response.status !== 200) {
    //     throw Error(body.message)
    //   }
    //   return body;
    // };


    render() {
        return (
            <div className="Card">
                
                <div class="card card-image" >

                    <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                        <div>
                            <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Marketing</h5>
                            <h3 class="card-title pt-2"><strong>This is card title</strong></h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                                optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos.
                                Odit sed qui, dolorum!.</p>
                            <a class="btn btn-pink"><i class="fas fa-clone left"></i> View project</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
