function buildLoadingScreen() {
    $('#root').html(LoadingScreen());
    initializeLoadingScreenEventListeners();

    setTimeout(() =>{
        session();
    },2000);

    session();
}

function LoadingScreen(user){
    const container = document.createElement('div');
    container.id= 'loading-screen';
    container.classList.add('loading-screen');

    container.innerHTML =`
       <div><img class"img" id="userimg" src="http://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/users-icon.png"></img></div>
    
    `;

    return container;
}

function initializeLoadingScreenEventListeners(){

}