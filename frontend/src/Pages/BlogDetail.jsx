import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedinNavbar from "./Nav2";

const BlogDetails = () => {
    const { id } = useParams();
    console.log("Blog ID from URL:", id); // Log the ID
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await fetch(`http://localhost:4000/blogs/${id}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Can't fetch blog");
            }
        } catch (err) {
            setError("Server Down!");
            console.error(err);
        } finally {
            setIsLoading(false);
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

    if (isLoading) return <div className="pre">Loading...</div>;
    if (error) return <div className="pre">{error}</div>;
    if (!blog) return <div className="pre">Blog not found</div>;

    return (
        <>
            <LoggedinNavbar />
            <div className="blog-details">
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-meta">
                    <pre><span className="author">By {blog.author.username} </span></pre>
                    <pre><span className="date">{formatDate(blog.createdAt)}</span></pre>
                </div>
                <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="blog-image"
                />
                <div className="blog-content">{blog.content}</div>
            </div>
        </>
    );
};

export default BlogDetails;