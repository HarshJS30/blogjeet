import React from "react";
import Home from "./Pages/Home";
import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MainPage from "./Pages/Front";
import CreateBlog from "./Pages/CreateBlog";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetail";

function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<MainPage />}></Route>
        <Route path="/create" element={<CreateBlog />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blogs/:id" element={<BlogDetails />}></Route>
      </Routes>
    </>
  )
}
export default App;