from flask import Flask
app = Flask(__name__)


@app.route("/")
def root():
    return "server is running"


@app.route("/analyse")
def analyse():
    # do something


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
