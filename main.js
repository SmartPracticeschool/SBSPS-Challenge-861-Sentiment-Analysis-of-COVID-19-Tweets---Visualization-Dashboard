require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port ${process.env.PORT || 3001}`);
});

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

const io = require("socket.io")(server);

const fs = require("fs");

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://admin:${process.env.db_pass}@cluster0.ch6ky.mongodb.net/sentiment?retryWrites=true&w=majority&tls=true`;
async function main() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("connected");
  var data = fs.readFileSync("checkpoint.json");
  var tweet_id_fg = JSON.parse(data)[0];
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2];
  const cursor = client
    .db("sentiment")
    .collection("tweets")
    .find({ tweet_id: { $gt: tweet_id_fg } })
    .sort({ _id: 1 });
  const result = await cursor.toArray();
  if (result.length > 0) {
    var line_flag = result[0].created_at;
    var pos_obj = 0,
      neg_obj = 0,
      neu_obj = 0;
    console.log(result.length);
    result.forEach((res) => {
      var senti_flag = null;
      var polarity = res.polarity;
      if (polarity > 0) {
        pie[0].value++;
        senti_flag = "pos";
      } else if (polarity < 0) {
        pie[1].value++;
        senti_flag = "neg";
      } else {
        pie[2].value++;
        senti_flag = "neu";
      }
      var timestamp = res.created_at;
      var time_date = new Date(timestamp).getMinutes();
      var line_date = new Date(line_flag).getMinutes();
      if (time_date === line_date) {
        if (senti_flag === "pos") pos_obj++;
        else if (senti_flag === "neg") neg_obj++;
        else if (senti_flag === "neu") neu_obj++;
      } else if (time_date !== line_date) {
        line[0].data.push({ x: line_flag, y: pos_obj });
        line[1].data.push({ x: line_flag, y: neg_obj });
        line[2].data.push({ x: line_flag, y: neu_obj });
        if (line[0].data.length > 10) {
          line[0].data.shift();
          line[1].data.shift();
          line[2].data.shift();
        }
        if (senti_flag === "pos") (pos_obj = 1), (neg_obj = 0), (neu_obj = 0);
        else if (senti_flag === "neg")
          (pos_obj = 0), (neg_obj = 1), (neu_obj = 0);
        else if (senti_flag === "neu")
          (pos_obj = 0), (neg_obj = 0), (neu_obj = 1);
        line_flag = timestamp;
      }
      tweet_id_fg = res.tweet_id;
    });
  }
  line[0].data.push({ x: line_flag, y: pos_obj });
  line[1].data.push({ x: line_flag, y: neg_obj });
  line[2].data.push({ x: line_flag, y: neu_obj });
  if (line[0].data.length > 10) {
    line[0].data.shift();
    line[1].data.shift();
    line[2].data.shift();
  }
  console.log(tweet_id_fg, pie, JSON.stringify(line));
  fs.writeFileSync("checkpoint.json", JSON.stringify([tweet_id_fg, pie, line]));
  await client.close();
  io.emit("pie", pie);
  io.emit("line", line);
}

allData = () => {
  data = fs.readFileSync("checkpoint.json");
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2];
  io.emit("pie", pie);
  io.emit("line", line);
};

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("dashboard", () => {
    allData();
  });
  // allData();
});

// main();
setInterval(main, 1000 * 60 * 2);
