var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

var vokuId = null;
if (localStorage.getItem("voku_id")) { vokuId = localStorage.getItem("voku_id") }
else if (document.cookie && document.cookie.split("voku_id=")[0]) { vokuId = document.cookie.split("voku_id=")[0] }
else {
    db.collection("users").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        visits: []
    }).then((docRef) => {
        vokuId = docRef.id;
        localStorage.setItem("voku_id", vokuId);
        document.cookie = `voku_id=${vokuId}; expires=Tue, 19 Jan 2038 03:14:07 UTC`
    })
}