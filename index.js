const express = require('express')
const PORT = process.env.PORT || 5000
var app = express();
var fire = require('./fire')
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
 
    
    const db = fire.firestore();
    const admin = fire.firestore();
    res.send('<h1>sl</h1>' )
    console.log("pp")
    admin.firestore().collection('Registration').doc('Topic').collection('การเพิ่มรายวิชา').orderBy("date", "desc").limit(1).get().then((snapshot) => {
      snapshot.forEach(doc => {
        res.send('<h1>sl</h1>' )
          console.log(doc.data().description);
        
  
      });
    });
  })



app.post('/webhook', (req, res)=>{
  const db = fire.firestore();
  const admin = fire.firestore();
  
  admin.firestore().collection('Registration').doc('Topic').collection('การเพิ่มรายวิชา').orderBy("date", "desc").limit(1).get().then((snapshot) => {
    snapshot.forEach(doc => {
      
        console.log(doc.data().description);
      

    });
});
})








app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
})
