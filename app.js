import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("novelForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await addDoc(collection(db, "books"), {
          title,
          description,
          createdBy: user.uid,
          createdAt: new Date()
        });
        alert("Роман добавлен!");
      } catch (e) {
        alert("Ошибка: " + e.message);
      }
    } else {
      alert("Вы не вошли в аккаунт.");
    }
  });
});