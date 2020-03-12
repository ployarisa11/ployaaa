

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



app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({
      success: true
    });
  })

  

  app.post('/webhook', (request, response) => {
   
    const agent = new WebhookClient({ request, response });
    
    const admin = require("firebase-admin");
    admin.initializeApp({
        apiKey: 'AIzaSyA5KFIcemUtm1_i64TUyifV0WfKjbm9irk',
        authDomain: 'rru-connect-epeevr.firebaseapp.com',
        projectId: 'rru-connect-epeevr'
      });


const db = admin.firestore();
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
        let text = request.body.queryResult.queryText;
        let c = 'ได้รับคำตอบถูกต้องในเรื่องการเพิ่มรายวิชา';
        let b = 'ได้รับคำตอบไม่ถูกต้องในเรื่องการเพิ่มรายวิชา';

        //Count_Accuracy
        let Count_Accuracy = admin.firestore().collection("Count_Accuracy").doc(date.toLocaleDateString()).collection("การลงทะเบียน").doc("การเพิ่มรายวิชา");
        Count_Accuracy.get().then(function (docs) {
            if (!docs.exists) {
                Count_Accuracy.set({
                    ถูก: 0,
                    ไม่ถูก: 0
                });
            }

        });


        if (text === c) {
            agent.add("ขอบคุณค่ะ");
            db.runTransaction(t => {
                return t.get(Count_Accuracy).then(doc => {
                    let newcount = doc.data().ถูก + 1;

                    t.update(Count_Accuracy, {
                        ถูก: newcount,

                    });
                });
            });



        }

        else if (text === b) {

            agent.add("กรุณากดปุ่มติดต่อเจ้าหน้าที่");
            db.runTransaction(t => {
                return t.get(Count_Accuracy).then(doc => {
                    let newcount = doc.data().ไม่ถูก + 1;

                    t.update(Count_Accuracy, {
                        ไม่ถูก: newcount,

                    });
                });
            });

        }
        else {
            //เชคว่ามี ตัว doc อยู๋ไหม ถ้าไม่ ก็ set ค่า 
            // count_intent 
            Count_Intent.get().then(function (docs) {
                if (!docs.exists) {
                    Count_Intent.set({
                        การลงทะเบียน: 1
                    });
                }

                else {
                    //เลขcount เวลามีคนเข้ามาสอบถาม

                    let transaction = db.runTransaction(t => {
                        return t.get(Count_Intent).then(doc => {
                            if (doc.data().การลงทะเบียน > 0) {
                                let newcount = doc.data().การลงทะเบียน + 1;

                                t.update(Count_Intent, {
                                    การลงทะเบียน: newcount,

                                });
                            } else {
                                t.update(Count_Intent, {
                                    การลงทะเบียน: 1
                                });

                            }

                        });
                    });
                }
            });


            //return ข้อมูลคำตอบ 

            return admin.firestore().collection('Registration').doc('Topic').collection('การเพิ่มรายวิชา').orderBy("date", "desc").limit(1).get().then((snapshot) => {
                snapshot.forEach(doc => {
                    agent.add("การเพิ่มรายวิชา\n" + doc.data().description);
                    agent.add(payload่json); //แสดง paylaod
                    //agent.add(date.toLocaleDateString());

                });
            });

        }
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