import { Link } from 'react-router-dom';
import '../assets/home.css'
import Navbar from './Navbar';
import {motion} from 'framer-motion';

const Home = () =>{
    return(
        <div className="home">
            <Navbar />
            <motion.div
            className="hero-content"
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration:1.2, ease:"easeOut"}}>
                <motion.h1
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1, delay:0.5}}>
                    Write, Share, Inspire : Your Stories Matter
                </motion.h1>
                <motion.p 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:1, delay:0.8}}
                className="subtitle">
                    Join a community of passionate writers and readers. Share your thoughts,<br></br> explore new ideas, and connect with like-minded individuals.
                </motion.p>
                <br />
                <motion.div
                className="buttons"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delayChildren: 1.2,
                            staggerChildren: 0.4
                        }
                    }
                }}>
                    <motion.div
                        variants={{
                            hidden: {opacity:0, y:20},
                            visible: {opacity:1, y:0, transition: { duration: 0.6 }}
                        }}
                        whileHover={{scale: 1.03, transition: {duration: 0.3}}}
                        whileTap={{scale: 0.97}}>
                        <Link to='/login' className='get-started'>Get Started</Link>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: {opacity:0, y:20},
                            visible: {opacity:1, y:0, transition: { duration: 0.6 }}
                        }}
                        whileHover={{scale: 1.03, transition: {duration: 0.3}}}
                        whileTap={{scale: 0.97}}>
                        <Link to='/blogs' className='explore-blogs'>Explore Blogs</Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Home;
