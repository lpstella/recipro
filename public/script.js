
/* This function handles any errors in the form once the register button is clicked */

function registerButtonClick() {
     var email = document.getElementById('email-field').value;
     var displayName = document.getElementById('display-name-field').value;
     var password = document.getElementById('password-field').value;
     var repeatPass = document.getElementById('repeat-password-field').value;

     // If statement also needs to database for duplicate email input -- SQL seems to handle this itself -- done
     // Also need to catch the error on the server side as well as on the front end -- done
     // Probably gonna want nicer ways of handling these errors on the front end

     if (password === repeatPass) {                                                          // Catching input errors on the frontside
          if (email === '' || displayName === '' || password === '' || repeatPass === '') {
               alert('Please fill out all fields.');                                           // Handles blank field errors
          }

          if (email != '' && displayName != '' && password != '' && repeatPass != '') {     // Checking if all fields are filled out
               if (password.length < 4) {                                                 // Checking if password is at least 4 characters
                    alert('Password must be at least 4 characters.');      // Handles password length error
               }
               // console.log('Email: ', email);
               // console.log('Display Name: ', displayName);
               // console.log('Password: ', password);
               // console.log('Repeat Password', repeatPass);

               console.log('Successfully added ' + displayName + ' to the database...');
          }
     }
     else {
          alert('Passwords do not match. Try again.');           // Handles passwords not matching error
     }
}

window.addEventListener('DOMContentLoaded', function () {     // Add button event listeners inside of here to be loaded after all of the dom content

     let registerButton = document.getElementById('register-btn').addEventListener('click', registerButtonClick);

});