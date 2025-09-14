const express = require('express');
const router = express.Router();

//Routes


router.get('/index', (req, res) => {
    const locals = {
        title: "CinemaBlab", 
        description: "Simple blog created with Node js, Express, and mongoDB."
    }


    res.render('index', { locals }); 

});

router.get('/post', (req, res) => {
    const locals = {
        title: "Post",
        description: "Upload Content here."
    }

    res.render('Post', { locals });
});

router.get('/profile', (req, res) => {


    res.render('Profile');
});

router.get('/settings', (req, res) => {

    res.render('settings');
});

router.get('/sign-in', (req, res) => {
    res.render('sign-in');
});







module.exports = router;




