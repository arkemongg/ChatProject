import './style.css'
import './networks'
import{ChatRoom} from './chat'
import { ChatUI } from './ui'

//dom list for the chatUI class
const chatList = document.querySelector('.chat-list');

//local storage name
const username = localStorage.username ? localStorage.username : 'annonymous';

//class instances
const chatroom = new ChatRoom('general',username);
const chatUI = new ChatUI(chatList);

//get ChAT DATA first 
chatroom.getChats((data)=>{
    chatUI.render(data);

    /////delete chat at work


    // chatUI.deleteChat(id=>{
    //     chatroom.deleteChat(id);
    // });
})

//ADD CHat data;/send the message 
const formMessage = document.querySelector('.new-chat');
        formMessage.addEventListener('submit',e=>{

            e.preventDefault();
            const message  = formMessage.message.value.trim();

           chatroom.addChat(message)
           .then(()=>{
            formMessage.reset();
           });
                
            });



    // update new name and pop up the confirmation
    const updateNameForm = document.querySelector('.new-name');
    const updateMessage = document.querySelector('.update-message');

    updateNameForm.addEventListener('submit',e=>{
        e.preventDefault();
        let username = updateNameForm.name.value;

        console.log(username);

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
    chatroomDOM.addEventListener('click',e=>{
        if(e.target.tagName == 'BUTTON'){
            chatUI.clear();
            chatroom.updateRoom(e.target.getAttribute('id'));

    //get ChAT DATA after updateing the room
            chatroom.getChats((data)=>{
                chatUI.render(data);
                /////delete chat at work
                // chatUI.deleteChat(id=>{
                //     chatroom.deleteChat(id);
                // });
            })
        }
    })




    