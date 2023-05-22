import time
from flask import Flask, Response
from flask_cors import CORS

import requests as requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/test')
def zz():
    headers = {"Content-type": "application/json", "Accept": "text/plain"}
    data = {"dateTime": "test_date", "message": 'test_message', "emotion3": 2, "emotion7": 3}
    response = requests.post("http://localhost:8080/test2",
                             data=json.dumps(data),headers=headers)
    print(response)
    return "200"


if __name__ == "__main__":
    app.run(debug=True,port=9900)