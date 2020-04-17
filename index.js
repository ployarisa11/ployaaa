/*
  Webhook of Dialogflow
  @author: NottDev
  date: 31/05/2019
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 4000;
const admin = require('firebase-admin');

let serviceAccount = require('Admin_SDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


// Import the appropriate class
const {
  WebhookClient
} = require('dialogflow-fulfillment');

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    success: true
  });
})

app.post('/webhook', (req, res) => {
  console.log('POST: /');
  console.log('Body: ',req.body);

  //Create an instance
  const agent = new WebhookClient({
    request: req,
    response: res
  });

  //Test get value of WebhookClient
  console.log('agentVersion: ' + agent.agentVersion);
  console.log('intent: ' + agent.intent);
  console.log('locale: ' + agent.locale);
  console.log('query: ', agent.query);
  console.log('session: ', agent.session);




  //Function Location
  let user_id = request.body.originalDetectIntentRequest.payload.data.source.userId;
  let pay = {
      "type": "imagemap",
      "baseUrl": "https://s3-ap-southeast-1.amazonaws.com/img-in-th/9c33fe1533a8315572294fcdbe714231.jpg?_ignored=",
      "altText": "แบบประเมินความพึงพอใจ",
      "baseSize": {
        "width": 1040,
        "height": 554
      },
      "actions": [
        {
          "type": "message",
          "area": {
            "x": 19,
            "y": 247,
            "width": 163,
            "height": 297
          },
          "text": "มีความพึงพอใจต่อระบบน้อยที่สุด"
        },
        {
          "type": "message",
          "area": {
            "x": 237,
            "y": 249,
            "width": 155,
            "height": 293
          },
          "text": "มีความพึงพอใจต่อระบบน้อย"
        },
        {
          "type": "message",
          "area": {
            "x": 434,
            "y": 252,
            "width": 175,
            "height": 289
          },
          "text": "มีความพึงพอใจต่อระบบปานกลาง"
        },
        {
          "type": "message",
          "area": {
            "x": 650,
            "y": 252,
            "width": 154,
            "height": 286
          },
          "text": "มีความพึงพอใจต่อระบบมาก"
        },
        {
          "type": "message",
          "area": {
            "x": 855,
            "y": 254,
            "width": 164,
            "height": 283
          },
          "text": "มีความพึงพอใจต่อระบบมากที่สุด"
        }
      ]
      };
  
  
      let pay1 = new Payload(`LINE`, pay, { sendAsMessage: true });

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
                      "label": "ใช่",
                      "text": "ช่วยตอบคำถามในเรื่องการเพิ่มรายวิชา"
                  },
                  {
                      "type": "message",
                      "label": "ไม่ใช่",
                      "text": "ไม่ช่วยตอบคำถามในเรื่องการเพิ่มรายวิชา"
                  }
              ],
              "text": "น้องบ๊อตช่วยตอบคำถามของท่านใช่หรือไม่?"
          }
      };

      //ประกาศตัวแปร payload เพื่อแสดงออกหน้าจอ
      let payload่json = new Payload(`LINE`, payload, { sendAsMessage: true });
      let text = request.body.queryResult.queryText;
      let c = 'ช่วยตอบคำถามในเรื่องการเพิ่มรายวิชา';
      let b = 'ไม่ช่วยตอบคำถามในเรื่องการเพิ่มรายวิชา';

      //Count_Accuracy
      let Count_Accuracy = admin.firestore().collection("Count_Accuracy").doc(date.toLocaleDateString()).collection("การลงทะเบียน").doc("การเพิ่มรายวิชา");
      Count_Accuracy.get().then(function (docs) {
          if (!docs.exists) {
              Count_Accuracy.set({
                  ใช่: 0,
                  ไม่ใช่: 0
              });
          }

      });


      if (text === c) {
          agent.add("กรุณากดดาวเพื่อประเมินความพึงพอใจหลังการใช้ระบบ")
          agent.add(pay1);
          db.runTransaction(t => {
              return t.get(Count_Accuracy).then(doc => {
                  let newcount = doc.data().ใช่ + 1;

                  t.update(Count_Accuracy, {
                      ใช่: newcount,

                  });
              });
          });



      }

      else if (text === b) {

          agent.add("กรุณากดปุ่มติดต่อเจ้าหน้าที่");
          db.runTransaction(t => {
              return t.get(Count_Accuracy).then(doc => {
                  let newcount = doc.data().ไม่ใช่ + 1;

                  t.update(Count_Accuracy, {
                      ไม่ใช่: newcount,

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

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();

  intentMap.set("Additional_Credit_Registration", Additional_Credit_Registration);//การเพิ่ม
  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});