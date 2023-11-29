import React, { Component } from "react";
import axios from "axios";
import Modal from '../factCheckForm/factCheckForm.js';

class UnverifiedNews extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            posts: [], // Add a state variable to store the fetched posts
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        // Fetch posts from IPFS when the component mounts
        this.fetchPostsFromIPFS();
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    // Function to fetch posts from IPFS
    fetchPostsFromIPFS = async () => {
        try {
            const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
            var unverified = [];
            for (var i = 0; i < storedPosts.length; i++) {
                if (storedPosts[i].verified == false) {
                    unverified.push(storedPosts[i])
                }
            }
            const fetchedPosts = await Promise.all(unverified.map(async (post) => {
                const url = `https://amber-eligible-bear-775.mypinata.cloud/ipfs/${post.hash}`;
                const response = await axios.get(url);
                console.log('Fetched post data:', response.data);
                return { ...response.data, title: post.title };
            }));

            console.log('All fetched posts:', fetchedPosts);
            this.setState({ posts: fetchedPosts }); // Update the state with fetched posts
        } catch (error) {
            console.error('Error fetching posts from IPFS:', error);
            // Handle error here
        }
    };

    render() {
        const { posts, show } = this.state; // Destructure posts and show from state

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
                                    <Modal show={show} handleClose={this.hideModal}></Modal>
                                    <div className="row">
                                        <a onClick={this.showModal} className="btn btn-primary">Fact Check This Story</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

export default UnverifiedNews;
