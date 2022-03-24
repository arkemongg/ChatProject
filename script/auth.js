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

        this.unsub;

    }

    async signUp(signupEmail, signuppassword, name, signupForm, xBTN) {
        const email = signupEmail;
        const password = signuppassword;
        await createUserWithEmailAndPassword(auth,email,password)
            .then(cred => {
                signupForm.reset();
                xBTN.click();
                updateProfile(cred.user, {
                    displayName: name,
                }).then(() => {
                }).catch(error => {
                    console.log(error.code,error.message);
                })
            }).catch(error => {
                console.log(error.code,error.message);
            })
    }


    ///login area
    async login(email, password) {

        await signInWithEmailAndPassword(auth, email, password);

        
    }

    //user logged in

    loggedIn(callback) {
      this.unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                callback(user);
                console.log(auth);
            } else {
                callback();
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
}

export { Authentication }