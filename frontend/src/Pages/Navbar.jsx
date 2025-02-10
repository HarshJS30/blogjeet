import { Link } from "react-router-dom";
import '../assets/Navbar.css';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <>
            <motion.div 
                className="navbar"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <Link to="/" className='heading'>BlogJeet</Link>
                </motion.div>
                <motion.div 
                    className="options"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                delayChildren: 0.6,
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: -10 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        whileHover={{ y: -2 }}
                    >
                        <Link to="/login">Login</Link>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: -10 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        whileHover={{ y: -2 }}
                    >
                        <Link to="/signup">SignUp</Link>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: -10 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        whileHover={{ y: -2 }}
                    >
                        <Link to="/home">Guest Login</Link>
                    </motion.div>
                </motion.div>
            </motion.div>
            <motion.div 
                className="line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, delay: 1.0 }}
            ></motion.div>
        </>
    )
}

export default Navbar;
