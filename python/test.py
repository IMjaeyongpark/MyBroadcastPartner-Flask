
from flask import Flask
from flask_cors import CORS
import pytchat
import pafy
import json
from flask_sse import sse

import re

import requests as requests



app = Flask(__name__)
app.config["REDIS_URL"] = "redis://localhost"
app.register_blueprint(sse, url_prefix='/stream')
CORS(app)


@app.route('/send')
def send_message():
    message = 'This is a test message'
    sse.publish(message, type='message')
    url = "http://localhost:8080/message"
    data = {"message": "Hello, world!"}
    response = requests.post(url, data=data)

    if response.status_code == 200:
        print("Message sent successfully")
    else:
        print(f"Failed to send message. Response code: {response.status_code}")
    return 'Message sent'
@app.route('/1/<BCID>')
def index(BCID):

    data = {"message": "c.message", "dateTime": "test date", "emotion3": 1, "emotion7": 2}
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    response = requests.post('http://127.0.0.1:8080/User/chat?BCID='+BCID+
                             '&name='+"test name", data=json.dumps(data), headers=headers)
    print(response)
    return 'Hello, Flask!'



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9900)
