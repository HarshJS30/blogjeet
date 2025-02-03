import React from "react";
import LoggedinNavbar from "./Nav2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import myimage1 from '../assets/handpen.webp';
import myimage2 from '../assets/stackbooks.webp';
import myimage3 from '../assets/avatar.webp';
import { Link } from "react-router-dom";



const MainPage = () => {
   

    return (
        <>
            <LoggedinNavbar />
            <div className="main-page">
                <div className="one1">
                    <h1>Ready to share your thoughts?</h1>
                </div>
                <div className="two2">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={myimage1}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Share something
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Express your ideas and creativity and bring them into life. Start a new blog and share your voice with the world today!
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to='/create'>
                                Write your blog
                            </Link>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={myimage2}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Explore Blogs
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Explore a wide variety of blogs and discover fresh perspectives. Dive into topics that inspire and broaden your knowledge!
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to='/blogs'>
                                See Blogs
                            </Link>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={myimage3}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Know about me
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Learn more about my journey, passions, and the inspiration behind my writing. Get a glimpse into my world and what drives me!
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link>
                                See my portfolio
                            </Link>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default MainPage;