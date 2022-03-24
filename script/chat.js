
//adding new chat docs

import { deleteDoc, doc } from "@firebase/firestore";
import { addDoc, serverTimestamp ,colRef ,
         getDocs,onSnapshot,where,query,orderBy,setDoc,onSnapshotsInSync
} from "./networks";


//setup realtime data

//update username

// update room


export class ChatRoom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = colRef;
        this.unsub;
    }

    //add chat function from your message Form
    async addChat(message){
         const date = new Date();
         await addDoc(colRef,{
            message : message,
            username : this.username ,
            room : this.room,
            createdAt: date
        }) 
    }

    //get the chat data
    getChats(calback){

        const q = query(this.chats, where('room', '==' , this.room),orderBy('createdAt'));
        this.unsub = 
        onSnapshot(q,snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type === 'added'){
                    let data = [];
                    let id = change.doc.id;
                    data.push({...change.doc.data(),id:id})
                    calback(data[0])
                }
            })
            })
        
    }

    //////////delete chat dunction

    // deleteChat(id){
    //         const deleteRef = doc(colRef,id);
    //         deleteDoc(deleteRef);
    // }
    //update name form
    updateName(username){
        this.username = username;
        localStorage.setItem('username',username);
    }

    //update room form
    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
    }
}
