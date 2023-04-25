import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  setPersistence,
  browserLocalPersistence, onAuthStateChanged} from "firebase/auth";
import {db} from "./firebaseModel";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

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
        TemplateName: [],
        TemplateTempMin: [],
        TemplateTempMax: [],
        TemplateHumMin: [],
        TemplateHumMax: [],
        TemplatePresMin: [],
        TemplatePresMax: [],
        WeatherDataTime: [],
        WeatherDataDateMin: [],
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

  async getTemplateList() {
    let template = [];
    await getDocs(collection(db, "Templates")).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        template.push({ ...doc.data(), id: doc.id });
      });
      this.templates = template;
    });
  }

  async retrieveDataForEmail(email) {
    // Create a reference to the Data collection
    const dataCollectionRef = collection(db, "Data");

    //Create a reference to the document for the specified email account
    const documentRef = doc(dataCollectionRef, email);

    // Specify the fields you want to retrieve from the document
    const fieldsToRetrieve = [
      "WeatherDataTime",
      "WeatherDataDateMin",
      "WeatherDataHumData",
      "WeatherDataTempData",
      "WeatherDataPresData",
      "WeatherDataDate",
      "CurrentTemplateName",
      "CurrentIntervalsTempMin",
      "CurrentIntervalsTempMax",
      "CurrentIntervalsHumMin",
      "CurrentIntervalsHumMax",
      "CurrentIntervalsPresMin",
      "CurrentIntervalsPresMax",
      "NotificationsType",
      "NotificationsValue",
      "NotificationsLimitValue",
    ];
    try {
      // Retrieve only the specified fields from the document
      const doc = await getDoc(documentRef, { fieldPaths: fieldsToRetrieve });
      if (doc.exists()) {
        // The document exists, so retrieve its data
        const data = doc.data();
        // Store the data in an object
        return {
          WeatherDataTime: data.WeatherDataTime,
          WeatherDataDateMin: data.WeatherDataDateMin,
          WeatherDataHumData: data.WeatherDataHumData,
          WeatherDataTempData: data.WeatherDataTempData,
          WeatherDataPresData: data.WeatherDataPresData,
          WeatherDataDate: data.WeatherDataDate,
          currentTemplateName: data.CurrentTemplateName,
          currentIntervalsTempMin: data.CurrentIntervalsTempMin,
          currentIntervalsTempMax: data.CurrentIntervalsTempMax,
          currentIntervalsHumMin: data.CurrentIntervalsHumMin,
          currentIntervalsHumMax: data.CurrentIntervalsHumMax,
          currentIntervalsPresMin: data.CurrentIntervalsPresMin,
          currentIntervalsPresMax: data.CurrentIntervalsPresMax,
          notificationsType: data.NotificationsType,
          notificationsValue: data.NotificationsValue,
          notificationsLimitValue: data.NotificationsLimitValue,
        };
      } else {
        console.log(`No data found for email: ${email}`);
      }
    } catch (error) {
      console.log(`Error retrieving data: ${error}`);
    }
  }

}

export default Model;
