require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { allData, updater, init } = require("./main.js");

const updateInterval = 1000 * 60 * 30;
const axisInterval = "30 minutes";

// checking if "checkpoint.js exists"
if (!fs.existsSync("checkpoint.json")) {
  init(axisInterval);
}

// initialize express app
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port ${process.env.PORT || 3001}`);
});

// specifying the folder to server i.e. frontend
app.use(express.static(path.join(__dirname, "frontend/build")));

// routing all http requests to frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// initialize socket.io
const io = require("socket.io")(server);

// listening for connection on socket.io
io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("dashboard", () => {
    allData(io, axisInterval);
  });
});

// calling the updater function
setInterval(updater, updateInterval, io, axisInterval);
