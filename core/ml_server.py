from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy import API
from unidecode import unidecode
import tweepy
import json
import os
<<<<<<< HEAD
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
=======
from flask import Flask, render_template, request, redirect, url_for, session, g, flash
from textblob import TextBlob
import time
import requests
import urllib.parse
import os
import pymongo
from dotenv import load_dotenv
import multiprocessing

load_dotenv()
port = int(os.getenv('PORT', 5000))

# Connect to MongoDb atlas Database
client = pymongo.MongoClient(
    f"mongodb+srv://{os.getenv('MONGO_USERNAME')}:{os.getenv('MONGO_PASSWORD')}@cluster0.ch6ky.mongodb.net/sentiment?retryWrites=true&w=majority")

# Open an existing database
db = client.sentiment.tweets
db.create_index([("tweet_id", 1)], unique=True)
>>>>>>> master

app = Flask(__name__)


<<<<<<< HEAD
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
=======
class listener(StreamListener):
    def on_connect(self):
        # Called initially to connect to the Streaming API
        print("You are now connected to the streaming API.")

    def on_error(self, status_code):
        # On error - if an error occurs, display the error / status code
        print('An Error has occured: ' + repr(status_code))
        return False

    def on_data(self, data):
        # This is the meat of the script...it connects to your mongoDB and stores the tweet
        try:
            # Decode the JSON from Twitter
            datajson = json.loads(data)

            # grap the id
            tweet_id = datajson['id_str']

            # grab the 'created_at' data from the Tweet to use for display
            created_at = datajson['created_at']

            # grap address
            address = datajson['user']['location']

            lati = None
            longi = None
            if address != None:
                address = unidecode(address)
                url = 'https://nominatim.openstreetmap.org/search/' + \
                    urllib.parse.quote(address) + '?format=json'
                response = requests.get(url).json()
                if len(response) > 0:
                    lati = response[0]["lat"]
                    longi = response[0]["lon"]

            tweet = unidecode(datajson['text'])
            analysis = TextBlob(tweet)
            polarity = analysis.sentiment.polarity
            subjectivity = analysis.sentiment.subjectivity

            # print out a message to the screen that we have collected a tweet
            print("Tweet collected at " + str(created_at))
            t = {
                "tweet_id": tweet_id,
                "created_at": created_at,
                "latitude": lati,
                "longitude": longi,
                "polarity": polarity,
                "subjectivity": subjectivity
            }
            print(t)

            # insert the data into the mongoDB into a collection called twitter_search
            db.insert_one(t)

        except Exception as e:
            print("error: ", e)


def stream():
    try:
        ckey = os.getenv("CKEY")
        csecret = os.getenv("CSECRET")
        atoken = os.getenv("ATOKEN")
        asecret = os.getenv("ASECRET")
        auth = OAuthHandler(ckey, csecret)
        auth.set_access_token(atoken, asecret)
        twitterStream = Stream(auth, listener())
        twitterStream.filter(track=['#covidindia', '#covid_19india', '#covid19india', '#GCCCovid19SOS',
                                    '#Covid19Chennai', '#covid19#india', '#IndiaFightsCOVID19', '#lockdownindia', '#Lockdown4', '#lockdown4guidelines', '#socialdistancingIndia', '#stayathomeindia',
                                    '#StayHomeIndia', '#CoronaUpdatesInIndia'])
    except Exception as e:
        print(str(e))


process = multiprocessing.Process(target=stream)


@app.route('/')
def home():
    return "Server is Running"


@app.route('/start')
def start():
    process.start()
    print(process)
    return "streaming started"


@app.route('/status')
def status():
    if process.is_alive():
        return "streaming is running"
    else:
        return "streaming is stopped"

>>>>>>> master

@app.route('/stop')
def stop():
    if process.is_alive():
        process.terminate()

<<<<<<< HEAD
# @app.route("/analyse")
# def analyse():
=======
    return "streaming stopped"
>>>>>>> master

#     return 'streaming'

<<<<<<< HEAD
if __name__ == '__main__':
    # conn = db.connect("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-07.services.eu-gb.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=rjm75059;PWD=r+b90qw9kxmpx2g2;Security=SSL;", "", "")
    # c = conn.cursor()
    ckey = os.getenv('API_key')
    csecret = os.getenv('API_secret_key')
    atoken = os.getenv('Access_token')
    asecret = os.getenv('Access_token_secret')
    port = int(os.getenv("PORT", 8080))
    app.run(host='localhost', port=port, debug=True)
=======
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)
>>>>>>> master
