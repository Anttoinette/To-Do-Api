import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore";
import service_account from "./service_account.json" assert { type: "json" };

export function getFirestoreInstance(){
    try{
        // check if app has already been intialized
        const isInitialized = getApps().length > 0;
        if (!isInitialized) { // not initialized, connect to firebase
            initializeApp({
                credential: cert(service_account),
            })
        }
        return getFirestore();
    }
    catch{err => console.log(err)}
}