
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    firebase.firestore().collection("admins").doc(uid).get().then(doc => {
      if (!doc.exists) {
        window.location.href = "index.html";
      }
    });
  } else {
    window.location.href = "index.html";
  }
});
