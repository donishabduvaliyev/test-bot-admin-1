
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDxkbTcnQLClwiFfdtajJL8mlqn_awdXGs",
    authDomain: "test-bot-admin.firebaseapp.com",
    projectId: "test-bot-admin",
    storageBucket: "test-bot-admin.firebasestorage.app",
    messagingSenderId: "902066054570",
    appId: "1:902066054570:web:73d0b46aa2c2c75e9fb7d3",
    measurementId: "G-96YC4PBNN4"
};


export const  app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);