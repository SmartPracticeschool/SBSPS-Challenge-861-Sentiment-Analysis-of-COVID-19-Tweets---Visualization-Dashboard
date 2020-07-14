require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port ${process.env.PORT || 3001}`);
});

// app.use(express.static(path.join(__dirname, "frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/build/index.html"));
// });
const io = require("socket.io")(server);

//check chekpoint.json exists

const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://admin:${process.env.db_pass}@cluster0.ch6ky.mongodb.net/sentiment?retryWrites=true&w=majority&tls=true`;

const main = async() =>{
  const now = new Date()
  const time_str = now.getHours() + ':' + now.getMinutes()
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('connected')
  var data = fs.readFileSync('checkpoint.json')
  var tweet_id_fg = JSON.parse(data)[0];
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2][0];
  var sub_bar = JSON.parse(data)[3][0];
  var loc = JSON.parse(data)[4];
  const cursor = client.db('sentiment').collection('tweets').find({tweet_id:{$gt:tweet_id_fg}}).sort({_id:1});
  const result = await cursor.toArray();
  if (result.length>0){
    var pos_obj = 0, neg_obj=0, neu_obj=0;
    var factual = 0,emotional = 0;
    console.log(result.length);
    result.forEach((res) => {
      var polarity = res.polarity;
      var pol_flag = null;
      if (polarity > 0) {
        pie[0].value++;
        pos_obj++;
        pol_flag = 1;
      } else if (polarity < 0) {
        pie[1].value++;
        neg_obj++;
        pol_flag = -1;
      } else {
        pie[2].value++;
        neu_obj++;
        pol_flag = 0;
      }
      var subj = res.subjectivity;
      if (subj >= 0.5) emotional++;
      else factual++;
      var lat = res.latitude;
      var long = res.longitude;
      if (lat !== null & long !== null){
        if (pol_flag === 1) loc.push({id:'positive',latitude:lat,longitude:long});
        else if (pol_flag === -1) loc.push({id:'negative',latitude:lat,longitude:long});
        else if (pol_flag === 0) loc.push({id:'neutral',latitude:lat,longitude:long});
        if (loc.length>50) loc.shift();
      }
      tweet_id_fg = res.tweet_id;
    })
  }
  sub_bar.push({x:time_str,objectivity:factual,subjectivity:emotional})
  if (sub_bar.length>7) sub_bar.shift();
  line[0].data.push({x:time_str,y:pos_obj});
  line[1].data.push({x:time_str,y:neg_obj});
  line[2].data.push({x:time_str,y:neu_obj});
  if (line[0].data.length>10){
    line[0].data.shift();
    line[1].data.shift();
    line[2].data.shift();
  }
  console.log(tweet_id_fg,pie,JSON.stringify(line),sub_bar)
  const timeperiod = '2minutes';
  fs.writeFileSync("checkpoint.json",JSON.stringify([tweet_id_fg,pie,[line,timeperiod],[sub_bar,timeperiod],loc]))
  await client.close();
  io.emit("pie", pie);
  io.emit("line",[line,'2minutes']);
  io.emit("sub_bar",[sub_bar,'2minutes']);
  io.emit("loc",loc)
}

allData = () =>{
  data = fs.readFileSync('checkpoint.json');
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2];
  var sub_bar = JSON.parse(data)[3];
  var loc = JSON.parse(data)[4];
  io.emit("pie", pie);
  io.emit("line",line);
  io.emit("sub_bar",sub_bar);
  io.emit('loc',loc);
}

io.on("connection", (socket) => {
    // console.log("client connected");
    // socket.on("dashboard", () => {
    //   allData();
    // });
    allData();
});

// main();
setInterval(main,1000*60*2)