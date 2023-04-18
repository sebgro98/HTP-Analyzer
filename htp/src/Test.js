import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import { db } from "./firebaseModel"
import { doc, setDoc, getDocs, collection} from "firebase/firestore";

class Model {
    constructor() {
        this.userUid = undefined;
    }

    async Details(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                getAuth(),
                email,
                password,
            );

            this.userUid = userCredential.user.uid;
            await setDoc(doc(db, "Users", userCredential.user.uid), {
                email: userCredential.user.email,
                password: password,

            });


        } catch (error) {
            alert(error.message);
        }
    }

}

export default Model;




