var express = require('express');
var router = express.Router();
const userLib = require('../backend/lib/userLib');

router.post('/login', function(req, res) {

    userLib.isUserValid(req.body, function(resultJson){
        if(resultJson.success==true){
            console.log("Session for User Initialized");
            //console.log(resultJson.user.username);
            req.session.user = {username: resultJson.user.username}; // Init session object for this user
        }
        res.json(resultJson);
    })
});


// Dummy API that will return rol of current user who has requested mailbox --- Through SESSION
router.get('/mailbox', function(req, res) {
    // console.log(req.session);
    // console.log(req.session.user);
    if(req.session && req.session.user){
        res.json({success:true, username:req.session.user.username, 'mailbox': req.session.user.username});
    }
    else{
        // Redirect him to login page
        res.json({success:false, message:'Need to be logged in to get mailbox'});
    }
});

module.exports = router;