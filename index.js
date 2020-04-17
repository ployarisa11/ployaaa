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