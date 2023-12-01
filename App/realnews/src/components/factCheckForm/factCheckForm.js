


import './factCheckForm.css';
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ethers } from "ethers";
import Web3 from 'web3';

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
    try {
        if (!window.ethereum) {
            console.error('MetaMask not detected or not connected');
            return;
        }

        // Connect to MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];

        // Create a Web3 instance
        const web3 = new Web3(window.ethereum);

        const tokenAddress = '0x731c133d9bc780daB8F3f78E0660BA165064A8EF'; 

        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "rewardUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];


        const tokenContract = new web3.eth.Contract(contractABI, tokenAddress);

        // Adjust the amount to send (in this example, 1 token)
        const amountToSend = web3.utils.toWei('1', 'ether');

        // Call the rewardUser function to send tokens to the selected account
        await tokenContract.methods
            .rewardUser(selectedAccount, amountToSend)
            .send({ from: selectedAccount });

        console.log('Tokens sent successfully');
    } catch (error) {
        console.error('Error sending tokens:', error);
    }
  };

  const handleFactCheck = async event => {
    alert("Open MetaMask Now")
    event.preventDefault();

    // Connect to MetaMask account
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Get the first account from the array
            const selectedAccount = accounts[0];

            // Update the state with the connected account
            setAccount(selectedAccount);

            // Call handlePayment after the account is set
            await handlePayment();
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
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
                <div className="form-group">
                    <label htmlFor="bardResponse">Google Bard's Response to Post:</label>
                    <p id="bardResponse">Response To Post Here</p>
                </div>
                <div className="form-group">
                    <label htmlFor="conclusion">Enter Your Conclusion:</label>
                    <textarea id="conclusion"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="sources">Enter Your sources as a comma separated list:</label>
                    <textarea id="sources" value={source} onChange={handleSourceChange}></textarea>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Real News</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                    <label className="form-check-label" htmlFor="exampleCheck2">Fake News</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
        <hr />
        <button type="button" className="btn btn-primary" onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default Modal;
