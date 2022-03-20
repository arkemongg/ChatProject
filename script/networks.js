import { initializeApp } from 'firebase/app'

    import {getFirestore,
            collection,
            getDocs,
            addDoc,
            serverTimestamp,
            onSnapshot,
            onSnapshotsInSync,
            setDoc
            ,
            where,
            query,
            orderBy,
            deleteDoc,
            doc
    } from 'firebase/firestore'
    const firebaseConfig = {
        
        apiKey: "AIzaSyB-BXeGspkyzp0G3J5hYVQ_gkTOSG0srRQ",
  authDomain: "chatroom-project-js.firebaseapp.com",
  projectId: "chatroom-project-js",
  storageBucket: "chatroom-project-js.appspot.com",
  messagingSenderId: "38943838089",
  appId: "1:38943838089:web:b465ee8e0e211f6c909b58"
              
    };
  
    // Initialize Firebase
     initializeApp(firebaseConfig);

    const db = getFirestore();

    const colRef = collection(db,'chats');

    export {collection,db,
            getDocs,colRef,
            addDoc,serverTimestamp,
            onSnapshot,where,
            query,orderBy,
            deleteDoc,doc,setDoc,onSnapshotsInSync}