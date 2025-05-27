
// Пример авторизации и отображения панели
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("adminBtn")?.style.setProperty("display", "inline-block");
  }
});
function logout() {
  firebase.auth().signOut().then(() => window.location.href = 'index.html');
}
