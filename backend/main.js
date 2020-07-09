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

const sendPie = () => {
  let sql = "SELECT * FROM sentiment";
  var obj = [
    { id: "positive", label: "positive", value: 0 },
    { id: "negative", label: "negative", value: 0 },
    { id: "neutral", label: "neutral", value: 0 },
  ];
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      var sentiment = row.sentiment;
      if (sentiment >= 0.2) {
        obj[0].value++;
      } else if (sentiment <= -0.2) {
        obj[1].value++;
      } else {
        obj[2].value++;
      }
    });
    io.emit("pie", obj);
    console.log("pie data: ", obj);
  });
};

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("dashboard", () => {
    sendPie();
  });
});
