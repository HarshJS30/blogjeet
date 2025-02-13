import React from "react";
import LoggedinNavbar from "./Nav2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import myimage1 from "../assets/handpen.webp";
import myimage2 from "../assets/stackbooks.webp";
import myimage3 from "../assets/avatar.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MainPage = () => {
  return (
    <>
      <LoggedinNavbar />
      <div className="main-page">
        <motion.div 
          className="one1"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Ready to share your thoughts?</h1>
        </motion.div>
        <div className="two2">
          {[ 
            { image: myimage1, title: "Share something", text: "Express your ideas and creativity and bring them into life. Start a new blog and share your voice with the world today!", link: "/create", linkText: "Write your blog" },
            { image: myimage2, title: "Explore Blogs", text: "Explore a wide variety of blogs and discover fresh perspectives. Dive into topics that inspire and broaden your knowledge!", link: "/blogs", linkText: "See Blogs" },
            { image: myimage3, title: "Know about me", text: "Learn more about my journey, passions, and the inspiration behind my writing. Get a glimpse into my world and what drives me!", link: "#", linkText: "See my portfolio" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 1.3 }}
            >
              <Link to={item.link} style={{ textDecoration: 'none' }}>
                <Card sx={{ maxWidth: 345, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardActionArea>
                    <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {item.text}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography variant="body2" sx={{ color: "primary.main", padding: '8px 16px' }}>
                      {item.linkText}
                    </Typography>
                  </CardActions>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;