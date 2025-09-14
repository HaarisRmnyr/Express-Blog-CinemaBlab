const express = require('express');
const router = express.Router();

// Routes
router.get('/index', (req, res) => {
    const locals = {
        title: "CinemaBlab", 
        description: "Simple blog created with Node js, Express, and mongoDB."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('index', { locals, isLoggedIn }); 
});

router.get('/post', (req, res) => {
    const locals = {
        title: "Post",
        description: "Upload Content here."
    };
    const isLoggedIn = req.session.userId ? true : false;
    res.render('post', { locals, isLoggedIn });
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

module.exports = router;