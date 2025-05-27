
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    db.collection("books").doc(id).get().then(doc => {
      const data = doc.data();
      document.getElementById("book-title").innerText = data.title;
      document.getElementById("book-content").innerText = data.text;
    });
  }
};
