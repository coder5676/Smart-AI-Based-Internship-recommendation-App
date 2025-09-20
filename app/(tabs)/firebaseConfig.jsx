// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage"; // 👈 for file uploads

const firebaseConfig = {
  apiKey: "AIzaSyBmbl8r97TWEpVwwPUQzJcMuvm4T9GmZ4E",
  authDomain: "sphere-classroom.firebaseapp.com", // ✅ fixed
  databaseURL: "https://sphere-classroom-default-rtdb.firebaseio.com",
  projectId: "sphere-classroom",
  storageBucket: "sphere-classroom.appspot.com", // ✅ fixed
  messagingSenderId: "782076398740",
  appId: "1:782076398740:web:90a088ade772b6f6b37881",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app); // 👈 now you can upload files
