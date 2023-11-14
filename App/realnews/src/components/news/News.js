import React, { useEffect, useState } from "react";
import "./News.css"

const News = () => {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    let resonse = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=714ef9b8a6ef47d19b4bda6f4f0d100f"
    );
    let data = await resonse.json();
    setMyNews(data.articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h1 className="text-center my-3">Fact Checked Stories</h1>
          <div className="mainDiv">
      {mynews.map((ele) => {
        console.log(ele)
        return (
          <>
        <div class="card" style={{  marginTop:"2rem" , boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{ele.author == "" ? "Janelle Ash" : ele.author}</h5>
                <p class="card-text">
                 {ele.title}
                </p>
                <div class="mt-auto">
                    <div class="row">
                        <div class="col-3">
                            <a href={ele.url} target="_blank" class="btn btn-primary">Source</a>
                        </div>
                        <div class="col-3">
                            <p>Verified</p>
                        </div>
                        <div class="col-3">
                            <button className="btn btn-success">&uarr;</button>
                        </div>
                        <div class="col-3">
                            <button className="btn btn-danger">	&darr;</button>
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