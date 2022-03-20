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
      apiKey: "AIzaSyBS2gZsoGsDwJyJo2mC1s9j6gfZys_dw8g",
      authDomain: "fir-chat-app-4c233.firebaseapp.com",
      projectId: "fir-chat-app-4c233",
      storageBucket: "fir-chat-app-4c233.appspot.com",
      messagingSenderId: "559187580793",
      appId: "1:559187580793:web:90e400ad83018397f781a8"
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