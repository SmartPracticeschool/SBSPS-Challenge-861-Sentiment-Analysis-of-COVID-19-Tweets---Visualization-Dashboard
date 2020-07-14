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

async function main(){
  const now = new Date()
  const time_str = now.getHours() + ':' + now.getMinutes()
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('connected')
  var data = fs.readFileSync('checkpoint.json')
  var tweet_id_fg = JSON.parse(data)[0];
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2];
  var sub_pie = JSON.parse(data)[3];
  const cursor = client.db('sentiment').collection('tweets').find({tweet_id:{$gt:tweet_id_fg}}).sort({_id:1});
  const result = await cursor.toArray();
  if (result.length>0){
    var pos_obj = 0, neg_obj=0, neu_obj=0;
    console.log(result.length);
    result.forEach((res) => {
      var polarity = res.polarity;
      if (polarity > 0) {
        pie[0].value++;
        pos_obj++;
      } else if (polarity < 0) {
        pie[1].value++;
        neg_obj++;
      } else {
        pie[2].value++;
        neu_obj++;
      }
      var subjectivity = res.subjectivity;
      if (subjectivity >= 0.5) sub_pie[0].value++;
      else sub_pie[1].value++;
      tweet_id_fg = res.tweet_id;
    })
  }
  line[0].data.push({x:time_str,y:pos_obj});
  line[1].data.push({x:time_str,y:neg_obj});
  line[2].data.push({x:time_str,y:neu_obj});
  if (line[0].data.length>10){
    line[0].data.shift();
    line[1].data.shift();
    line[2].data.shift();
  }
  console.log(tweet_id_fg,pie,JSON.stringify(line),sub_pie)
  fs.writeFileSync("checkpoint.json",JSON.stringify([tweet_id_fg,pie,line,sub_pie]))
  await client.close();
  io.emit("pie", pie);
  io.emit("line",line);
  io.emit("sub_pie",sub_pie);
}

allData = () =>{
  data = fs.readFileSync('checkpoint.json');
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2];
  var sub_pie = JSON.parse(data)[3];
  io.emit("pie", pie);
  io.emit("line",line);
  io.emit("sub_pie",sub_pie);
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