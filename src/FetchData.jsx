import React, { useState, useEffect } from "react";
import axios from "axios";
import './FetchData.css'


const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;
    // const api_url = "https://fakestoreapi.com/products";
    try {
      const response = await axios.get(`${api_url}/blogs/all`);
      const blogs = response.data;
      console.log(blogs);
      setData(blogs)
      console.log((data));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }; 

    // fetchApi()
  useEffect(()=>{
    fetchApi()
  }, [])

  return (
    <div className="" style={{ marginTop: "3rem" }}>
      <h1 className="w-25 bg-success text-light">Trending</h1>
      {loading && <div className="loading text-center">Loading...</div>}
      {data && (
        <div className="data row">
          {data.map((data) => {
            return (
              <div className="card col-12 col-md-4 mb-4  " key={data._id}>
                <div className="card-img">
                  <img src={data.imageUrl} alt="" /> 
                </div>
                <div className="card-content">
                  <h3>{data.title}</h3>
                  <p>{data.content}</p>
                  <b>{data.author}</b>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FetchData;