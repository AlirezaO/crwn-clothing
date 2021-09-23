import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAfFWFYvB0rV0yM26yOKMBRlWkg6BPNIio",
    authDomain: "crwn-db-fae66.firebaseapp.com",
    projectId: "crwn-db-fae66",
    storageBucket: "crwn-db-fae66.appspot.com",
    messagingSenderId: "555046977077",
    appId: "1:555046977077:web:87e8ca3323823cbcf7fb7c",
    measurementId: "G-RNNCP071RY"
};

export const createUSerProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return ;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth; 
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error occured creating user!', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;