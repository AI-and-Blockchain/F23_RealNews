import React, { useState } from 'react';
import axios from 'axios';
import './postForm.css';

// const saveHash = (postTitle, hash) => {
//   const existingPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
//   const newPost = { title: postTitle, hash: hash, verified: false, upvotes: 0, downvotes: 0, aiResponse:"", source:""};
//   existingPosts.push(newPost);
//   localStorage.setItem('ipfsPosts', JSON.stringify(existingPosts));
// };
const saveHash = (postTitle, hash, claim) => {
  const existingPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
  const newPost = {
    title: postTitle,
    hash: hash,
    verified: false,
    upvotes: 0,
    downvotes: 0,
    aiResponse: "",
    source: "",
    claim: claim, // Include the claim field
  };
  existingPosts.push(newPost);
  localStorage.setItem('ipfsPosts', JSON.stringify(existingPosts));
};


const Modal = ({ handleClose, show }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const pinJSONToIPFS = async (jsonData) => {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NThjMzMzZi1kNWY3LTQ5NjktYjBkYS0yYzZjMWZhOWM3NGIiLCJlbWFpbCI6ImF5dXNoa3Jpc2huYXBwYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjJmMTY4ZDA3MGQ4YTk1NzUxYzIiLCJzY29wZWRLZXlTZWNyZXQiOiIwYTQxY2I5NjhlMDdjZDQ1NjJkZDIyM2E4ZTg5MGFlZDhjYmEzYTRhZjBlMjJjMTBhZmY4ZmUzNDc3NTRkNTI5IiwiaWF0IjoxNzAxMTQ4MzY0fQ._AHNN0BzX5RVEuwJJQMS-fC787wsGvrqbK9vaGCL8Lc'; // Replace with your JWT token

    try {
      const response = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWT}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postTitle || !postBody) {
      alert('Please enter both title and body for the post.');
      return;
    }

    console.log("Form submission started");
    const post = { title: postTitle, body: postBody};

    try {
      const result = await pinJSONToIPFS(post);
      if (result && result.IpfsHash) {
        console.log('Stored on IPFS with hash:', result.IpfsHash);
        saveHash(postTitle, result.IpfsHash, postBody);
        setPostTitle('');
        setPostBody('');
        handleClose();
      } else {
        alert('Failed to get a valid response from IPFS.');
      }
    } catch (error) {
      console.error('Error uploading post to IPFS:', error);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="postTitle">Post Title</label>
              <input type="text" className="form-control" id="postTitle" placeholder="Post Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="postBody">Post Body</label>
              <input type="text" className="form-control" id="postBody" placeholder="Post Body" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Post</button>
          </form>
        </div>
        <hr />
        <button type="button" className='btn btn-primary' onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;




