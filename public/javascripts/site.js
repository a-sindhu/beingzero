$(function(){
    console.log("Jquery Running");

    var loggedIn = false;
    if(loggedIn){
        console.log("Logged In");
        $("#signedIn").show();
        $("#notSignedIn").hide();
    }
    else{
        console.log("Not Logged In");
        $("#notSignedIn").show();
        $("#signedIn").hide();
    }

    // On click of login button, make AJAX call.
    $("#btnLogin").on('click', function(){
        var userObj = {username: '', password:''};
        userObj.username = $("#txtUserName").val();
        userObj.password = $("#txtPassword").val();
        $.post( "/api/login", userObj)
        .done(function( data ) {
             //alert( "Data Loaded: " + JSON.stringify(data) );
            if(data.success){
                toastr.success('Login Successful');
                // front end session management
                $("#signedIn").show();
                $("#notSignedIn").hide();
            }
            else{
                toastr.error('Login Failed');
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