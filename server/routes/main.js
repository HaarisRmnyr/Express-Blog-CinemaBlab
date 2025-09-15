const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import the Post model
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // Save uploaded files to the 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Routes
router.get(['/index', '/'], async (req, res) => {
    try {
        const locals = {
            title: "CinemaBlab", 
            description: "Simple blog created with Node js, Express, and mongoDB."
        };
        const isLoggedIn = req.session.userId ? true : false;
        
        const posts = await Post.find().sort({ createdAt: -1 });

        res.render('index', { locals, isLoggedIn, posts });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts.');
    }
});

router.get('/post', (req, res) => {
    const locals = {
        title: "Post",
        description: "Upload Content here."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('post', { locals, isLoggedIn });
});

// New POST route to handle form submission and file upload
router.post('/post', upload.single('image'), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);

        if (!req.file) {
            console.log('Image upload failed!');
            return res.status(400).send('Image upload is required.');
        }

        const { title, body } = req.body;
        const image = '/uploads/' + req.file.filename;

        const newPost = new Post({
            title: title,
            image: image,
            body: body
        });

        await newPost.save();

        res.redirect('/index');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while saving the post.');
    }
});


router.get('/profile', (req, res) => {
    const locals = {
        title: "Profile",
        description: "User profile."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('profile', { locals, isLoggedIn });
});

router.get('/settings', (req, res) => {
    const locals = {
        title: "Account Settings",
        description: "Manage account settings."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('settings', { locals, isLoggedIn });
});

router.get('/sign-in', (req, res) => {
    const locals = {
        title: "Sign-In",
        description: "Sign in to your account."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('sign-in', { locals, isLoggedIn });
});

router.get('/sign-up', (req, res) => {
    const locals = {
        title: "Sign-Up",
        description: "Register an account."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('sign-up', { locals, isLoggedIn });
});




module.exports = router;