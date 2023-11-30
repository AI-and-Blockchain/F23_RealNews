

import './factCheckForm.css';
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ethers } from "ethers";

const Modal = ({ handleClose, show, postHash }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [source, setSource] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [account, setAccount] = useState('');

  const handleSourceChange = event => {
    setSource(event.target.value);
  };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
    const post = storedPosts.find(p => p.hash === postHash);
    if (post) {
        setTitle(post.title);
        setBody(post.body);
    }
  }, [postHash]);

  const handlePayment = async () => {
    console.log(account)
    // Make a POST request to the backend
    const response = await fetch('http://localhost:5000/get-tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: account,
      }),
    });
    if (response.ok) {
      // If the response is successful, update the UI or do other tasks
      const result = await response.json();
      console.log(result);
    } else {
      // Handle error cases
      console.error('Error');
    }
  }

  const handleFactCheck = async event => {
    alert("Open MetaMask Now")
    event.preventDefault();

    //connect to metamask account
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Get the first account from the array
        const selectedAccount = accounts[0];

        // Update the state with the connected account
        setAccount(selectedAccount);
    }
    
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
    storedPosts.forEach(post => {
        if (post.hash === postHash) {
            post.verified = true;
            post.source = source;
        }
    });
    localStorage.setItem('ipfsPosts', JSON.stringify(storedPosts));
    handleClose();
    //get tokens from server
    await handlePayment();
  };

  
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='container'>
            <form onSubmit={handleFactCheck}>
                <div className="form-group">
                    <h3>{title}</h3>
                </div>
                <div className="form-group">
                    <p>{body}</p>
                </div>
                <div class="form-group">
                       <label for="bardResponse">Google Bard's Response to Post:</label>
                       <p id="bardResponse">Response To Post Here</p>
                   </div>
                   <div class="form-group">
                       <label for="conclusion">Enter Your Conclusion:</label>
                       <textarea id="conclusion"></textarea>
                   </div>
                   <div class="form-group">
                       <label for="sources">Enter Your sources as a comma seperated list:</label>
                       <textarea id="sources" value={source} onChange={handleSourceChange}></textarea>
                  </div>
                   <div class="form-group form-check">
                       <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                       <label class="form-check-label" for="exampleCheck1">Real News</label>
                   </div>
                   <div class="form-group form-check">
                       <input type="checkbox" class="form-check-input" id="exampleCheck2"></input>
                       <label class="form-check-label" for="exampleCheck2">Fake News</label>
                  </div>
                <button type="submit" className='btn btn-primary'>Submit Review</button>
            </form>
        </div>
        <hr />
        <button type="button" className='btn btn-primary' onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default Modal;


