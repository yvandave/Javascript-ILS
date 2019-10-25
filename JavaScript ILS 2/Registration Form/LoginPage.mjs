
$(document).ready(()=>{
    
    $("#textCard").css({"opacity":"0.9"});
    $("#loginCard").css({"transform":"translate(0,0)"})
    
    var checkLog = localStorage.getItem("LoggedUser"); 
     
    if(!checkLog == null 
         || !checkLog == ""){
        window.location.href = "./Shopping cart/index.html";
    }
    
    $(".button.signup").click(()=>{
        window.location.href = ".Registration Form/SignupPage.html";
    })

    $(".button.login").click(()=>{
        validate();
    })



    // Go to the Main Page or User Page
    function goToUserPage( signedEmail ){

    localStorage.setItem("LoggedUser", signedEmail)
    window.location.href = "./Shopping cart/index.html";

    }

    //This will validate the input on the field
    function validate(){
        var email = $('.input.email');
        var password = $('.input.password');

        var email_value = email.val();
        var password_value = password.val();

        var signin_invalid = $('.invalid.signin');
        //Local Storage
    
        if (localStorage.getItem(""+ email_value) == null) 
        {
            signin_invalid.html("Invalid Email or Password");
            signin_invalid.css('color','red'), email.css('border-color','red');
            email.css('border-width','1px'), password.css('border-color','red');
            password.css('border-width','1px');
        } else {
            var storageText = localStorage.getItem(""+ email_value);
            var retrieveObject = JSON.parse(storageText);
            var storedEmail = retrieveObject.email;
            var storedPassword = retrieveObject.password;
            
            //The localStorage Item getters
            (( email_value == storedEmail )
                && (!email_value == "") 
                && (password_value == storedPassword )
                ? goToUserPage( ""+ email_value)
                : (signin_invalid.html("Invalid Email or Password"), signin_invalid.css('color','red'), email.css('border-color','red'), email.css('border-width','1px'), password.css('border-color','red'), password.css('border-width','1px')));
        }
    }
    
})