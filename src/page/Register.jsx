import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // navigation
  const navigate = useNavigate();
  // Hook
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handling form submission
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  console.log(api_url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      toast.error("Please enter a username.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    

    if (!validatePassword(password)) {
      toast.error("Strong password required (at least 6 characters).");
      return;
    }

    try {
      const response = await axios.post(`${api_url}/register`, {
        username,
        email,
        password,
      });
      const result = response.data;
      console.log(result);
      toast.success("Registration successful");
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("User already exists. Please choose a different username or email.");
      } else {
        console.error(err);
        toast.error("Registration failed");
      }
    }
  };

  // Function to validate username
  const validateUsername = (username) => {
    // You can add validation rules for the username here
    return username.length > 0;
  };

  // Function to validate email
  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  };

  // Function to validate password
  const validatePassword = (password) => {
    // You can add validation rules for the password here
    return password.length >= 6;
  };

  return (
    <div>
      <h1 className="bg-primary my-4 p-3 text-light text-center">Register</h1>
      <form className="col-12 col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control my-4">
          <input
            className="form-control p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <input
            className="form-control p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Register;