var db = firebase.firestore(); db.settings({ timestampsInSnapshots: true });
var vokuId = "";
var currentUserData = null

vokuId = tryGetFromStorage()
if (!vokuId) { db.collection("users").add(emptyUser()).then(updateUserInfo) }
else {
    db.collection("users").doc(vokuId).get().then(docRef => {
        if (docRef.exists) { currentUserData = docRef.data(); return; }
        db.collection("users").doc(vokuId).set(emptyUser()).then(updateUserInfo)
    })
}

function tryGetFromStorage() {
    if (localStorage.getItem("voku_id")) { return localStorage.getItem("voku_id") }
    else if (document.cookie && document.cookie.split("voku_id=")[0]) { return document.cookie.split("voku_id=")[0] }
    else { return ""; }
}

function updateUserInfo(docRef) {
    if (!docRef) { return; }
    vokuId = docRef.id; currentUserData = docRef.data ? docRef.data() : emptyUser();
    localStorage.setItem("voku_id", vokuId);
    document.cookie = `voku_id=${vokuId}; expires=Tue, 19 Jan 2038 03:14:07 UTC`
}

function emptyUser() {
    return {
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        visitados: []
    }
}