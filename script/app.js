import './style.css'
import './networks'
import { Authentication } from './auth'
import { ChatRoom } from './chat'
import { ChatUI } from './ui'

//dom list for the chatUI class
const chatList = document.querySelector('.chat-list');

//local storage name
const username = localStorage.username ? localStorage.username : 'annonymous';

//class instances
const chatroom = new ChatRoom('general', username);
const chatUI = new ChatUI(chatList);
const authentication = new Authentication();

authentication.loggedIn(user => {
    chatUI.loggedInUI(user)
});
//get ChAT DATA first 
chatroom.getChats((data) => {
    chatUI.render(data);
    /////delete chat at work
    // chatUI.deleteChat(id=>{
    //     chatroom.deleteChat(id);
    // });
})
//login option


//ADD CHat data;/send the message 
const formMessage = document.querySelector('.new-chat');
formMessage.addEventListener('submit', e => {
    e.preventDefault();
    const message = formMessage.message.value.trim();

    chatroom.addChat(message)
        .then(() => {
            formMessage.reset();
        });

});



// update new name and pop up the confirmation
const updateNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');

updateNameForm.addEventListener('submit', e => {
    e.preventDefault();
    let username = updateNameForm.name.value;
    const name = document.querySelector('.name')
    console.log(name);
    if (name) {
        console.log(name);
        name.innerText = username;
    }
    authentication.profile(username);
    chatroom.updateName(username);
    updateNameForm.reset();

    //show and hide update message
    updateMessage.innerText = ` your name was updated to ${username}`;
    //timeout for update name pop up data
    setTimeout(() => {
        updateMessage.innerText = '';
    }, 3000);
})


//chat room update
const chatroomDOM = document.querySelector('.chat-rooms');
//chat room submit event
chatroomDOM.addEventListener('click', e => {
    if (e.target.tagName == 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));

        //get ChAT DATA after updateing the room
        chatroom.getChats((data) => {
            chatUI.render(data);
            /////delete chat at work
            // chatUI.deleteChat(id=>{
            //     chatroom.deleteChat(id);
            // });
        })
    }
})

//AUTH USERNAME/EMAIL




// console.log(authentication.logOut().auth.currentUser);

chatUI.mainBTNarea.addEventListener('click', e => {
    e.stopPropagation();

    if (e.target.className.includes('logout')) {
        const signOut = authentication.logOut().e;
        const signOutData = authentication.logOut().auth
        chatUI.logOutUI(signOut, signOutData);
    } else if (e.target.className.includes('login')) {
        chatUI.loginUI((email, password, loginForm, xBTN) => {
            authentication.login(email, password).then(() => {
                loginForm.reset();
                xBTN.click();
                chatroom.updateName(authentication.username);
            });
        });
    }
    else if (e.target.className.includes('sign-up')) {
        chatUI.signupUI((signupEmail, signuppassword, name, signupForm, xBTN) => {
            authentication.signUp(signupEmail, signuppassword)
                .then(cred => {
                    signupForm.reset();
                    xBTN.click();
                    authentication.profile(name);
                }).catch(error => {
                    console.log(error);
                })
            chatroom.updateName(name);
        });
    }
    else if (e.target.className.includes('name')){
        authentication.profileDetails(data=>{
            chatUI.profileUI(data,url=>{
                authentication.updateProfileDP(url);
            });
        })
    }

})





