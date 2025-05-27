
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      const data = doc.data();
      document.getElementById("user-info").innerText =
        "Email: " + data.email + "\nРоль: " + data.role;
    });
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
