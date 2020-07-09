import tweepy
import json
import time
import re 
import cred #a py file with 4 variables CONSUMER_KEY CONSUMER_TOKEN ACCESS_TOKEN and ACCESS_TOKEN_SECRET

if __name__ == "__main__":
    auth = tweepy.OAuthHandler(cred.CONSUMER_KEY,cred.CONSUMER_TOKEN)
    auth.set_access_token(cred.ACCESS_TOKEN,cred.ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)
    l = ['#covidindia','#covid_19india','#covid19india','#GCCCovid19SOS',
        '#Covid19Chennai','#covid19#india','#IndiaFightsCOVID19','#lockdownindia'
        ,'#Lockdown4','#lockdown4guidelines','#socialdistancingIndia','#stayathomeindia',
        '#StayHomeIndia','#CoronaUpdatesInIndia']
    # l = ['#covid19#india']
    text_list = []
    for j in l:
        public_tweet = tweepy.Cursor(api.search, q = j,rpp = 100,tweet_mode="extended").items(20)
        for status in public_tweet:  
            remove_urls = re.sub(r'http[s]?://\S+', '', status.full_text, flags=re.MULTILINE)
            remove_emojis = remove_urls.encode('ascii', 'ignore').decode('ascii')
            remove_extrasp = re.sub(r'\s{2,}','',remove_emojis,re.MULTILINE)
            text_list.append(remove_extrasp)
    for i in text_list:
        print(i) 
    print(len(text_list))
    # stream = tweepy.Stream(auth, StdOutListner())
    # stream.filter(locations=[9.267195, 67.994751, 36.933406, 94.299676],languages=['en'])