
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase конфигурация
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

// Элементы
const mainContent = document.getElementById('main-content');
const btnAuth = document.getElementById('btn-auth');
const btnProfile = document.getElementById('btn-profile');

function showHome() {
  mainContent.innerHTML = '<div class="card"><h2>Романы</h2><p>Тут будет список романов</p></div>';
}
function showLogin() {
  mainContent.innerHTML = `
    <div class="card">
      <h2>Вход / Регистрация</h2>
      <input id="email" placeholder="Email" />
      <input id="password" type="password" placeholder="Пароль" />
      <button id="loginBtn">Войти</button>
      <button id="registerBtn">Регистрация</button>
    </div>`;
  document.getElementById("loginBtn").onclick = () => {
    const email = email.value;
    const password = password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("Вы вошли")).catch(err => alert(err.message));
  };
  document.getElementById("registerBtn").onclick = () => {
    const email = email.value;
    const password = password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("Пользователь создан")).catch(err => alert(err.message));
  };
}
function showProfile(user) {
  mainContent.innerHTML = \`<div class="card"><h2>Профиль</h2><p>\${user.email}</p><button onclick="signOut(auth)">Выйти</button></div>\`;
}

// Навигация
document.getElementById("btn-home").onclick = showHome;
document.getElementById("btn-settings").onclick = () => {
  mainContent.innerHTML = '<div class="card"><h2>Настройки</h2><p>Выбор языка, профиль и админ-панель</p></div>';
};
btnAuth.onclick = showLogin;

// Проверка авторизации
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

// Показываем домашнюю страницу по умолчанию
showHome();
