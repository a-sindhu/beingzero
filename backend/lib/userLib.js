const userModel = require('../models/userModel');

module.exports.isUserValid = function(userJson,cb){

    var query = {username: userJson.username, password: userJson.password, isDeleted: false};
    userModel.find(query,function(err,collections){
        var response = {success: false, message: 'Login Failed',user: null};
        if(err){
                response.message = 'Server Side Error Occured, Try again later';
                return cb(response);
            }
            if(collections.length==0){
                response.message = 'Invalid Username/Password';
                return cb(response);
            }
            response.success = true;
            response.message = 'Login Successful';
            response.user = {username: collections[0].username};
            cb(response);
    })
}