import os
from flask import Flask
app = Flask(__name__)


@app.route("/")
def root():
    return "server is running"


@app.route("/analyse")
def analyse():
    # do something
    pass


if __name__ == '__main__':
    port = int(os.getenv("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
