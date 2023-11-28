import React, { useEffect, useState, Component } from "react";
import "./unverifiedNews.css"
import Modal from '../factCheckForm/factCheckForm.js';

class UnverifiedNews extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    
  render() {
  return (
    <>
    <h1 className="text-center my-3">Unverified Stories</h1>
        <div className="mainDiv">
      
        <div class="card" style={{  marginTop:"2rem" , boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">Post Title</h5>
                <p class="card-text">
                    Post Body 
                </p>
                <div class="mt-auto">
                    <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
                    <div class="row">
                        <a onClick={this.showModal} class="btn btn-primary">Fact Check This Story</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
 }
}

export default UnverifiedNews;