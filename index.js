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
      agent.add("l;p");
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();

  intentMap.set("Additional_Credit_Registration", Additional_Credit_Registration);//การเพิ่ม
  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});