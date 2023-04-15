import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {    getAuth, 
            updatePassword,
            EmailAuthProvider,
            reauthenticateWithCredential, 
} from 'firebase/auth';

import {    getFirestore, 
            setDoc,
            doc,
            updateDoc,
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCQQeeX3BzTkVj1q-y7lZ6EhSEysuekWOc",
    authDomain: "hit-project-55efb.firebaseapp.com",
    projectId: "hit-project-55efb",
    storageBucket: "hit-project-55efb.appspot.com",
    messagingSenderId: "1052152504948",
    appId: "1:1052152504948:web:e3ed0bdd21cc1eac8fa721",
    measurementId: "G-M4YRB5WHED"
  }
  
const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const auth = getAuth(app);
export const db = getFirestore(app)
  

export const createUserDocument = async (user, email) => {
    if (!user) return

    try {
        await setDoc(doc(db,'users', user.uid), {
            name: email,
          });   
    } catch (error) {
        console.log(error)
    }
}

export const updateUserName = async (name) => {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, {
        name: name,
    });
}
  
export const updateUserPassword = async (data) => {
    const user = auth.currentUser;
    try {
        const credential = EmailAuthProvider.credential(
            user.email,
            data.oldPassword
        );
        await reauthenticateWithCredential(user, credential) 
        await updatePassword(user, data.newPassword)
    } catch (err) {
       console.log(err)
    }
}
