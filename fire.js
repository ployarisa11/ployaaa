var firebase = require('firebase')
// change lines below with your own Firebase snippets!
var config = {
  apiKey: "AIzaSyA5KFIcemUtm1_i64TUyifV0WfKjbm9irk",
    authDomain: "rru-connect-epeevr.firebaseapp.com",
    databaseURL: "https://rru-connect-epeevr.firebaseio.com",
    projectId: "rru-connect-epeevr",
    storageBucket: "rru-connect-epeevr.appspot.com",
    messagingSenderId: "898597223567",
    appId: "1:898597223567:web:8cd2b5064e8edbaf20c4fa"
};
const fire = firebase.initializeApp(config);
module.exports = fire;