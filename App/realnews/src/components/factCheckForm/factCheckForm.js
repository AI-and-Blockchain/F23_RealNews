import './factCheckForm.css';
import React, { useEffect, useState } from "react";



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [source, setSource] = useState('');
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSourceChange = event => {
    // 👇️ access textarea value
    setSource(event.target.value);
  };

  const loadInformation = () => {
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts'))
    const post = storedPosts[0]
    setTitle(post.title)
    setBody(post.body)
  }

  useEffect(() => {
    loadInformation();
  }, []);

  
  const handleFactCheck = () =>{
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts'))
    var new_posts = []
    const post = storedPosts[0]
    post.verified = true
    post.source = source
    console.log(post)
    new_posts.push(post)
    localStorage.setItem('ipfsPosts', JSON.stringify(new_posts));
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='container'>
            <form>
                <div class="form-group">
                    <h3 id="postTitle"> {title}</h3>
                </div>
                <div class="form-group">
                    <p id="postBody">{body}</p>
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
                <button type="submit" className='btn btn-primary' onClick={handleFactCheck()}>Submit Review</button>
            </form>
        </div>
        {children}
        <hr></hr>
        <button type="button" className='btn btn-primary' onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;

