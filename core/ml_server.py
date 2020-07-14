import os
from flask import Flask
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json
from textblob import TextBlob 
from unidecode import unidecode
import time
import requests
import urllib.parse
import ibm_db_dbi as db
from dotenv import load_dotenv,find_dotenv
load_dotenv(find_dotenv())

class listener(StreamListener):
  def on_connect(self):
    print("Connected!")
  def on_data(self, data):
      try:
          data = json.loads(data)
          tweet = unidecode(data['text'])
          analysis = TextBlob(tweet)
          polarity = analysis.sentiment.polarity
          subjectivity = analysis.sentiment.subjectivity
          address = data['user']['location']
          lati = None
          longi = None
          if address != None:
            address = unidecode(address)
            url = 'https://nominatim.openstreetmap.org/search/' + urllib.parse.quote(address) +'?format=json'
            response = requests.get(url).json()
            if len(response) > 0:
              lati = response[0]["lat"]
              longi = response[0]["lon"]
          print(data['timestamp_ms'],data['id'], polarity, subjectivity , lati, longi)
        #   c.execute("INSERT INTO sentiment (unix, id, pol, sub, lati, longi) VALUES (?, ?, ?, ?, ?, ?)",
        #         (data['timestamp_ms'], data['id'], polarity, subjectivity, lati, longi))
        #   conn.commit()
      except KeyError as e:
          print(str(e))

  def on_error(self, status):
      print(status)

app = Flask(__name__)


@app.route("/")
def root():
    try:
        auth = OAuthHandler(ckey, csecret)
        auth.set_access_token(atoken, asecret)
        twitterStream = Stream(auth, listener())
        twitterStream.filter(track=['#covidindia','#covid_19india','#covid19india','#GCCCovid19SOS',
        '#Covid19Chennai','#covid19#india','#IndiaFightsCOVID19','#lockdownindia'
        ,'#Lockdown4','#lockdown4guidelines','#socialdistancingIndia','#stayathomeindia',
        '#StayHomeIndia','#CoronaUpdatesInIndia'])
    except Exception as e:
        print(str(e))
        time.sleep(5)
    # return "server is running"


# @app.route("/analyse")
# def analyse():

#     return 'streaming'

if __name__ == '__main__':
    # conn = db.connect("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-07.services.eu-gb.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=rjm75059;PWD=r+b90qw9kxmpx2g2;Security=SSL;", "", "")
    # c = conn.cursor()
    ckey = os.getenv('API_key')
    csecret = os.getenv('API_secret_key')
    atoken = os.getenv('Access_token')
    asecret = os.getenv('Access_token_secret')
    port = int(os.getenv("PORT", 8080))
    app.run(host='localhost', port=port, debug=True)
