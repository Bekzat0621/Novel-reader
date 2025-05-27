import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const novelsDiv = document.getElementById("novels");
const searchInput = document.getElementById("searchInput");

async function fetchNovels() {
  const querySnapshot = await getDocs(collection(db, "books"));
  let novels = [];
  querySnapshot.forEach((doc) => {
    novels.push(doc.data());
  });

  function displayNovels(filter = "") {
    novelsDiv.innerHTML = "";
    novels.filter(n => n.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(novel => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${novel.title}</h3><p>${novel.description}</p><hr>`;
        novelsDiv.appendChild(div);
      });
  }

  displayNovels();

  searchInput.addEventListener("input", () => {
    displayNovels(searchInput.value);
  });
}

fetchNovels();