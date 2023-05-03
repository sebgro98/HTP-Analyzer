import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  setPersistence,
  browserLocalPersistence, onAuthStateChanged} from "firebase/auth";
import {db} from "./firebaseModel";
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";

class Model {
  constructor() {
    this.currentUserUID = undefined;
    this.correctLogInInfo = undefined;
    this.templates = {};
    this.currentLoggedInUser = undefined;
  }

  async Registration(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      await setDoc(doc(db, "Data", email), {
        CurrentTemplate: null,

        Templates: {
        },
        WeatherData: {
          Time: [],
          DateMin: [],
          Hum: [],
          Temp: [],
          Pres: [],
        },
        CurrentIntervals: {
          TempMin: [],
          TempMax: [],
          HumMin: [],
          HumMax: [],
          PresMin: [],
          PresMax: [],
        },
        Notifications: {
          Type: [],
          Value: [],
          LimitValue: [],
        },
        Forum: {
          Posts: [],
        },
        Outlets: {
          Temp: [],
          Hum: [],
          Pres: [],
        },
      });
      await setDoc(doc(db, "Users", userCredential.user.uid), {
        email: userCredential.user.email,
        password: password,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async getUser() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }

  async logIn(email, password) {
    const auth = getAuth();

    // Set the persistence type to local
    await setPersistence(auth, browserLocalPersistence);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.currentUserUID = userCredential.user.uid;
      this.currentLoggedInUser = email;
      console.log(this.currentLoggedInUser)
      return email;
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          throw new Error("Invalid email!");
        case "auth/user-not-found":
          throw new Error("Account does not exist!");
        case "auth/wrong-password":
          throw new Error("Invalid password!");
        default:
          throw new Error("Email or password invalid!");
      }
    }
  }

  async logout() {
    const auth = getAuth();
    try {
      console.log(this.currentLoggedInUser);
      await auth.signOut();
      console.log(this.currentLoggedInUser);
      this.currentLoggedInUser = undefined;
      console.log(auth.currentUser);
    } catch (error) {
      console.error(error);
    }
  }

  async getGeneralTemplateList() {
    let template = [];
    await getDocs(collection(db, "Templates")).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        template.push({ ...doc.data(), id: doc.id });
      });
      this.templates = template;
    });
  }

  async setCurrentTemplate(template) {
    //if (!template.id || !template.HumidityMin || !template.HumidityMax || !template.TempMin || !template.TempMax || !template.PressureMin || !template.PressureMax) return;
    const user = await this.getUser();
    console.log(template);
    const docRef = doc(db, "Data", user.email);
    updateDoc(docRef, {
      CurrentTemplate: template.id,
      "CurrentIntervals.TempMin": [template.TempMin],
      "CurrentIntervals.TempMax": [template.TempMax],
      "CurrentIntervals.HumMin": [template.HumidityMin],
      "CurrentIntervals.HumMax": [template.HumidityMax],
      "CurrentIntervals.PresMin": [template.PressureMin],
      "CurrentIntervals.PresMax": [template.PressureMax],
      });
  }
}

export default Model;
