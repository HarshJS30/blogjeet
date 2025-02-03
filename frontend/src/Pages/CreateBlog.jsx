import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedinNavbar from "./Nav2";
import CreateNavbar from "./Nav3";


const CreateBlog=()=>{
    
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [coverimage,setCoverimage] = useState(null);
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('title',title);
        formdata.append('summary',summary);
        formdata.append('content',content);
        formdata.append('coverImage',coverimage);

        try{
            const response = await fetch('http://localhost:4000/create',{
                method:'POST',
                body:formdata,
                credentials:"include",
            });
            if (response.ok){
                alert('Blog created Successfully!')
                navigate('/blogs')
            }else{
                const errorData = await response.json();
                setError(errorData.message || "Failed to create Blog");
            }
        }catch(err){
            alert(err);
            setError('Network Error');
            console.error(err);
        }
    }
    
    return(
        <>
            <CreateNavbar />
            <div className="createblog">
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit} className="blogcreation">
                    <h2>Create a new Blog</h2>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Enter title of your Blog"
                        required
                    />
                    <textarea
                        className="summary"
                        type="text"
                        value={summary}
                        onChange={(e)=>setSummary(e.target.value)}
                        placeholder="Summary of your blog in few words"
                        required
                    />
                    <textarea
                        className="content"
                        placeholder="Write your Blog here..."
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        required
                    />
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e)=>setCoverimage(e.target.files[0])}
                    />
                    <button type="submit">Create Blog</button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog;