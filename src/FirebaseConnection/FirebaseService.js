import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAZTfHNiVKFP8YVt_0ygTgT5DTB-JoNmEc",
  authDomain: "ethi-74ffe.firebaseapp.com",
  databaseURL: "https://ethi-74ffe-default-rtdb.firebaseio.com",
  projectId: "ethi-74ffe",
  storageBucket: "ethi-74ffe.appspot.com",
  messagingSenderId: "1054447605152",
  appId: "1:1054447605152:web:b405e15454c31eaa9180c5",
  measurementId: "G-HNCSQ4PQ8L"
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export default firebase;

class FirebaseService {
  async createMessage({ message, uid, message_by_user, message_by_admin, admin_img, profession_name }) {
    try {
    
      const messageCollection = collection(firestore, uid);
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours %= 12;
      hours = hours || 12;
      const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;

      await addDoc(messageCollection, {
        message,
        user_id: uid,
        message_by: message_by_user,
        message_from: message_by_admin,
        img_from: admin_img,
        admin_profession: profession_name,
        created_at: time,
        actual_time_date: date,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error creating message:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
  
  messageRef({ customer_id }) {
    try {
      if (!customer_id) {
        throw new Error("Customer ID is required.");
      }




      return collection(firestore, customer_id);
    } catch (error) {
      console.error("Error retrieving message collection:", error);
      return null;
    }
  }
}

const firebaseService = new FirebaseService();
export { firebaseService };