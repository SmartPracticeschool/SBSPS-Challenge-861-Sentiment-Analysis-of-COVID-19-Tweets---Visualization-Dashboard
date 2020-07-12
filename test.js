const fs = require('fs');
var pie = [
    { id: "positive", label: "positive", value: 0 },
    { id: "negative", label: "negative", value: 0 },
    { id: "neutral", label: "neutral", value: 0 },
  ];
var time = new Date().getTime();
fs.writeFile('piecheckpoint.json',JSON.stringify([time,pie]),(err) => {
    if (err) throw err;
    console.log('Done writing')
});
