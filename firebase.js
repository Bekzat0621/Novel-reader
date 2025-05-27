
// Firebase инициализация
const firebaseConfig = {
  apiKey: "AIzaSyDzJhLGXA8KvE5C5ZaftHfaR5mlRaLdPE0",
  authDomain: "novell7.firebaseapp.com",
  projectId: "novell7",
  storageBucket: "novell7.firebasestorage.app",
  messagingSenderId: "806101665846",
  appId: "1:806101665846:web:7db9faed9d9f92b80b3097"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
