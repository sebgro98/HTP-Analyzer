import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import { db } from "./firebaseModel"
import { doc, setDoc, getDocs, collection} from "firebase/firestore";

class Model {
    constructor() {
        this.currentUserUID = undefined;
        this.correctLogInInfo = undefined;
        this.templates = {};
    }

    async Registration(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                getAuth(),
                email,
                password,
            );
            await setDoc(doc(db, "Data", email), {
                TemplateName: [],
                TemplateTempMin: [],
                TemplateTempMax: [],
                TemplateHumMin: [],
                TemplateHumMax: [],
                TemplatePresMin: [],
                TemplatePresMax: [],
                WeatherDataTime: [],
                WeatherDataDate: [],
                WeatherDataHumData: [],
                WeatherDataTempData: [],
                WeatherDataPresData: [],
                CurrentTemplateName: [],
                CurrentIntervalsTempMin: [],
                CurrentIntervalsTempMax: [],
                CurrentIntervalsHumMin: [],
                CurrentIntervalsHumMax: [],
                CurrentIntervalsPresMin: [],
                CurrentIntervalsPresMax: [],
                NotificationsType: [],
                NotificationsValue: [],
                NotificationsLimitValue: [],
            })
            await setDoc(doc(db, "Users", userCredential.user.uid), {
                email: userCredential.user.email,
                password: password,
            });

        } catch (error) {
            alert(error.message);
        }
    }

   async logIn(email, password){
        this.correctLogInInfo = true;
        signInWithEmailAndPassword(getAuth(), email, password).then((data) => {
            this.currentUserUID = data.user.uid;
            console.log(email)
        }).catch((error) => {
            this.correctLogInInfo = false;
            switch (error.code){
                case "auth/invalid-email":
                    alert("Invalid email!");
                    break;
                case "auth/user-not-found":
                    alert("Account does not exist!");
                    break;
                case "auth/wrong-password":
                    alert("Invalid password!");
                    break;
                default:
                    alert("Email or password invalid!");
                    break;
            }
        }).then(() => {
            if (this.correctLogInInfo){
                this.currentLoggedInUser = email;
            }
        })
    }

    async getTemplateList() {
        let data = []
        await getDocs(collection(db, "Templates")).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                data.push({ ...doc.data(), id:doc.id })
            })
            this.templates = data;
        })
    }
}

export default Model;




