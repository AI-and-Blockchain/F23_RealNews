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
            return { ...response.data, title: post.title, source: post.source, upvotes: post.upvotes, downvotes: post.downvotes };
        }));

        console.log('All fetched posts:', fetchedPosts);
        //this.setState({ posts: fetchedPosts }); // Update the state with fetched posts
        setMyNews(fetchedPosts)
    } catch (error) {
        console.error('Error fetching posts from IPFS:', error);
        // Handle error here
    }
};

  const upvote =  () => {
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts'))
    var new_posts = []
    const post = storedPosts[0]
    post.upvotes += 1
    new_posts.push(post)
    localStorage.setItem('ipfsPosts', JSON.stringify(new_posts));
    window.location.reload();
  };

  const downvote =  () => {
    const storedPosts = JSON.parse(localStorage.getItem('ipfsPosts'))
    var new_posts = []
    const post = storedPosts[0]
    post.downvotes += 1
    new_posts.push(post)
    localStorage.setItem('ipfsPosts', JSON.stringify(new_posts));
    window.location.reload();
  };

  useEffect(() => {
    fetchPostsFromIPFS();
  }, []);

  return (
    <>
    <h1 className="text-center my-3">Fact Checked Stories</h1>
          <div className="mainDiv">
      {mynews.map((ele) => {
        console.log("Element:", ele)
        return (
          <>
        <div class="card" style={{  marginTop:"2rem" , boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{ele.title}</h5>
                <p class="card-text">
                 {ele.body}
                </p>
                <div class="mt-auto">
                    <div class="row">
                        <div class="col-3">
                            <a href={ele.source} class="btn btn-primary">Source</a>
                        </div>
                        <div class="col-3">
                            <p>Verified</p>
                        </div>
                          <div class="col-3">
                              <button type="submit" onClick={upvote} className="btn btn-success">&uarr;</button>
                              <p>{ele.upvotes}</p>
                          </div>
                          <div class="col-3">
                              <button type="submit" onClick={downvote} className="btn btn-danger">	&darr;</button>
                              <p>{ele.downvotes}</p>
                          </div>
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