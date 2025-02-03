import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoggedinNavbar =()=>{
    
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                credentials: 'include'  
            });
            
            if (response.ok) {  
                alert("Logged Out Successfully!");
                navigate('/');
            } else {
                alert("Error logging out!");
            }
        } catch (err) {
            alert("Network error occurred!");
            console.error(err);
        }
    }
    
    return(
        <>
            <div className="navbar">
                <Link className='heading'>BlogJeet</Link>
                <div className="options">
                    <Link to="/home">Home</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default LoggedinNavbar;