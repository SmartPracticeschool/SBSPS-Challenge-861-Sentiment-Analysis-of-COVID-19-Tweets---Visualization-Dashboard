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



io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("dashboard", () => {
      allData();
    });
});