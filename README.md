# Sentiment Analysis of COVID-19 Tweets - Visualization Dashboard

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Repository Size](https://img.shields.io/github/repo-size/nipun24/COVID19-tweet-analyser)](https://github.com/nipun24/COVID19-tweet-analyser/archive/master.zip)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fcovid-19sentiment.eu-gb.cf.appdomain.cloud%2F)](https://covid-19sentiment.eu-gb.cf.appdomain.cloud/)

Twitter has always been a platform where people come together to put forth their opinions about issues. The current global concern is COVID-19 and this has led to a tremendous uproar of tweets relating to COVID-19. The large amounts of tweets produced definitely provide us the opportunity to analyze the tweets for all possible information - from people's activity and involvement to how the people are emotionally affected by the pandemic.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software

```
pyhton 3.8
node.js 12.16
Twitter Developer Account
MongoDB Atlas Account
```

### Installing

A step by step series of examples that tell you how to get a development env running

1. Setting up the Environment Variables

   Create `.env` files and add the values as present in the `.env.template` file.

2. Running the Flask Server

```
cd core
pip install -r requirements.txt
python ml_server.py
```

3. Running the Express.js server

```
npm i
npm start
cd frontend
npm i
npm run build
```

Now, go to `localhost:3001` on your browser to start using the app

## Deployment

The project is deployed on IBM Cloud Foundry. [Link](https://covid-19sentiment.eu-gb.cf.appdomain.cloud/)

## Built With

- [React.js](https://reactjs.org/) - The web framework used
- [Express.js](https://expressjs.com/) - Backend (javascript)
- [Socket.io](https://socket.io/) - Real-Time communication engine
- [Flask](https://flask.palletsprojects.com/) - Backend (python)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database

## Contributers

- [Nipun Haldar](https://github.com/nipun24)
- [Rahul Hebbar](https://github.com/rahul-hebbar)
- [Kesava Karri](https://github.com/kesava-karri)
- [Aditya Kumar](https://github.com/ak224001)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
