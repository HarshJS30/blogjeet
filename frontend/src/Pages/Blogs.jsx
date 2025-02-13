import React, { useEffect, useState } from "react";
import LoggedinNavbar from "./Nav2";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '../assets/blog.css';

const SkeletonBlog = () => {
    return (
        <div className="blog_card" style={{ 
            display: 'flex',
            height: '25rem',
            width: '100%',
            marginBottom: '5rem',
            background: 'transparent'
        }}>
            <div style={{ 
                margin: '2rem',
                width: '100%',
                maxWidth: '40rem'
            }}>
                <Skeleton 
                    height="24rem"
                    style={{ 
                        display: 'block',
                        width: '100%'
                    }}
                />
            </div>
            <div className="blog_content" style={{ 
                marginTop: '2rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <Skeleton height={36} width="80%" /> 
                <div className="blog_meta">
                    <Skeleton width={200} height={20} /> 
                </div>
                <div className="blog_summary">
                    <Skeleton count={3} height={24} style={{ marginBottom: '0.5rem' }} /> 
                </div>
                <Skeleton width={100} height={24} />
            </div>
        </div>
    );
};

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async() => {
        setLoading(true);
        try {
            const response = await fetch('https://blogjeet-1.onrender.com/blogs', {
                credentials: 'include'
            });
            
            if(response.ok) {
                const data = await response.json();
                setBlogs(data);
            } else {
                setError('Failed to fetch Blogs');
            }
        } catch(err) {
            setError("Server Down!!");
            console.error(err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if(loading) {
        return (
            <>
                <LoggedinNavbar />
                <div className="blog_container" style={{ height: '100vh' }}>
                    <SkeletonTheme 
                        baseColor="rgba(255, 255, 255, 0.1)"   
                        highlightColor="rgba(255, 255, 255, 0.2)"
                    >
                        {[1, 2, 3].map((_, index) => (
                            <SkeletonBlog key={index} />
                        ))}
                    </SkeletonTheme>
                </div>
            </>
        );
    }
    
    if(error) return <div className="pre">{error}</div>;

    return (
        <>
            <LoggedinNavbar />
            <motion.div 
                className="blog_container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {blogs.map((blog, index) => (
                    <motion.div 
                        key={blog._id} 
                        className="blog_card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                    >
                        <motion.img 
                            src={blog.coverImage} 
                            alt={blog.title} 
                            className="blog_cover_image"
                            initial={{ scale: 0.9, opacity: 0, x:-300 }}
                            animate={{ scale: 1, opacity: 1, x:0 }}
                            transition={{ duration: 1.3 }}
                        />
                        <div className="blog_content">
                            <motion.h2 
                                initial={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                {blog.title}
                            </motion.h2>
                            <motion.div 
                                className="blog_meta"
                                initial={{ opacity: 0, x:200}}
                                animate={{ opacity: 1, x:0}}
                                transition={{ duration:1, delay: 0.3 }}
                            >
                                <span className="date">
                                    {formatDate(blog.createdAt)}
                                </span>
                            </motion.div>
                            <motion.div 
                                className="blog_summary"
                                initial={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                {blog.summary}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x:200 }}
                                animate={{ opacity: 1, x:0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                <Link to={`/blogs/${blog._id}`} className='read'>
                                    Read more...
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}

export default Blogs;