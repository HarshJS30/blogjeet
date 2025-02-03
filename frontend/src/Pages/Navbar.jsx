import { Link } from "react-router-dom";
import '../assets/Navbar.css';

const Navbar =()=>{
    return(
        <>
            <div className="navbar">
                <Link to="/" className='heading'>BlogJeet</Link>
                <div className="options">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">SignUp</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}



export default Navbar;