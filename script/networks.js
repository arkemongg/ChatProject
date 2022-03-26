import { initializeApp } from 'firebase/app'

    import {getFirestore,
            collection,
            getDocs,
            addDoc,
            serverTimestamp,
            onSnapshot,
            onSnapshotsInSync,
            setDoc,
            where,
            query,
            orderBy,
            deleteDoc,
            doc,
    } from 'firebase/firestore'

    import {    getAuth,
                createUserWithEmailAndPassword,
                signOut,signInWithEmailAndPassword,
                onAuthStateChanged,
                updateProfile
} from 'firebase/auth'


    const firebaseConfig = {
        
        apiKey: "AIzaSyCJyd8rKByIvigITwx4M1U4nBCTaqLIwB4",
        authDomain: "chat-js-new.firebaseapp.com",
        projectId: "chat-js-new",
        storageBucket: "chat-js-new.appspot.com",
        messagingSenderId: "221129926506",
        appId: "1:221129926506:web:6b4f1e72a862a00cb3e713"
              
    };
  
    // Initialize Firebase
     initializeApp(firebaseConfig);

    const auth = getAuth();
    const db = getFirestore();

    const colRef = collection(db,'chats');

export {collection,db,
            getDocs,colRef,
            addDoc,serverTimestamp,
            onSnapshot,where,
            query,orderBy,
            deleteDoc,doc,setDoc,onSnapshotsInSync}

export{getAuth,auth,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,onAuthStateChanged,
        updateProfile
}