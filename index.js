

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

var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  databaseURL: "https://rru-connect-epeevr.firebaseio.com"
});


const db = admin.firestore();


app.use(morgan('dev'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send({
      success: true
    });
  })

  

  app.post('/webhook', (request, response) => {
   
 
    const agent = new WebhookClient({ request, 
        
        
        
        response });
    const payload = {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "actions": [
                {
                    "type": "message",
                    "label": "ถูก",
                    "text": "ถูก"
                },
                {
                    "type": "message",
                    "label": "ไม่ถูก",
                    "text": "ไม่ถูก"
                }
            ],
            "text": "คุณได้รับคำตอบถูกต้องไหมคะ?"
        }
    };
    let date = new Date();

    //Count_Accuracy

    let Count_Intent = admin.firestore().collection("Count_Intent").doc(date.toLocaleDateString());



    //หมวดการลงทะเบียน
    //การเพิ่ม
    function Additional_Credit_Registration(agent) {
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

                    agent.add("การเพิ่มรายวิชา");
                    agent.add(payload่json); //แสดง paylaod


        
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