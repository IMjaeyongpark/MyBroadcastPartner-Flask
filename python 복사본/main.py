from flask import Flask, Response

import requests as requests
import json

import pytchat
import pafy

import re

app = Flask(__name__)


@app.route('/test')
def zz():
    headers = {"Content-type": "application/json", "Accept": "text/plain"}
    data = {"dateTime": "test_date", "message": 'test_message', "emotion3": 2, "emotion7": 3}
    response = requests.post("http://localhost:8080/test2",
                             data=json.dumps(data), headers=headers)
    print(response)
    return "200"


@app.route('/sse/<BCID>')
def sse(BCID):
    def generate(chat, BCID):
        youtube_api_key = "AIzaSyBTh6c2K5gdPgQi22TlPKOUu75IJaLn594"
        client_id = "h3mnzl35ep"
        client_secret = "6UypzJ1ZtXiaRbnHYry9AkTewLS45TmfgjwNBYJq"
        pafy.set_api_key(youtube_api_key)
        url = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"

        headers = {
            "X-NCP-APIGW-API-KEY-ID": client_id,
            "X-NCP-APIGW-API-KEY": client_secret,
            "Content-Type": "application/json"
        }
        preName = ""
        preDate = ""
        while chat.is_alive():
            try:
                data = chat.get()
                items = data.items
                for c in items:
                    if not (preDate == c.datetime and preName == c.author.name):
                        message = re.sub(r"[^\uAC00-\uD7A3a-zA-Z\s]", "", c.message)
                        data = {
                            "content": message
                        }
                        response = requests.post(url, data=json.dumps(data), headers=headers)
                        text = response.json()
                        if 'sentences' in text:
                            sen = text['sentences'][0]

                            data = {"author": c.author.name, "datetime": c.datetime, "message": c.message,
                                    "emotion3": jsonmax(sen['confidence']), "emotion7": 2}
                            headers = {"Content-type": "application/json", "Accept": "text/plain"}
                            response = requests.post(
                                "http://localhost:8080/User/chat?BCID=" + BCID + "&name=" + c.author.name,
                                data=json.dumps(data), headers=headers)
                            yield f"{data}\n"
                        else:
                            data = {"author": c.author.name, "datetime": c.datetime, "message": c.message,
                                    "emotion3": "no",
                                    "emotion7": 2}
                            yield f"{data}\n"
                        preName = c.author.name
                        preDate = c.datetime
            except KeyboardInterrupt:
                chat.terminate()
                break

    video_id = BCID
    chat = pytchat.create(video_id=video_id)
    return Response(generate(chat, BCID), mimetype='text/event-stream')


def jsonmax(data):
    max_value = max(data.values())
    index = 0
    for key, value in data.items():
        if value == max_value:
            return index
        index += 1


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=9900, threaded=False, processes=2)
