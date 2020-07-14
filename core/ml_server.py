from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy import API
from unidecode import unidecode
import tweepy
import json
import os
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

app = Flask(__name__)


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
                    urllib.parse.quote(address) + \
                    '?format=json&limit=1&countrycodes=in'
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


@app.route('/stop')
def stop():
    if process.is_alive():
        process.terminate()

    return "streaming stopped"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)
