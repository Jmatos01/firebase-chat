function buildSignInScreen() {
    $('#loading-screen, #sign-up-screen, #chat-screen').fadeOut("fast", 
    function (){
        
     $('#root').html(SignInScreen());
     intializeSignInScreenEventListeners();
    });
    
}



function SignInScreen() {
    const container = document.createElement('div');
    container.id = 'sign-in-screen';
    container.classList.add('sign-in-screen');

    const googleAuthBtn = document.createElement('div');

    container.innerHTML = `
        <div id="sign-in-btn" class="sign-in-btn">
            <span class="btn-label">CHAT APP</span>
        </div>

        <img class="logo" src="data:image/png;base64,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" alt="">


        Email: <input class="email_si" id="email_si"></input>

        Password: <input class="password_si" id="password_si"></input>

        <button id="google_auth">SIGN IN W/ GOOGLE</button>

        <button id="facebook_auth">SIGN IN W/ FACEBOOK</button>

        <button id="signup_btn">SIGN UP</button>

        <button id="signin_btn">SIGN IN</button>

    `;

    return container;
}

function intializeSignInScreenEventListeners() {
    $('#google_auth').on('click', function () {
        createPersistantSession(googleAuth);
    });

    $('#facebook_auth').on('click', function () {
        createPersistantSession(facebookAuth);
    });

    $('#signin_btn').on('click', function () {
        createPersistantSession(emailAndPasswordAuth);
    });
    
    $('#signup_btn').on('click', function(){
        navigate('sign-up-screen')
    });
}