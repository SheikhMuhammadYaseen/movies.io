import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBpRkSx7Qr0v_xAuP1KS_BWSFD41tsJ-SM",
  authDomain: "forproject-9cda5.firebaseapp.com",
  databaseURL: "https://forproject-9cda5-default-rtdb.firebaseio.com",
  projectId: "forproject-9cda5",
  storageBucket: "forproject-9cda5.firebasestorage.app",
  messagingSenderId: "241942574233",
  appId: "1:241942574233:web:901fd918f7d12f51443408",
  measurementId: "G-DQGDT3BT33"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);