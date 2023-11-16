import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token (or session)
    localStorage.removeItem("authToken"); // Adjust this according to how you store the token

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;