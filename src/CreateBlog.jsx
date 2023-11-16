import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";


const CreateBlog = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // if (!token) {
  //   return <Navigate to="/login" />;
  // }
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You must log in to create a blog.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("imageUrl", image);

    try {
      setLoading(true);

      const config = {
        headers: {
          "Authorization": token,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${api_url}/create`, formData, config);

      if (data?.message === "Blog created successfully") {
        toast.success("Blog created successfully");
        navigate("/");
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        toast.error("Failed to create a blog");
      }
    } catch (error) {
      toast.error("Failed to create a blog");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <h1 className="text-center bg-primary text-light">Create Blog</h1>
    <form className="col-12 col-md-6 offset-md-3" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          className="form-control p-3"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-control my-3">
        <input
          className="form-control p-3"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <textarea
          className="form-control"
          placeholder="Type content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="form-control my-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">
        { loading ? 'Loading' : 'Create'}
      </button>
    </form>
  </div>
  );
};

export default CreateBlog;