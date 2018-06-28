function signUp(){
    let name = $('#name').val();
    let email = $('#email').val();
    let password= $('#password').val();
    let passwordConfirmation= $('#password-confirmation').val();

    //console.log('email', email);
    //console.log('password', password);
    //console.log('password confirmation', passwordConfirmation);

    if(!isValidEmail(email)){
        alert('Invalid Email');
    }
    else if (!isValidPassword(password)){
        alert('Invalid password');
    }
    else if (password !== passwordConfirmation){
        alert('passwords do not match');
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result){
            
        })
        .catch(function (error){
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage)
        });
    }
}


function emailAndPasswordAuth(){
    let email = $('#email_si').val();
    let password = $('#password_si').val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
    })
}