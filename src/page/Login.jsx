import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  // Navigation
  const { user, setUser} = useAuth(); 
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handling form submission
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password length
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(`${api_url}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Assuming the server sends a token on successful login
        // Store the token securely, e.g., in cookies or local storage
        setUser(response.data)
        // console.log(response.data.token);
        // localStorage.setItem("auth", JSON.stringify(response.data));
        localStorage.setItem("authToken", token);
        
        // setUser({ ...auth, token: data.token, user: data.user });
        toast.success("Login successfully");
        setLoading(false)
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      const msg = err.response.data
      // console.log(err);
      toast.error(msg.error);
    }finally {
      setLoading(false); // Set loading to false after API request completes
    }
  };
  // console.log(user);

  return (
    <div>
      <h1 className="bg-primary my-4 p-3 text-light text-center">Login</h1>
      <form className="col-12 col-md-6 offset-md-3" onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null); // Clear any previous error
            }}
          />
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button className="btn btn-primary mt-4" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Login;