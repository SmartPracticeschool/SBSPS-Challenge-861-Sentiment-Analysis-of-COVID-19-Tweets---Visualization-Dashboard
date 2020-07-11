// require("dotenv").config();
// const url = process.env.MAPBOX_URL;
// const api = process.env.MAPBOX_API;

// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.open('GET',url+'chennai%20india.json?access_token='+api+'&limit=1',false);
// xmlhttp.send(null);
// console.log(xmlhttp.responseText);

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./twitter.db");

const allLine = () =>{
    let list = 
    [{
        id: 'positive',
        color: 'hsl(198, 70%, 50%)',
        data: []
     },
     {
         id:'negative',
         color: 'hsl(20, 70%, 50%)',
         data: []
     },
     {
         id:'neutral',
         color:'hsl(90, 70%, 50%)',
         data: []
     }
    ];
    let sql = "SELECT * FROM sentiment";
    db.all(sql, [], (err,rows) => {
        if(err){ throw err; }
        var flag = null;
        var val = {pos:0,neg:0,neu:0};
        rows.forEach((row) => {
            var sentiment = row.sentiment;
            var unix = row.unix;
            var date = new Date(unix);
            console.log(date)
        })
    });
}

allLine();