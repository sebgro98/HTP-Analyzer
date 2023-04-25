import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { db } from "./firebaseModel";
import { doc, setDoc, getDocs, collection, getDoc } from "firebase/firestore";

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

  async logIn(email, password) {
    this.correctLogInInfo = true;
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((data) => {
        this.currentUserUID = data.user.uid;
      })
      .catch((error) => {
        this.correctLogInInfo = false;
        switch (error.code) {
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
      })
      .then(() => {
        if (this.correctLogInInfo) {
          this.currentLoggedInUser = email;
        }
      });
  }
  // define a function to log out the user
async  logout() {
    return new Promise((resolve, reject) => {
      // perform logout logic here
      // for example, remove the user's access token
      localStorage.removeItem("access_token");

      // resolve the promise when logout is successful
      resolve();
    });
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
        const retrievedData = {
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
        return retrievedData;
      } else {
        console.log(`No data found for email: ${email}`);
      }
    } catch (error) {
      console.log(`Error retrieving data: ${error}`);
    }
  }
}

export default Model;
