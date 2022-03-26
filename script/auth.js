import {
    auth, getAuth,
    createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from './networks'


// AUTH UI +DATA
class Authentication {
    constructor() {

        this.username;

    }

   async signUp(signupEmail, signuppassword) {
       await createUserWithEmailAndPassword(auth,signupEmail,signuppassword)
    }


    ///login area
    async login(email, password) {
        await signInWithEmailAndPassword(auth, email,password);
        
    }

    //user logged in

    loggedIn(callback) {
      onAuthStateChanged(auth, (user) => {
            if (user) {
                callback(user);
                this.username = auth.currentUser.displayName;
                console.log(auth,this.username);
            } else {
                callback();
                this.username;
            }
        });
    }

    //LOGOUT
    logOut() {
        const e = signOut(auth);
        return {e,auth}; 
    }

    profile(name){
            onAuthStateChanged(auth,user=>{
                
                console.log(user);
                updateProfile(user, {
                    displayName: name
                  }).then(() => {

                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
            })
    }

    profileDetails(callback){
        onAuthStateChanged(auth,user=>{
            console.log(user);
            callback(user)
        })
    }

    updateProfileDP(url){
        onAuthStateChanged(auth,user=>{
                
            updateProfile(user, {
                photoURL: url
              }).then(() => {

              }).catch((error) => {
                console.log(error.message);
              });
        })
    }
}

export { Authentication }