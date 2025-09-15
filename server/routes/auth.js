const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { findOne } = require('../models/Post');


router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send('Invalid username.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password.');
    }
    req.session.userId = user._id;
    res.redirect('/');


});


router.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body;

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
            });

        await newUser.save();
        res.redirect('/sign-in');

});


router.get('/log-out', (req, res) =>{
    req.session.destroy();

    res.redirect('/');





})
module.exports = router;