let db = firebase.database();
let messages = db.ref('messages/');

function buildChatScreen(user) {
    $('#loading-screen, #sign-in-screen, #sign-up-screen').fadeOut("slow", function () {
        $('#root').html(ChatScreen(user));
        intializeChatScreenEventListeners(user);
    });
}


function ChatScreen(user) {
    const container = document.createElement('div');
    container.id = 'chat-screen';
    container.classList.add('chat-screen');


    container.innerHTML = `
    <div class="chat-header">  HEY!!!     ${user.displayName}<button id="sign-out-btn">SIGN OUT</button></div>

    <div id="messages-container" class="messages-container"></div>

    <div class="chat-screen-input-container">
        <input type="text" id="chat-screen-input" class="chat-screen-input"/>
        <div class="chat-screen-send-msg-btn" id="chat-screen-send-msg-btn"> 
            SEND
        </div>
    </div>
    `;

    return container;
}


function intializeChatScreenEventListeners(user) {
    $('#sign-out-btn').on('click', signOut);

    $('#chat-screen-send-msg-btn').on('click', function () {

        sendMessage(user.uid, user.displayName, user.email, user.photoURL);
    });

    $('#chat-screen-input').keypress(function (e) {
        if (e.keyCode === 13) {
            sendMessage(user.uid, user.displayName, user.email, user.photoURL);
        }
    }).keyup(function () {
        //cool stuff
    });

    messages.on('value', function (snapshot) {
        // console.log(snapshot.val());
      
        $("#messages-container").html("");
        let msgs = snapshot.val();

        for (let id in msgs) {
            let msg = msgs[id];

            $("#messages-container").append(
            `   <div id="messages_inside">
                <div style="flex-grow: 1; padding: 10px;" class="talk-bubble tri-right">
                <div class="name"><strong>${msg.name}</strong>:</div>
                <img class"img" id="userimg" src="http://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/users-icon.png"></img>
                <div class="msg">${msg.text}</div>
                <div class="date">
                    <div>${format.date(new Date(msg.date)).date}</div>
                    <div>${format.date(new Date(msg.date)).time}</div>
                </div>
                </div>
                </div>
            `
            );
        }
        // scroll();
    });

}

////////////////////////

function sendMessage(uid, name, email, img) {
    let date = new Date();
    let text = $("#chat-screen-input").val();

    console.log('sending message', text);

    if (text) {
        messages.push({
            uid: uid,
            name: name,
            text: text,
            date: date.toString(),
            email: email,
            img: img

        });
        $("#chat-screen-input").val('');
    }
}

function scroll() {
    $('#messages-container').scrollTop($('#messages-container')[0].scrollHeight);
    
}


let format = {
    date: (date) => {
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();

        let h = date.getHours();

        let hf = (h > 11) ? 'PM' : 'AM';
        let hh = (h > 12) ? h % 12 : h;
        let mm = date.getMinutes();
        let ss = date.getSeconds();

        if (d < 10) d = '0' + d;
        if (m < 10) m = '0' + m;
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;

        return {
            date: m + '/' + d + '/' + y,
            time: hh + ':' + mm + ':' + ss + ' ' + hf
        };
    }
}