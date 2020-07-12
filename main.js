require("dotenv").config();
const Twit = require('twit');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xmlhttp = new XMLHttpRequest();
const unidecode = require('unidecode');
const apostolex = require('apos-to-lex-form');
const natural = require('natural');
const { WordTokenizer,SentimentAnalyzer, PorterStemmer } = natural;
const tokenizer = new WordTokenizer();
const SW = require('stopword');
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
const express = require("express");
const app = express();
const fs = require('fs');
const moment = require('moment')
// const sqlite3 = require("sqlite3").verbose();
// let db = new sqlite3.Database("./twitter.db");

// express and socket server setup
const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
app.use(express.static("public"));
const io = require("socket.io")(server);

// twitter api setup
const T = new Twit({
  consumer_key:process.env.API_key,
  consumer_secret:process.env.API_secret_key,
  access_token:process.env.Access_token,
  access_token_secret:process.env.Access_token_secret,
});

// text cleaner and sentiment extraction
const cleanText = (text) =>{
  const lextext = apostolex(text)
  const lowertext = lextext.toLowerCase()
  const reftext = lowertext.replace(/[^a-zA-Z\s]+/g, '');
  const tokenized = tokenizer.tokenize(reftext);
  const filtered = SW.removeStopwords(tokenized);
  const sentiment = analyzer.getSentiment(filtered);
  return sentiment;
}

// search parameters
const params = ['#covidindia','#covid_19india','#covid19india','#GCCCovid19SOS',
'#Covid19Chennai','#covid19#india','#IndiaFightsCOVID19','#lockdownindia'
,'#Lockdown4','#lockdown4guidelines','#socialdistancingIndia','#stayathomeindia',
'#StayHomeIndia','#CoronaUpdatesInIndia']

// get tweets
const getData = () => {
  fs.readFile('piecheckpoint.json',(err,data) => {
    if (err) throw err;
    else{
      created_flag = JSON.parse(data)[0];
      console.log(created_flag);
      pie = JSON.parse(data)[1];
    }
  })
  T.get('search/tweets', { q: params.join(' OR ') ,count: 25 }, (err, data, response) => {
    if (err){
      throw err;
    } else {
      data.statuses.map((tweet) => {
          var timestamp = moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').valueOf();
          if (timestamp>created_flag){
            var text = unidecode(tweet.text);
            var sentiment = cleanText(text);
            if (sentiment>0){ pie[0].value++; }
            else if (sentiment<0){ pie[1].value++; }
            else { pie[2].value++; }
            xmlhttp.open('GET','https://nominatim.openstreetmap.org/search/'+encodeURI(tweet.user.location)+'?format=json&limit=1&countrycodes=in',false);
            xmlhttp.send(null);
            var resp = JSON.parse(xmlhttp.responseText);
            if (resp.length > 0){
                var lat = resp[0].lat;
                var lon = resp[0].lon;
            }
          }
      })
      created_flag = moment(data.statuses[0].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').valueOf();
      fs.writeFile('piecheckpoint.json',JSON.stringify([created_flag,pie]),(err) => { if (err) throw err;})
      console.log(created_flag);
      io.emit("pie", pie);
    }
  })
}

sendData = () => {
  fs.readFile('piecheckpoint.json',(err,data) => {
    if (err) throw err;
    else{
      var pie = JSON.parse(data)[1];
      io.emit('pie',pie);
    }
  });
}

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("dashboard", () => {
    sendData();
  });
    // sendData();
});

setInterval(getData,1000*60*1);