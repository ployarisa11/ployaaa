

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 4000;

const functions = require("firebase-functions");

const { WebhookClient } = require("dialogflow-fulfillment");

const { Card, Suggestion, Payload } = require("dialogflow-fulfillment");
const LINE_MESSAGING_API = " https://notify-api.line.me/api/notify";



process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const firebase = require("firebase");
   
    var firebaseConfig = {
        apiKey: "AIzaSyA5KFIcemUtm1_i64TUyifV0WfKjbm9irk",
        authDomain: "rru-connect-epeevr.firebaseapp.com",
        databaseURL: "https://rru-connect-epeevr.firebaseio.com",
        projectId: "rru-connect-epeevr",
        storageBucket: "rru-connect-epeevr.appspot.com",
        messagingSenderId: "898597223567",
        appId: "1:898597223567:web:8cd2b5064e8edbaf20c4fa"
      };
      // Initialize Firebase
      const admin = firebase.initializeApp(firebaseConfig);

app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({
      success: true
    });
  })

  

  app.post('/webhook', (request, response) => {
   
    const agent = new WebhookClient({ request, response });
    


    


    //หมวดการลงทะเบียน
    //การเพิ่ม
    function Additional_Credit_Registration(agent) {
        const db = admin.firestore();
        let payload = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "actions": [
                    {
                        "type": "message",
                        "label": "ถูก",
                        "text": "ได้รับคำตอบถูกต้องในเรื่องการเพิ่มรายวิชา"
                    },
                    {
                        "type": "message",
                        "label": "ไม่ถูก",
                        "text": "ได้รับคำตอบไม่ถูกต้องในเรื่องการเพิ่มรายวิชา"
                    }
                ],
                "text": "คุณได้รับคำตอบถูกต้องไหมคะ?"
            }
        };

        //ประกาศตัวแปร payload เพื่อแสดงออกหน้าจอ
        let payload่json = new Payload(`LINE`, payload, { sendAsMessage: true });
      

            //return ข้อมูลคำตอบ 

            return db.firestore().collection('Registration').doc('Topic').collection('การเพิ่มรายวิชา').orderBy("date", "desc").limit(1).get().then((snapshot) => {
                snapshot.forEach(doc => {
                    agent.add("การเพิ่มรายวิชา\n" + doc.data().description);
                    agent.add(payload่json); //แสดง paylaod
                    //agent.add(date.toLocaleDateString());

                });
            });

        }
    

    let intentMap = new Map();


    //การลงทะเบียน
    intentMap.set("Additional_Credit_Registration", Additional_Credit_Registration);//การเพิ่ม

    agent.handleRequest(intentMap);
}
);
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });