
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      db.collection("users").doc(user.user.uid).set({
        email,
        role: "user"
      });
    })
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      document.getElementById("status").innerText = "Вход выполнен";
      loadBooks();
    })
    .catch(e => alert(e.message));
}

function loadBooks() {
  db.collection("books").get().then(snapshot => {
    const list = document.getElementById("book-list");
    list.innerHTML = "<h2>Романы:</h2>";
    snapshot.forEach(doc => {
      const data = doc.data();
      const link = document.createElement("a");
      link.href = "read.html?id=" + doc.id;
      link.innerText = data.title;
      list.appendChild(link);
      list.appendChild(document.createElement("br"));
    });
  });
}
