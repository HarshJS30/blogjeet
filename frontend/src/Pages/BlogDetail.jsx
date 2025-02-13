import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedinNavbar from "./Nav2";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '../assets/blog.css';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://blogjeet-1.onrender.com/blogs/${id}`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else {
                setError('Failed to fetch Blog');
            }
        } catch (err) {
            setError("Server Down!!");
            console.error(err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    if (loading) {
        return (
            <>
                <LoggedinNavbar />
                <div className="blog_detail_container">
                    <SkeletonTheme baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)">
                        <div className="blog_detail">
                            <Skeleton height={50} width="60%" style={{ margin: 'auto' }} />
                            <Skeleton height={30} width="40%" style={{ margin: '1rem auto' }} />
                            <Skeleton height={400} style={{ marginBottom: '1rem' }} />
                            <Skeleton count={5} height={24} style={{ marginBottom: '0.5rem' }} />
                        </div>
                    </SkeletonTheme>
                </div>
            </>
        );
    }

    if (error) return <div className="pre">{error}</div>;

    return (
        <>
            <LoggedinNavbar />
            <motion.div 
                className="blog-detail-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <motion.h1 
                    className="blog-title"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {blog.title}
                </motion.h1>
                <motion.div 
                    className="blog-meta"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span>{new Date(blog.createdAt).toLocaleString()}</span>
                </motion.div>
                <motion.img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="blog-cover"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.3 }}
                />
                <motion.div 
                    className="blog-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    {blog.content}
                </motion.div>
            </motion.div>
        </>
    );
};

export default BlogDetail;
