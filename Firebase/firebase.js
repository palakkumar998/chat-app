
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Firestore, getStorage } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPsgi2TR9JYrXgTUOwTcVQCFSpBQugEY4",
    authDomain: "fire-chat-a2391.firebaseapp.com",
    projectId: "fire-chat-a2391",
    storageBucket: "fire-chat-a2391.appspot.com",
    messagingSenderId: "753061246646",
    appId: "1:753061246646:web:c182a573d307f667555817"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = Firestore(app);