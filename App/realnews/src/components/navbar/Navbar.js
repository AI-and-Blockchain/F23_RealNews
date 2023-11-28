import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./Navbar.css"
import Modal from '../postForm/postForm.js';
import UnverifiedNews from '../unverifiedNews/unverifiedNews.js';
import News from  '../news/News.js'

class Navbar extends Component {
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
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><b>RealNews</b></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/"><a className="nav-link active" aria-current="page" href="#">Home</a></Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <Link to="/fact-checker"><a className="nav-link">Fact Checking</a></Link>
                </li>
              </ul>
            </div>
            <Modal show={this.state.show} handleClose={this.hideModal}>
            </Modal>
            <button className='btn btn-primary' onClick={this.showModal}>Post +</button>
          </div>
        </nav>
        <Routes>
          <Route path="/fact-checker" element={<UnverifiedNews />} />
          <Route path="/" element={<News />} />
        </Routes>
      </Router>
    )
  }
}

export default Navbar