

import React, { Component } from "react";
import axios from "axios";
import Modal from '../factCheckForm/factCheckForm.js';

class UnverifiedNews extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            currentHash: '',
            posts: [],
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        this.fetchPostsFromIPFS();
    }

    showModal(hash) {
        this.setState({ 
            showModal: true,
            currentHash: hash
        });
    }

    hideModal() {
        this.setState({ showModal: false });
    }

    async fetchPostsFromIPFS() {
        try {
            const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
            let unverified = storedPosts.filter(post => !post.verified);
            const fetchedPosts = await Promise.all(unverified.map(async (post) => {
                const url = `https://amber-eligible-bear-775.mypinata.cloud/ipfs/${post.hash}`;
                const response = await axios.get(url);
                return { ...response.data, hash: post.hash, title: post.title };
            }));
            this.setState({ posts: fetchedPosts });
        } catch (error) {
            console.error('Error fetching posts from IPFS:', error);
        }
    }

    render() {
        const { posts, showModal, currentHash } = this.state;

        return (
            <>
                <h1 className="text-center my-3">Unverified Stories</h1>
                <div className="mainDiv">
                    {posts.map((post, index) => (
                        <div key={index} className="card" style={{ marginTop: "2rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <div className="mt-auto">
                                    <button onClick={() => this.showModal(post.hash)} className="btn btn-primary">Fact Check This Story</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Modal show={showModal} handleClose={this.hideModal} postHash={currentHash} />
                </div>
            </>
        )
    }
}

export default UnverifiedNews;

