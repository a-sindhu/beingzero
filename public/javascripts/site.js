$(function(){
    console.log("Jquery Running");

    var userObject = {
        saveUserInLocalStorage : function(userJson){
            window.localStorage.setItem('currentUser', JSON.stringify(userJson));
        },
        removeCurrentUser: function(){
            window.localStorage.removeItem('currentUser');
        },
        getCurrentUser : function(){
            
            return window.localStorage.getItem('currentUser');
        },
        getCurrentUserName : function(){
            var curUserString = this.getCurrentUser();
            console.log(curUserString);
            if(curUserString){
                var json = JSON.parse(curUserString);
                if(json && json.username)
                    return json.username;
                return "";
            }
            return "";
        },
        isUserLoggedIn : function(){
            if(this.getCurrentUser()==null)
                return false;
            return true;
        }
    };

    var onSignIn = function(loggedIn){
        if(loggedIn){
            console.log("Logged In");
            $("#signedIn").show();
            $("#notSignedIn").hide();
            $("#welcomeUser").html("Welcome "+ userObject.getCurrentUserName());
        }
        else{
            console.log("Not Logged In");
            $("#notSignedIn").show();
            $("#signedIn").hide();
        }
    }


    if(userObject.isUserLoggedIn()){
        onSignIn(true);
    }
    else{
        onSignIn(false);
    }


    $("#lnkLogout").click(function(){

        // TODO:  When session is implemented, delete session on server side also

        userObject.removeCurrentUser(); 
        onSignIn(false);
    })

    // On click of login button, make AJAX call.
    $("#btnLogin").on('click', function(){
        var userObj = {username: '', password:''};
        userObj.username = $("#txtUserName").val();
        userObj.password = $("#txtPassword").val();
        $.post( "/api/login", userObj)
        .done(function( data ) {

            console.log(JSON.stringify(data));

            if(data.success){
                toastr.success(data.message, 'Successful');
                userObject.saveUserInLocalStorage(data.user);
                onSignIn(true);
            }
            else{
                toastr.error(data.message, 'Failed');
            }
        })
        .fail(function() {
            //alert( "error" );
        })
        .always(function() {
            //alert( "finished" );
        });
    })
})