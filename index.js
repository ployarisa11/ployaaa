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
  res.send(
    '<h1>Tes Express & Firebase Cloud Firestore</h1><ul><li><p><b>GET /data/esp8266</b></p></li><li><p><b>GET /data/esp32</b></p></li><li><p><b>GET /data/mkr1000</b></p></li><li><p><b>POST /data/esp8266</b>  => {suhu, lembab, analog}</p></li><li><p><b>POST /data/esp32</b>  => {suhu, lembab, analog}</p></li><li><p><b>POST /data/mkr1000</b>  => {suhu, lembab, analog}</p></li></ul>')
    const db = fire.firestore();
    const admin = fire.firestore();
    
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
