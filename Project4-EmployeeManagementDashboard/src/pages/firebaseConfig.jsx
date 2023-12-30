import { initializeApp } from "firebase/app";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPGv7iPRMKVHLsHs0j5VhQQo4pgMLrs-w",
    authDomain: "project4-employeemanagement.firebaseapp.com",
    projectId: "project4-employeemanagement",
    storageBucket: "project4-employeemanagement.appspot.com",
    messagingSenderId: "995908926211",
    appId: "1:995908926211:web:8a812e9c2c63069a408736",
    measurementId: "G-TW0Z7R1L3E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;