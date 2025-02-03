import React, { useEffect, useState } from "react";
import LoggedinNavbar from "./Nav2";
import { Link } from "react-router-dom";
import '../assets/blog.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async() => {
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
            setError("Server Down!!")
            console.error(err);
        } finally {
            setLoading(false);
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

    if(loading) return <div className="pre">Loading...</div>
    if(error) return <div className="pre">{error}</div>

    return (
        <>
            <LoggedinNavbar />
            <div className="blog_container">
                {blogs.map(blog => (
                    <div key={blog._id} className="blog_card">
                        <img 
                            src={blog.coverImage}
                            alt={blog.title}
                            className="blog_cover_image"
                        />
                        <div className="blog_content">
                            <h2>{blog.title}</h2>
                            <p className="blog_meta">
                                <pre>
                                    <span className="date">
                                        {formatDate(blog.createdAt)}
                                    </span>
                                </pre>
                            </p>
                            <p className="blog_summary">{blog.summary}</p>
                            <Link to={`/blogs/${blog._id}`} className='read'>
                                Read more...
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Blogs;
