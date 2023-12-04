

import './factCheckForm.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Web3 from 'web3';

const Modal = ({ handleClose, show, postHash }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [source, setSource] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [account, setAccount] = useState('');
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  const handleSourceChange = event => {
    setSource(event.target.value);
  };

  const handleConclusionChange = event => {
    setConclusion(event.target.value);
  };

  useEffect(() => {
    const fetchPostBody = async () => {
      try {
        const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
        const post = storedPosts.find(p => p.hash === postHash);
        if (post) {
          setTitle(post.title);
          setBody(post.claim);
        }
      } catch (error) {
        console.error('Error fetching post body:', error);
      }
    };

    fetchPostBody();
  }, [postHash]);

  const fetchChatGPTResponse = async () => {
    try {
      const apiKey = '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'; // Replace with your OpenAI API key
      const endpoint = 'https://api.openai.com/v1/chat/completions';
  
      const response = await axios.post(
        endpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": `Fact-check the following claim: ${body}`},
          ],
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      //setChatGPTResponse(response.data.choices[0].message.content);
      //console.log(chatGPTResponse);
      //console.log(response.data.choices[0].message.content);
      //console.log('ChatGPT API Response:', response.data); // Log the entire response
      if (response.data.choices && response.data.choices.length > 0) {
        console.log('ChatGPT Response Text:', response.data.choices[0].message.content);
        setChatGPTResponse(response.data.choices[0].message.content);
      } else {
        console.error('ChatGPT API response is missing "choices" or is empty');
        setChatGPTResponse('An error occurred while generating a response.');
      }
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
      setChatGPTResponse('An error occurred while generating a response.');
    }
  };

  const handlePayment = async () => {
    try {
        if (!window.ethereum) {
            console.error('MetaMask not detected or not connected');
            return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];

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
        const amountToSend = web3.utils.toWei('1', 'ether');

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

    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];

            setAccount(selectedAccount);

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
            post.conclusion = conclusion;
        }
    });
    localStorage.setItem('ipfsPosts', JSON.stringify(storedPosts));
    handleClose();
  };

  const handleChatGPTResponse = () => {
    fetchChatGPTResponse();
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
                  <label htmlFor="bardResponse">Chat GPT's Response to Post:</label>
                  <p id="bardResponse">{chatGPTResponse}</p>
              </div>
              <div className="form-group">
                  <label htmlFor="conclusion">Enter Your Conclusion:</label>
                  <textarea id="conclusion" value={conclusion} onChange={handleConclusionChange}></textarea>
              </div>
              <div className="form-group">
                  <label htmlFor="sources">Enter Your sources as a comma-separated list:</label>
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
              <button type="button" className="btn btn-primary" onClick={handleChatGPTResponse}>Get ChatGPT Response</button>
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


