import { motion } from 'framer-motion';
import Navbar from "./Navbar";
import '../assets/loginsignup.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
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
        setIsLoading(false);
    }

    return (
        <motion.div 
            className="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <motion.div 
                className="bg"
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 0.5 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
            >
                Welcome Back
            </motion.h1>
            
            <motion.h5
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
            >
                Please enter your details.
            </motion.h5>
            
            <motion.form 
                onSubmit={handleSubmit} 
                className="form"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
            >
                <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: "easeInOut" }}
                >
                    Username
                </motion.label>
                
                <motion.input
                    whileFocus={{ scale: 0.98, transition: { duration: 0.3, ease: "easeOut" } }}
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5, ease: "easeInOut" }}
                >
                    Password
                </motion.label>
                
                <motion.input
                    whileFocus={{ scale: 0.98, transition: { duration: 0.3, ease: "easeOut" } }}
                    type="password"
                    placeholder="Enter Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    style={{ opacity: isLoading ? 0.7 : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {isLoading ? 'Logging in...' : 'Login to your Account'}
                </motion.button>
                
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: "easeInOut" }}
                >
                    <Link className='link' to="/signup">
                        New here? Click to create a new account
                    </Link>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}

export default Login;
