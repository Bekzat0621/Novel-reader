import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzJhLGXA8KvE5C5ZaftHfaR5mlRaLdPE0",
  authDomain: "novell7.firebaseapp.com",
  projectId: "novell7",
  storageBucket: "novell7.appspot.com",
  messagingSenderId: "806101665846",
  appId: "1:806101665846:web:7db9faed9d9f92b80b3097",
  measurementId: "G-BBKZ09PVWG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("status").innerText = "Успешная регистрация: " + userCredential.user.uid;
  } catch (error) {
    document.getElementById("status").innerText = "Ошибка регистрации: " + error.message;
  }
};

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("status").innerText = "Успешный вход: " + userCredential.user.uid;
  } catch (error) {
    document.getElementById("status").innerText = "Ошибка входа: " + error.message;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("status").innerText = "Вы вошли как: " + user.uid;
  }
});