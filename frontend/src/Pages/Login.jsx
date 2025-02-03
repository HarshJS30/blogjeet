import Navbar from "./Navbar";
import '../assets/loginsignup.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://blogjeet-1.onrender.com/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Login response headers:', response.headers);
                alert("Logged in successfully!");
                navigate('/home');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Credentials are wrong!'}`);
            }
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    }

    return (
        <div className="login">
            <div className="bg"></div>
            <h1>Welcome Back</h1>
            <h5>Please enter your details.</h5>
            <form onSubmit={handleSubmit} className="form">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button>Login to your Account</button>
                <Link className='link' to="/signup">New here? Click to create a new account</Link>
            </form>
        </div>
    )
}

export default Login;
