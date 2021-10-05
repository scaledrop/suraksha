import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// to be filled from firebase project
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userInfo = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userInfo.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userInfo.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    // console.log(userAuth);
    return userInfo;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
