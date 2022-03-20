
import {formatDistanceToNow ,formatDistance, toDate} from 'date-fns'

export class ChatUI{
    constructor(list){
        this.list = list;
    }
    //clear the render when you click a room
    clear(){
        this.list.innerHTML = '';
    }

    //render chat to dom
    render(data){
        //when = used dateFns pack
        const when = formatDistance(
            data.createdAt.toDate(),new Date(),
            {addSuffix: true},
        )

         //////////////////////HTML Template Method


        const html =   `
            <li class = "list-group-item">
            <span class = "username">${data.username}</span>
            <span class = "message">${data.message}</span>
            <div class= "time">${when}</div>
            <div class='id'>${data.id}</div> 
            </li>
        `

        //use the delete btn in html template after message span if you want
        // <span class = "delete ">delete</span>


        this.list.innerHTML += html;

        //////////////////////create element Method



        // const li = document.createElement('li');
        // this.list.appendChild(li);
        // const user = document.createElement('span');
        // const message = document.createElement('span');
        // const deleteBtn = document.createElement('span');
        // const time = document.createElement('div');
        // // const li = document.createElement('li');
        // // const li = document.createElement('li');

        // //add class text

        // li.classList.add('list-group-item')
        // user.classList.add('username')
        // message.classList.add('message')
        // deleteBtn.classList.add('delete')
        // time.classList.add('when')
        // //add innertext

        // user.innerHTML = `${data.username}`;
        // message.innerHTML = `${data.message}`;
        // deleteBtn.innerHTML = `delete`;
        // time.innerHTML = `${when}`

        // li.appendChild(user)
        // li.appendChild(message)
        // li.appendChild(deleteBtn)
        // li.appendChild(time)
    
        }


        
        //////////delete chat UI function


    // deleteChat(calback){
        
    //     const li = document.querySelectorAll('.delete');
    //     li.forEach(l=>{
    //         l.onclick = (e)=>{
    //             l.parentNode.remove()
    //             let id = l.parentNode.lastElementChild.innerText;
    //             calback(id)
    //         }
    //     })
            
    // }
        
    }