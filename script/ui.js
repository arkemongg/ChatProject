import { formatDistanceToNow, formatDistance, toDate } from 'date-fns'
import { signOut } from 'firebase/auth';

export class ChatUI {
    constructor(list) {
        this.list = list;
        this.mainBTNarea = document.querySelector('.main-lsl');

        // logout BTN
        this.logout = document.createElement('div');
        this.logout.classList.add('logout', 'btn','position-absolute','end-0');
        this.logout.innerText = 'Logout';
        // LOGIN
        
        this.loginBTN = document.createElement('div');
        this.loginBTN.classList.add('login', 'btn','px-4');
        this.loginBTN.innerText = 'Login';
        
        //SIGN-UP

        this.signUpBTN = document.createElement('div');
        this.signUpBTN.classList.add('sign-up', 'btn','px-4','position-absolute','end-0');
        this.signUpBTN.innerText = 'Sign Up';

        // this.signUpBTN = document.querySelector('.sign-up');
        // this.loginBTN = document.querySelector('.login');
    }
    //clear the render when you click a room
    clear() {
        this.list.innerHTML = '';
    }
    //render chat to dom
    render(data) {
        //when = used dateFns pack
        const when = formatDistance(
            data.createdAt.toDate(), new Date(),
            { addSuffix: true },
        )

        //////////////////////HTML Template Method


        const html = `
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


    loginUI(callback) {
        //only a login button div nothing inside
        // const loginDIV = document.querySelector('.login');
        const container = document.querySelectorAll('.no-blur');
        const loginForm = document.querySelector('.login-form');
            // loginDIV.onclick = (e) => {
            container.forEach(c => {
                c.classList.toggle('blur');
                loginForm.classList.toggle('active');
            })
        // }
        //another html tamplate called .login-form

       
        const xBTN = document.querySelector('.cross');

        xBTN.onclick = () => {
            loginForm.classList.toggle('active');
            container.forEach(c => {
                c.classList.toggle('blur');
            })
        }

        loginForm.addEventListener('submit', e => {
            e.preventDefault();

            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();
            callback(email, password, loginForm, xBTN);
        })
    }
    signupUI(callback) {
        //only a login button div nothing inside
        // const signupDIV = document.querySelector('.sign-up');
        const container = document.querySelectorAll('.no-blur');
        const signupForm = document.querySelector('.signup-form');
        const xBTN = document.querySelector('.crosssign-up');
        // signupDIV.onclick = () => {
            container.forEach(c => {
                c.classList.toggle('blur');
                signupForm.classList.toggle('active');
            })
        // }
        //another html tamplate called .login-form

        

        xBTN.onclick = () => {
            signupForm.classList.toggle('active');
            container.forEach(c => {
                c.classList.toggle('blur');
            })
        }
        signupForm.addEventListener('submit', e => {
            e.preventDefault();

            const signupEmail = signupForm.signupemail.value.trim();
            const signuppassword = signupForm.signuppassword.value.trim();
            const name = signupForm.signupname.value;
            localStorage.setItem('username',name);
            this.name = name;
            callback(signupEmail, signuppassword, name, signupForm, xBTN)
        })

    }

    //logged in ui 

    loggedInUI(user) {
        if(user){

            const signUp= document.querySelector('.sign-up');
            const login= document.querySelector('.login')
            if(signUp && login){
                this.mainBTNarea.removeChild(signUp);
                this.mainBTNarea.removeChild(login);
            }
            
            this.name = document.createElement('div');
            this.name.classList.add('name', 'btn');
            // user.displayName ? this.displayName = user.displayName : this.displayName = this.name;

            let username = localStorage.getItem('username') ? localStorage.getItem('username'):user.displayName

            this.name.innerText = `${username}`;
            this.mainBTNarea.appendChild(this.name);
            this.mainBTNarea.append(this.logout);

            
        }
        else{
            this.mainBTNarea.append(this.loginBTN);
            this.mainBTNarea.append(this.signUpBTN);

            // const name = document.querySelector('.name')
            // console.log(name);
            // if(name){
            //     console.log(name);
            //     this.mainBTNarea.removeChild(name);
            // }

        }

    }

    //logged out 
    logOutUI(signout,signOutData){
        this.mainBTNarea.innerHTML = `<div class = 'logout-message btn position-absolute'>${signOutData.currentUser.displayName}  signed out</div>`;
        
        signout.then(() => {
            const signUp= document.querySelector('.sign-up');
            const login= document.querySelector('.login')
            if(signUp && login){
                this.mainBTNarea.removeChild(signUp);
                this.mainBTNarea.removeChild(login);
            }
            localStorage.clear();
            setTimeout(() => {
                this.mainBTNarea.innerHTML = ``;
                this.mainBTNarea.append(this.loginBTN);
                this.mainBTNarea.append(this.signUpBTN);
            }, 1000);
        })
    }

}