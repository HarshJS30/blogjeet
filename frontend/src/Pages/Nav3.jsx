import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateNavbar =()=>{


    return(
        <>
            <div className="navbar">
                <Link className='heading'>BlogJeet</Link>
                <div className="options">
                    <Link to="/home">Home</Link>
                </div>
            </div>
        </>
    )
}

export default CreateNavbar;