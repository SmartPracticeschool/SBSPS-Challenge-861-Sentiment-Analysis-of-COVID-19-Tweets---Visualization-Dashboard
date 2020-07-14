const fs = require("fs");
const { MongoClient } = require("mongodb");

// mongoDB URL
const uri = `mongodb+srv://admin:${process.env.db_pass}@cluster0.ch6ky.mongodb.net/sentiment?retryWrites=true&w=majority&tls=true`;

// function to initialize "checkpoint.js"
const init = (axisInterval) => {
  const initial_json = [
    "1282795889715818497",
    [
      { id: "positive", label: "positive", value: 0 },
      { id: "negative", label: "negative", value: 0 },
      { id: "neutral", label: "neutral", value: 0 },
    ],
    [
      [
        { id: "positive", data: [] },
        { id: "negative", data: [] },
        { id: "neutral", data: [] },
      ],
      axisInterval,
    ],
    [[], axisInterval],
    [],
  ];
  fs.writeFileSync("checkpoint.json", JSON.stringify(initial_json));
};

// function that keeps running to update data
const updater = async (io, interval) => {
  if (!fs.existsSync("checkpoint.json")) {
    init(interval);
  }
  const now = new Date();
  const time_str = now
    .toLocaleTimeString("en-US", { hour12: false })
    .slice(0, 5);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  var data = fs.readFileSync("checkpoint.json");
  var tweet_id_fg = JSON.parse(data)[0];
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2][0];
  var sub_bar = JSON.parse(data)[3][0];
  var loc = JSON.parse(data)[4];
  const cursor = client
    .db("sentiment")
    .collection("tweets")
    .find({ tweet_id: { $gt: tweet_id_fg } })
    .sort({ _id: 1 });
  const result = await cursor.toArray();
  if (result.length > 0) {
    var pos_obj = 0,
      neg_obj = 0,
      neu_obj = 0;
    var factual = 0,
      emotional = 0;
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
      if ((lat !== null) & (long !== null)) {
        if (pol_flag === 1)
          loc.push({ id: "positive", latitude: lat, longitude: long });
        else if (pol_flag === -1)
          loc.push({ id: "negative", latitude: lat, longitude: long });
        else if (pol_flag === 0)
          loc.push({ id: "neutral", latitude: lat, longitude: long });
        if (loc.length > 50) loc.shift();
      }
      tweet_id_fg = res.tweet_id;
    });
  }
  sub_bar.push({ x: time_str, objectivity: factual, subjectivity: emotional });
  if (sub_bar.length > 7) sub_bar.shift();
  line[0].data.push({ x: time_str, y: pos_obj });
  line[1].data.push({ x: time_str, y: neg_obj });
  line[2].data.push({ x: time_str, y: neu_obj });
  if (line[0].data.length > 10) {
    line[0].data.shift();
    line[1].data.shift();
    line[2].data.shift();
  }
  console.log(tweet_id_fg, pie, JSON.stringify(line), sub_bar);
  const timeperiod = interval;
  fs.writeFileSync(
    "checkpoint.json",
    JSON.stringify([
      tweet_id_fg,
      pie,
      [line, timeperiod],
      [sub_bar, timeperiod],
      loc,
    ])
  );
  io.emit("pie", pie);
  io.emit("line", [line, interval]);
  io.emit("bar", [sub_bar, interval]);
  io.emit("location", loc);
  await client.close();
};

const allData = (io, interval) => {
  if (!fs.existsSync("checkpoint.json")) {
    init(interval);
  }
  data = fs.readFileSync("checkpoint.json");
  var pie = JSON.parse(data)[1];
  var line = JSON.parse(data)[2];
  var sub_bar = JSON.parse(data)[3];
  var location = JSON.parse(data)[4];
  io.emit("pie", pie);
  io.emit("line", line);
  io.emit("bar", sub_bar);
  io.emit("location", location);
};

exports.init = init;
exports.allData = allData;
exports.updater = updater;
