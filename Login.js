
const db = firebase.firestore();//สร้าตัวแปร object สำหรับอ้างอิง firestore


function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
console.log(username)
// firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   window.alert("error + " + errorCode );
//   // ...
// });


}