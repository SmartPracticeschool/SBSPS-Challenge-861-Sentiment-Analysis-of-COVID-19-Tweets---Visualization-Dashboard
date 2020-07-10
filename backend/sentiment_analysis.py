from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json
import sqlite3
from textblob import TextBlob 
from unidecode import unidecode
import time
import cred

def create_table():
  try:
      c.execute("CREATE TABLE IF NOT EXISTS sentiment(unix REAL, created_at TIMESTAMP NOT NULL, sentiment REAL, user_location TEXT, place TEXT)")
      c.execute("CREATE INDEX fast_unix ON sentiment(unix)")
      c.execute("CREATE INDEX fast_created_at ON sentiment(created_at)")
      c.execute("CREATE INDEX fast_sentiment ON sentiment(sentiment)")
      c.execute("CREATE INDEX fast_user_location ON sentiment(user_location)")
      c.execute("CREATE INDEX fast_place ON sentiment(place)")
      conn.commit()
  except Exception as e:
      print(str(e))

class listener(StreamListener):
  count = 0
  def on_connect(self):
    print("Connected!")
  def on_data(self, data):
      try:
          data = json.loads(data)
          listener.count += 1
          tweet = unidecode(data['text'])
          analysis = TextBlob(tweet)
          sentiment = analysis.sentiment.polarity
          print(data['created_at'])
          c.execute("INSERT INTO sentiment (unix, created_at, sentiment, user_location, place) VALUES (?, ?, ?, ?, ?)",
                (data['timestamp_ms'], data['created_at'], sentiment, data['user']['location'], data['place']))
          conn.commit()
          if listener.count == 100:
            return False
      except KeyError as e:
          print(str(e))

  def on_error(self, status):
      print(status)

if __name__ == "__main__":
  conn = sqlite3.connect('twitter.db')
  c = conn.cursor()
  create_table()
  #consumer key, consumer secret, access token, access secret.
  ckey = cred.CONSUMER_KEY
  csecret = cred.CONSUMER_TOKEN
  atoken = cred.ACCESS_TOKEN
  asecret = cred.ACCESS_TOKEN_SECRET
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