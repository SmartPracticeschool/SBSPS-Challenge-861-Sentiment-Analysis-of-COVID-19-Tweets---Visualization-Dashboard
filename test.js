// require("dotenv").config();
// const Twit = require('twit');
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const xmlhttp = new XMLHttpRequest();
// const unidecode = require('unidecode');
// const apostolex = require('apos-to-lex-form');
// const natural = require('natural');
// const { WordTokenizer,SentimentAnalyzer, PorterStemmer } = natural;
// const tokenizer = new WordTokenizer();
// const SW = require('stopword');
// const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

// // twitter api setup
// const T = new Twit({
//     consumer_key:process.env.API_key,
//     consumer_secret:process.env.API_secret_key,
//     access_token:process.env.Access_token,
//     access_token_secret:process.env.Access_token_secret,
// });

// var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-06.services.eu-gb.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=fnp27448;PWD=vtp2m5f809tf-9wl;Security=SSL;"

// // text cleaner and sentiment extraction
// const cleanText = (text) =>{
//     const lextext = apostolex(text)
//     const lowertext = lextext.toLowerCase()
//     const reftext = lowertext.replace(/[^a-zA-Z\s]+/g, '');
//     const tokenized = tokenizer.tokenize(reftext);
//     const filtered = SW.removeStopwords(tokenized);
//     const sentiment = analyzer.getSentiment(filtered);
//     return sentiment;
// }

// // search parameters
// const params = ['#covidindia','#covid_19india','#covid19india','#GCCCovid19SOS',
// '#Covid19Chennai','#covid19#india','#IndiaFightsCOVID19','#lockdownindia'
// ,'#Lockdown4','#lockdown4guidelines','#socialdistancingIndia','#stayathomeindia',
// '#StayHomeIndia','#CoronaUpdatesInIndia']

// const twitstream = () =>{
//     var stream = T.stream('statuses/filter', { track: params })
//     stream.on('tweet',(tweet) => {
//         var unix = tweet.timestamp_ms;
//         var cre = tweet.created_at;
//         var t_id = tweet.id;
//         var text = unidecode(tweet.text);
//         var sentiment = cleanText(text);
//         var lat = null;
//         var lon = null;
//         xmlhttp.open('GET','https://nominatim.openstreetmap.org/search/'+encodeURI(tweet.user.location)+'?format=json&limit=1&countrycodes=in',false);
//         xmlhttp.send(null);
//         var resp = JSON.parse(xmlhttp.responseText);
//         if (resp.length > 0){
//             lat = resp[0].lat;
//             lon = resp[0].lon;
//         }
//         console.log(unix,t_id,sentiment,lat,lon)
//         var obj = {
//             unix:unix,
//             cre:cre,
//             t_id:t_id,
//             sentiment:sentiment,
//             lat:lat,
//             lon:lon    
//         }
//     })
// }

// twitstream();
const file = new File('checkpoint.json')
