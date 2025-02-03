import { Link } from 'react-router-dom';
import '../assets/home.css'
import Navbar from './Navbar';
const Home = () =>{
    return(
        <div className="home">
            <Navbar />
            <div className="hero-content">
                <h1>Write, Share, Inspire : Your Stories Matter</h1>
                <h7>Join a community of passionate writers and readers. Share your thoughts,<br></br> explore new ideas, and connect with like-minded individuals.</h7><br />
                <div className="buttons">
                    <Link to='/login' className='get-started'>Get Started</Link>
                    <Link to='/blogs' className='explore-blogs'>Explore Blogs</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;