require("dotenv").config();
const url = process.env.MAPBOX_URL;
const api = process.env.MAPBOX_API;

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET',url+'chennai%20india.json?access_token='+api+'&limit=1',false);
xmlhttp.send(null);
console.log(xmlhttp.responseText);