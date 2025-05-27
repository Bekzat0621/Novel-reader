import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzJhLGXA8KvE5C5ZaftHfaR5mlRaLdPE0",
  authDomain: "novell7.firebaseapp.com",
  projectId: "novell7",
  storageBucket: "novell7.appspot.com",
  messagingSenderId: "806101665846",
  appId: "1:806101665846:web:7db9faed9d9f92b80b3097"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const content = document.getElementById("content");
const btnHome = document.getElementById("homeBtn");
const btnSettings = document.getElementById("settingsBtn");
const btnAuth = document.getElementById("authBtn");
const btnProfile = document.getElementById("profileBtn");
let currentLang = localStorage.getItem("lang") || "ru";

function t(key) {
  fetch("lang.json").then(res => res.json()).then(dict => {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      el.textContent = dict[currentLang][k];
    });
  });
}
t();

btnHome.onclick = () => {
  content.innerHTML = "<h2 data-i18n='novelList'>Список романов</h2>";
  getDocs(collection(db, "novels")).then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      content.innerHTML += \`
      <div class="card">
        <h3>\${data.title}</h3>
        <p>\${data.description}</p>
      </div>\`;
    });
  });
  t();
};

btnSettings.onclick = () => {
  content.innerHTML = \`
    <div class="card">
      <h2 data-i18n='settings'>Настройки</h2>
      <select id="langSelect">
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select><br>
      <button onclick="document.getElementById('homeBtn').click()" data-i18n="back">Назад</button>
      <button id="adminPanel" style="display:none;" data-i18n="adminPanel">Админ-панель</button>
    </div>\`;
  document.getElementById("langSelect").value = currentLang;
  document.getElementById("langSelect").onchange = (e) => {
    currentLang = e.target.value;
    localStorage.setItem("lang", currentLang);
    t();
  };
  t();
  if (auth.currentUser?.email === "admin@example.com") {
    document.getElementById("adminPanel").style.display = "inline-block";
    document.getElementById("adminPanel").onclick = showAdmin;
  }
};

function showAuthForm() {
  content.innerHTML = \`
    <div class="card">
      <input id="email" placeholder="Email">
      <input id="pass" placeholder="Пароль" type="password">
      <button id="login">Войти</button>
      <button id="register">Регистрация</button>
    </div>\`;
  document.getElementById("login").onclick = () => {
    signInWithEmailAndPassword(auth, email.value, pass.value).then(() => btnHome.click()).catch(e => alert(e.message));
  };
  document.getElementById("register").onclick = () => {
    createUserWithEmailAndPassword(auth, email.value, pass.value).then(() => btnHome.click()).catch(e => alert(e.message));
  };
}

function showProfile(user) {
  content.innerHTML = \`
    <div class="card">
      <p><b>Email:</b> \${user.email}</p>
      <button onclick="signOut(getAuth())" data-i18n="back">Выйти</button>
    </div>\`;
  t();
}

function showAdmin() {
  content.innerHTML = \`
    <div class="card">
      <h2>Добавить роман</h2>
      <input id="title" placeholder="Название">
      <textarea id="description" placeholder="Описание"></textarea>
      <button id="addNovel">Добавить</button>
      <button onclick="document.getElementById('settingsBtn').click()" data-i18n="back">Назад</button>
    </div>\`;
  document.getElementById("addNovel").onclick = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    addDoc(collection(db, "novels"), { title, description }).then(() => btnHome.click());
  };
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    btnAuth.style.display = "none";
    btnProfile.style.display = "inline-block";
    btnProfile.onclick = () => showProfile(user);
  } else {
    btnAuth.style.display = "inline-block";
    btnProfile.style.display = "none";
  }
});

btnAuth.onclick = showAuthForm;
btnHome.click();
