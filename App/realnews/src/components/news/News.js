

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css"

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const fetchPostsFromIPFS = async () => {
    try {
      const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts')) || [];
      var unverified = [];
      for (var i = 0; i < storedPosts.length; i++) {
        if (storedPosts[i].verified == true) {
          unverified.push(storedPosts[i])
        }
      }
      const fetchedPosts = await Promise.all(unverified.map(async (post) => {
        const url = `https://amber-eligible-bear-775.mypinata.cloud/ipfs/${post.hash}`;
        const response = await axios.get(url);
        console.log('Fetched post data:', response.data);
        return { ...response.data, title: post.title, source: post.source, upvotes: post.upvotes, downvotes: post.downvotes, conclusion: post.conclusion };
      }));

      console.log('All fetched posts:', fetchedPosts);
      setMyNews(fetchedPosts)
    } catch (error) {
      console.error('Error fetching posts from IPFS:', error);
    }
  };

  const upvote = (postIndex) => {
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts'));
    const new_posts = [...storedPosts];
    new_posts[postIndex].upvotes += 1;
    localStorage.setItem('ipfsPosts', JSON.stringify(new_posts));
    fetchPostsFromIPFS(); // Refresh the component to reflect the changes
  };

  const downvote = (postIndex) => {
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts'));
    const new_posts = [...storedPosts];
    new_posts[postIndex].downvotes += 1;
    localStorage.setItem('ipfsPosts', JSON.stringify(new_posts));
    fetchPostsFromIPFS(); // Refresh the component to reflect the changes
  };

  const [showConclsuion, setShowConclusion] = React.useState(false)
  const onShowConclusion = () => {
    if (showConclsuion) {
      setShowConclusion(false)
    }
    else {
      setShowConclusion(true)
    }
  }

  useEffect(() => {
    fetchPostsFromIPFS();
  }, []);

  return (
    <>
      <h1 className="text-center my-3">Fact Checked Stories</h1>
      <div className="mainDiv">
        {mynews.map((ele, index) => {
          console.log("Element:", ele)
          return (
            <>
              <div className="card" style={{ marginTop: "2rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ele.title}</h5>
                  <p className="card-text">
                    {ele.body}
                  </p>
                  <div className="mt-auto">
                    <div className="row">
                      <div className="col-3">
                        <a href={ele.source} className="btn btn-primary">Source</a>
                      </div>
                      <div className="col-4">
                      <button className='btn btn-primary' onClick={onShowConclusion}>See Review</button> 
                      </div>
                      <div className="col-2">
                        <button type="submit" onClick={() => upvote(index)} className="btn btn-success">&uarr;</button>
                        <p>{ele.upvotes}</p>
                      </div>
                      <div className="col-2">
                        <button type="submit" onClick={() => downvote(index)} className="btn btn-danger">	&darr;</button>
                        <p>{ele.downvotes}</p>
                      </div>
                      { showConclsuion ? ele.conclusion : null }
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default News;
