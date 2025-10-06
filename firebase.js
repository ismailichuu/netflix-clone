
import { initializeApp } from "firebase/app";

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    addDoc,
    arrayUnion,
    collection,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    'apiKey': import.meta.env.VITE_FIREBASE_API,
    'authDomain': import.meta.env.VITE_FIREBASE_AUTH,
    'projectId': import.meta.env.VITE_FIREBASE_PROJECT,
    'storageBucket': import.meta.env.VITE_FIREBASE_STORAGE,
    'messagingSenderId': import.meta.env.VITE_FIREBASE_SENDER,
    'appId': import.meta.env.VITE_FIREBASE_APP,
    'measurementId': import.meta.env.VITE_FIREBASE_MEASUREMENT
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function signup(name, email, password) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
            watchlist: []
        })

        return true;

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1]);
    }
}

export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);

        return true;
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1]);
    }
}

export async function logout() {
    signOut(auth);
}

export async function updateWatchList(id, movieDetails) {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            toast.error('Watchlist not found!');
            return;
        }

        const userDoc = querySnapshot.docs[0].ref;

        const userData = querySnapshot.docs[0].data();

        const alreadyExists = userData.watchlist?.some(movie => movie.id === movieDetails.id);

        if (alreadyExists) {
            toast.info("Movie already in watchlist!");
            return;
        }

        await setDoc(
            userDoc,
            {
                watchlist: arrayUnion(movieDetails),
            },
            { merge: true }
        );

        toast.success('Added to Watchlist');
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
    }

}

export async function getWatchlist(id, movieId) {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', id));
        const querySnapshot = await getDocs(q);

        const userDetails = querySnapshot.docs[0].data();

        const alreadyExists = userDetails.watchlist?.some(movie => movie.id === movieId);

        return alreadyExists;

    } catch (error) {
        toast.error('error from firebase');
        console.log(error);
    }

}

export async function removeFromWatchlist(id, movieId) {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', id));
        const querySnapshot = await getDocs(q);
        const userDetails = querySnapshot.docs[0].data();

        const newWatchlist = userDetails.watchlist?.filter(movie => movie.id !== movieId) || [];

        const userDoc = querySnapshot.docs[0].ref;

        await setDoc(userDoc, {
            watchlist: newWatchlist
        }, {
            merge: true
        })

        toast.success('Removed from watchlist');

    } catch (error) {
        console.log(error);
        toast.error('something went wrong');
    }
}

export async function getFullWatchlist(id) {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', id));
        const querySnapshot = await getDocs(q);
        const userDetails = querySnapshot.docs[0].data();
        const { watchlist } = userDetails;
        return watchlist;
    } catch (error) {
        console.log(error);
    }
}

export { auth, db };
