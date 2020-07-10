require("dotenv").config();
const express = require("express");
const app = express();
const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(express.static("public"));

const io = require("socket.io")(server);
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./twitter.db");

const allData = () => {
  let sql = "SELECT * FROM sentiment";
  let list = [
    {
      id: "positive",
      data: [],
    },
    {
      id: "negative",
      data: [],
    },
    {
      id: "neutral",
      data: [],
    },
  ];
  var pie = [
    { id: "positive", label: "positive", value: 0 },
    { id: "negative", label: "negative", value: 0 },
    { id: "neutral", label: "neutral", value: 0 },
  ];
  db.all(sql, [], (err, rows) => {
    var flag = null;
    var val = { pos: 0, neg: 0, neu: 0 };
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      var sentiment = row.sentiment;
      var date = row.created_at.slice(26) + row.created_at.slice(3, 16);
      //   var date = row.created_at.slice(3, 16);
      if (date === flag) {
        // console.log(date,flag)
        if (sentiment >= 0.2) {
          pie[0].value++;
          val.pos++;
        } else if (sentiment <= -0.2) {
          pie[1].value++;
          val.neg++;
        } else {
          pie[2].value++;
          val.neu++;
        }
      } else {
        // console.log(date,flag)
        if (flag !== null) {
          // console.log('not null')
          list[0].data.push({ x: flag.slice(12), y: val.pos });
          list[1].data.push({ x: flag.slice(12), y: val.neg });
          list[2].data.push({ x: flag.slice(12), y: val.neu });
        }
        flag = date;
        if (sentiment >= 0.2) {
          pie[0].value++;
          val.pos = 1;
          val.neg = 0;
          val.neu = 0;
        } else if (sentiment <= -0.2) {
          pie[1].value++;
          val.pos = 0;
          val.neg = 1;
          val.neu = 0;
        } else {
          pie[2].value++;
          val.pos = 0;
          val.neg = 0;
          val.neu = 1;
        }
      }
    });
    list[0].data.push({ x: flag, y: val.pos });
    list[1].data.push({ x: flag, y: val.neg });
    list[2].data.push({ x: flag, y: val.neu });
    console.log(JSON.stringify(list, null, 4));
    console.log(pie);
    io.emit("pie", pie);
    io.emit("line", list);
  });
};

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("dashboard", () => {
    allData();
  });
});
