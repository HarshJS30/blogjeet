require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const MongoStore = require('connect-mongo');


if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const app = express();
const port = process.env.PORT || 4000;


app.use(cors({
  origin: 'https://blogjeet.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['set-cookie']  // Add this
}));

app.use(bodyParser.json({ limit: '1mb' }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
 
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Mongo connected Successfully!")
  }).catch((err) => {
    console.error("MongoDB connection error:", err)
  })


  app.use(session({
    secret: process.env.SESSION_SECRET || 'temp-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      ttl: 24 * 60 * 60 // Session TTL in seconds (1 day)
    }),
    cookie: { 
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }
  }));
  // Define a User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength:[4] },
  password: { type: String, required: true , minlength:[4],}
})

// Blog schema
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  coverImage: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{
  timestamps:true,
})

const Blog = mongoose.model('Blog', BlogSchema);
const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(200).json({ message: "Saved" })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
})

// In your backend login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const person = await User.findOne({ username })
    if (!person || person.password !== password) {
      return res.status(400).json({ message: "invalid credentials" })
    }
    req.session.userId = person._id;
    console.log('Login successful, session:', req.session); // Add this
    return res.status(200).json("Logged in");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error logging in" });
  }
})

const requireAuth = (req, res, next) => {
  console.log('Session in requireAuth:', req.session); // Add this
  if (!req.session.userId) {
    return res.status(401).json({ message: "sorry, cant access this page!" })
  }
  next();
}

app.post('/create', requireAuth, upload.single('coverImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { title, summary, content } = req.body;
    const coverImagePath = req.file.path;

    const cloudinaryResponse = await cloudinary.uploader.upload(coverImagePath, {
      folder: 'blog-covers',
      public_id: `cover_${Date.now()}`,
      format: 'png',
    });

    fs.unlink(coverImagePath, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    const coverImage = cloudinaryResponse.secure_url;
    const author = req.session.userId;

    const newBlog = new Blog({
      title,
      summary,
      coverImage,
      content,
      author,
    });

    await newBlog.save();
    res.status(200).json({ message: "Blog saved" });
  } catch (err) {
    console.error(err);
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({ message: "Can't save blog: " + err.message });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out!" })
    }
    res.status(200).json({ message: "Logged Out" })
  })
})

app.get('/blogs', async(req,res) => {
  try {
    const blogs = await Blog.find()
      .populate('author','username')
      .sort({createdAt : -1})
    res.json(blogs);
  } catch(err) {
    console.error(err);
    res.status(500).json({message:"Can't fetch Blogs"});
  }
})

app.get('/blogs/:id', async(req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username');
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json(blog);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Couldn't fetch blog" });
  }
});

app.delete('/blogs/:id', async(req,res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if(!blog){
      return res.status(404).json({message: "Blog not found!"})
    }
    res.status(200).json({message:"Deleted!"})
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Couldn't delete blog" });
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on ${port}`);
});
