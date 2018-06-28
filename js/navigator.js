window.visited = [];
    
function navigate(screen, props){
    if (screen === 'sign-in-screen') {
        window.visited.push(screen)
        return buildSignInScreen();
    }
    if (screen === 'sign-up-screen') {
        window.visited.push(screen)
        return buildSignUpScreen();
    }
    if (screen === 'chat-screen' && window.user) {
        window.visited.push(screen);
        return buildChatScreen(props);
    }

    window.visited.push('sign-in-screen');
    buildSignInScreen();

}

function goBack(){
    let screen = window.visited.pop();

    navigate(window.visited[window.visited.length -1]);
    console.log('go back')

    return screen;
}