import './factCheckForm.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='container'>
            <form>
                <div class="form-group">
                    <h3 id="postTitle"> Post Title Here</h3>
                </div>
                <div class="form-group">
                    <p id="postBody">Post Body Here</p>
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
                    <textarea id="sources"></textarea>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                    <label class="form-check-label" for="exampleCheck1">Real News</label>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck2"></input>
                    <label class="form-check-label" for="exampleCheck2">Fake News</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit Review</button>
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