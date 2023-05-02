import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  setPersistence,
  browserLocalPersistence, onAuthStateChanged} from "firebase/auth";
import {db} from "./firebaseModel";
import {collection, doc, getDoc, getDocs, setDoc, serverTimestamp, addDoc,} from "firebase/firestore";

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
        Template: {
          Name: [],
          TempMin: [],
          TempMax: [],
          HumMin: [],
          HumMax: [],
          PresMin: [],
          PresMax: [],
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
      throw error;
    }
  }


  async getPostsForUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const postsCollectionRef = collection(db, 'Posts', user.email, 'posts');
      const postsSnapshot = await getDocs(postsCollectionRef);
      const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return posts;
    } else {
      return [];
    }
  }

  async getAllPosts() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const postsCollectionRef = collection(db, 'Posts');
        const postsSnapshot = await getDocs(postsCollectionRef);
        const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return posts;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  }


  async addPost(title, content) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be signed in to create a post.');
    }
    const userDocRef = collection(db, 'Posts', user.email, 'posts');
    await addDoc(userDocRef, {
      title: title,
      content: content,
      author: user.email,
      timestamp: serverTimestamp()
    });
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

}

export default Model;
