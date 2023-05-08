import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  setPersistence,
  browserLocalPersistence, onAuthStateChanged} from "firebase/auth";
import {db} from "./firebaseModel";
import {collection, doc, getDoc, getDocs, setDoc, serverTimestamp, addDoc, updateDoc, orderBy, query} from "firebase/firestore";

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
          Hum: [],
          Temp: [],
          Pres: [],
          Time: [],
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


  async addComment(postId, comment, author) {
    try {
      const auth = getAuth();
      const user = auth.currentUser.email;
      console.log('postId model:', postId);
      console.log('comment:', comment)
      console.log('author:', author)

      if (!user) {
        throw new Error('User not authenticated');
      }

      const postRef = doc(db, 'Posts', author, 'user_posts', postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        throw new Error('Post not found');
      }

      const commentsCollectionRef = collection(postRef, 'comments');
      const commentData = {
        comment,
        author,
        created_at: new Date().toISOString(),
      };
      await addDoc(commentsCollectionRef, commentData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /*async getPostById(postId) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const postRef = doc(db, 'Posts', user.email, 'user_posts', postId);
      console.log("haha", postRef)
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        return {
          id: postDoc.id,
          ...postData,
          author: user.email //
        };
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }*/

  /*async getPostsForUser(email) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(email, async (user) => {
        unsubscribe();
        if (user) {
          try {
            const postsCollectionRef = collection(db, 'Posts', user.email, 'user_posts');
            const postsSnapshot = await getDocs(postsCollectionRef);
            const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(posts);
            resolve(posts);
          } catch (error) {
            reject(error);
          }
        } else {
          console.log("getPostsForUser: user not authenticated");
          resolve([]);
        }
      });
    });
  }*/


  async getAllComments(postId, author) {
    try {
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const postRef = doc(db, "Posts", author, "user_posts", postId);
            const commentsCollectionRef = collection(postRef, "comments");
            console.log("commentsCollectionRef", commentsCollectionRef);

            const querySnapshot = await getDocs(
                query(commentsCollectionRef, orderBy("comment.timestamp", "asc"))
            );
            console.log("querySnapshot.empty", querySnapshot.empty);

            const allComments = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("allComments", allComments);

            resolve(allComments);
          } else {
            console.log("No user found");
            resolve([]);
          }
          unsubscribe();
        }, (error) => {
          console.error(error);
          reject(error);
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getAllPosts() {
    try {
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
          if (user) {
            const postsCollectionRef = collection(db, 'Posts');
            const postsSnapshot = await getDocs(postsCollectionRef);
            const allPosts = [];

            for (const postDoc of postsSnapshot.docs) {
              const userPostsCollectionRef = collection(postDoc.ref, 'user_posts');
              const userPostsSnapshot = await getDocs(userPostsCollectionRef);

              const userPosts = userPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

              const orderedPosts = userPosts.sort((a, b) => b.timestamp - a.timestamp);

              allPosts.push(...orderedPosts);
            }

            console.log(allPosts);
            resolve(allPosts);
          } else {
            console.log('No user found');
            resolve([]);
          }
          unsubscribe();
        }, error => {
          console.error(error);
          reject(error);
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async addPost(title, content) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be signed in to create a post.');
    }

    const userPostsCollectionRef = collection(db, 'Posts', user.email, 'user_posts');

    // Check if the user_posts collection exists, and create it if it doesn't
    const userPostsCollectionSnapshot = await getDocs(userPostsCollectionRef);
    if (userPostsCollectionSnapshot.empty) {
      await setDoc(userPostsCollectionRef.parent, { [userPostsCollectionRef.id]: {} });
    }

    // Create a new post document with server timestamp
    await addDoc(userPostsCollectionRef, {
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
    if (!template.id || !template.HumidityMin || !template.HumidityMax || !template.TempMin || !template.TempMax || !template.PressureMin || !template.PressureMax) return;
    const user = await this.getUser();
    const docRef = doc(db, "Data", user.email);
    updateDoc(docRef, {
      CurrentTemplate: template.id,
      CurrentIntervals: {
        TempMin: [template.TempMin],
        TempMax: [template.TempMax],
        HumMin: [template.HumidityMin],
        HumMax: [template.HumidityMax],
        PresMin: [template.PressureMin],
        PresMax: [template.PressureMax],
      }
    });
  }
}

export default Model;
