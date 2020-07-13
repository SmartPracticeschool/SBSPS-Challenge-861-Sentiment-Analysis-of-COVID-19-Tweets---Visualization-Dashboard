const fs = require('fs');
var pie = [
    { id: "positive", label: "positive", value: 0 },
    { id: "negative", label: "negative", value: 0 },
    { id: "neutral", label: "neutral", value: 0 },
  ];
  var line = [
    {
      id :'positive',
      color:"hsl(360, 70%, 50%)",
      data :[]
    },
    {
      id:'negative',
      color:"hsl(128, 70%, 50%)",
      data:[]
    },
    {
      id :'neutral',
      color :"hsl(198, 70%, 50%)",
      data :[]
    }
  ];
var time = new Date().getTime();
fs.writeFile('checkpoint.json',JSON.stringify([time,pie,line]),(err) => {
    if (err) throw err;
    console.log('Done writing')
});

