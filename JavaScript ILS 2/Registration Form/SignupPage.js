
$(document).ready(()=>{
    $("#signupCard").css({"transform":"translate(0,0)"})
    $("#signup_span").css({"font-size":"30px"});
    $("#hello_span").css({"font-size":"60px"});

    /** Button Clicks */

    $(".button.Login").click(()=>{
        window.location.href = "LoginPage.html";
    })

    $(".button.Signup").click(()=>{
        validate();
    })


    function validate(){

        //Elements
        var firstname = $(".input.firstname");
        var middlename = $(".input.middlename");
        var lastname = $(".input.lastname");
        var age = $(".input.age");
        var contactNo = $(".input.contactNo");
        var address = $(".input.address");
        var zipcode = $(".input.zipcode");
        var email = $(".input.email");
        var password = $(".input.password");
        var confirm_password = $(".input.confirm_password");

        //Invalids
        var invalid_firstname = $(".invalid.firstname");
        var invalid_middlename = $(".invalid.middlename");
        var invalid_lastname = $(".invalid.lastname");
        var invalid_age = $(".invalid.age");
        var invalid_contactNo = $(".invalid.contactNo");
        var invalid_address = $(".invalid.address");
        var invalid_zipcode = $(".invalid.zipcode");
        var invalid_email = $(".invalid.email");
        var invalid_password = $(".invalid.password");
        var invalid_confirm_password = $(".invalid.confirm_password");

        //Value getters
        var value_firstname = firstname.val();
        var value_middlename = middlename.val();
        var value_lastname = lastname.val();
        var value_age = age.val();
        var value_contactNo = contactNo.val();
        var value_address = address.val();
        var value_zipcode = zipcode.val();
        var value_email = email.val();
        var value_password = password.val();
        var value_confirm_password = confirm_password.val();


        //  function check(element, element_value, invalid_text, textLength, textGuide){
 
        var checkfirstname = check(firstname, value_firstname, 3,invalid_firstname, " First Name must be 3 Characters or above.");
        var checkmiddlename = check(middlename, value_middlename, 3, invalid_middlename, " Middle Name must be 3 Characters or above.");
        var checklastname = check(lastname, value_lastname, 3, invalid_lastname, " Last Name must be 3 Characters or above.");
        var checkage = check(age, value_age, 0, invalid_age, "");
        var checkcontactNo = check(contactNo, value_contactNo, 10, invalid_contactNo, " Contact No. must be 10 digits");
        var checkaddress = check(address, value_address, 10, invalid_address, " Address must be 10 Characters or above.");
        var checkzipcode = check(zipcode, value_zipcode, 0, invalid_zipcode, "");
        var checkemail = checkEmailIfExist(email, invalid_email, value_email);
        var checkpassword = check(password, value_password, 5, invalid_password, "Password must be 5 characters above");
        


        if(checkpassword == true){
            var matchPassword = match( confirm_password, value_confirm_password, value_password, invalid_confirm_password, "Password doesnt match");
            if(checkfirstname == true
                && checkmiddlename == true 
                && checklastname == true 
                && checkage == true
                && checkcontactNo == true   
                && checkaddress == true
                && checkzipcode == true
                && checkemail == false
                && checkpassword == true
                && matchPassword == true)
                {
                    alert("Registered successfully!")
                    setUpLocalStorage(value_firstname,
                                        value_middlename,
                                        value_lastname,
                                        value_address,
                                        value_contactNo,
                                        value_zipcode,
                                        value_email,
                                        value_password);
                    window.location.href = "LoginPage.html";
                }
     
            }

        focusBehavior( firstname, invalid_firstname);
        focusBehavior(middlename, invalid_middlename);
        focusBehavior(lastname, invalid_lastname);
        focusBehavior(age, invalid_age);
        focusBehavior(contactNo, invalid_contactNo);
        focusBehavior(address, invalid_address);
        focusBehavior(zipcode, invalid_zipcode);
        focusBehavior(email, invalid_email);
        focusBehavior(password, invalid_password);
        focusBehavior(confirm_password, invalid_confirm_password);


       
    }

    //For behaviour (if the user focus on the field it will revert it to
    //its natural style (if it is a wrong field))
    function focusBehavior( element , invalid_text){

        element.focus(()=>{ 
            element.css({"border":"none"})
            invalid_text.css({"font-size":"0px","color":"red"});
        })
    }

    //for confirm password
    function match(element, element_value, matching_element_value, invalid_text, textGuide){
        if(element_value == ""){
            invalid_text.html("Must be filled up.");
            element.css({"border":"1px solid red"});
            invalid_text.css({"font-size":"12px","color":"red"});
            return false;
        } else {
            if(element_value != matching_element_value){
                invalid_text.html(textGuide);
                element.css({"border":"1px solid red"});
                invalid_text.css({"font-size":"12px","color":"red"});                return false;
            }
            else {
               element.css({"border":"1px solid green"});
               invalid_text.css({"font-size":"0px"});
               invalid_text.html("");
               return true;

            }
        }
    }

    function checkEmailIfExist(element, invalid_text, email){
        if(!email.includes("@") || email == ""){
            element.css({"border":"1px solid red"});
            invalid_text.html("Email is invalid");
            invalid_text.css({"font-size":"12px","color":"red"});
            return true;
        } else {
            var check = true;

            for(var i = 0; i < localStorage.length; i++){
                if(localStorage.key(i) == email){
                    check = false
                }
            }

            if(check == false){
                element.css({"border":"1px solid red"});
                invalid_text.html("Email has been taken");
                invalid_text.css({"font-size":"12px","color":"red"});
                return true;
            } else {
                element.css({"border":"1px solid green"});
                return false;
            }

        }


        
    }
    //checking if the element corresponds the given condition
    //Check the textlength of the element value
    function check(element, element_value, textLength, invalid_text, textGuide){

        if(element_value == "")
           {
              invalid_text.html("Must be filled up.");
              element.css({"border":"1px solid red"});
              invalid_text.css({"font-size":"12px","color":"red"});
              return false;
           } 
           else if(element_value.length < textLength)
           {
               invalid_text.html(textGuide);
               element.css({"border":"1px solid red"});
               invalid_text.css({"font-size":"12px","color":"red"});
               return false;
   
           }
           else {
               element.css({"border":"1px solid green"});
               invalid_text.css({"font-size":"0px"});
               invalid_text.html("");
               return true;
   
           }
    }

    //Setting up local storage
    function setUpLocalStorage(firstname, middlename,lastname, address, phone, zipcode, email, password){

        var objects = { firstname:firstname, 
                         middlename:middlename, 
                         lastname:lastname,
                         address:address,
                         phone:phone,
                         zipcode:zipcode,
                         email:email,
                         password:password}
 
         var convertToJSON =  JSON.stringify(objects);
         localStorage.setItem(email, convertToJSON);
 
         
 
 
        
 
 
     }
  

})