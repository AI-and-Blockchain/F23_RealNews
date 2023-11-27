import './postForm.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='container'>
            <form>
                <div class="form-group">
                    <label for="postTitle">Post Title</label>
                    <input type="text" class="form-control" id='postTitle' placeholder="Post Title"></input>
                </div>
                <div class="form-group">
                    <label for="postBody">Post Body</label>
                    <input type="text" class="form-control" id="postBody" placeholder="Post Body"></input>
                </div>
                <button type="submit" class="btn btn-primary">Post</button>
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