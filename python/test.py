
from flask import Flask
from flask_cors import CORS
import requests
import json



app = Flask(__name__)

CORS(app)

@app.route('/1')
def index():
    data = {"message": "test message", "dateTime": "test date", "emotion3": 1, "emotion7": 2}
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    response = requests.post(' http://127.0.0.1:8080/User/chat?BCID=dyT_p1EJpdg&name=testname2', data=json.dumps(data), headers=headers)
    print(response)
    return 'Hello, Flask!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9900)
