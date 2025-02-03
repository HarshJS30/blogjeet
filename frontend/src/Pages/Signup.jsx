import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

const Signup = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 4) {
      alert("Username should be at least 4 characters long");
      return;
    }

    if (password.length < 4) {
      alert("Password should be at least 4 characters long");
      return;
    }

    try {
      const response = await fetch('https://blogjeet-1.onrender.com/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        alert('Registration successful');
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Registration failed'}`);
      }
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  }

  return (
    <div className="signup">
      <div className="bg"></div>
      <h1>Begin your blogging journey</h1>
      <h5>Enter your details to get started</h5>
      <form onSubmit={handleSubmit} className="form">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Create a new Account</button>
        <Link className="link" to="/login">Already have an account? Click here to login</Link>
      </form>
    </div>
  );
};

export default Signup;
