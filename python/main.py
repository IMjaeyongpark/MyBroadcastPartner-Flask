from flask import Flask, Response
from flask_cors import CORS

import requests as requests
import json
import pytchat
import pafy
import re
from werkzeug.exceptions import ClientDisconnected


app = Flask(__name__)
CORS(app)

running = True
print("실행레쓰고")

@app.route('/<BCID>/<Email>')
def sse(BCID, Email):
    def generate(BCID, Email):

        chat = pytchat.create(video_id=BCID)

        youtube_api_key = "AIzaSyBTh6c2K5gdPgQi22TlPKOUu75IJaLn594"
        video_url = 'https://www.googleapis.com/youtube/v3/videos'
        video_params = {
            'part': 'snippet',
            'id': BCID,
            'key': youtube_api_key
        }
        video_r = requests.get(video_url, video_params)
        video_data = json.loads(json.dumps(video_r.json()))
        BC_published = video_data["items"][0]["snippet"]["publishedAt"]

        client_id = "qefqu0dlxn"
        client_secret = "fYXO7VBssTUEfeLjEY8h7KUfqsisk5XYrWjbO5Py"
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
                        mes = re.sub(r':[^:]+:', '', c.message)
                        data2 = {
                            "author": c.author.name,
                            "dateTime": c.datetime,
                            "message": mes,
                            "emotion3": 0,
                            "emotion7": 0
                        }
                        yield f"data:{data2}\n\n"
                        """
                        message = re.sub(r"[^\uAC00-\uD7A3a-zA-Z\s]", "", c.message)
                        data = {"content": c.message}
                        response = requests.post(url, data=json.dumps(data), headers=headers)
                        text = response.json()
                        header = {"Content-type": "application/json", "Accept": "text/plain"}
                        mes = re.sub(r':[^:]+:', '', c.message)
                        if 'sentences' in text:
                            
                            
                            sen = text['sentences'][0]
                            emotion7 = requests.get(
                                "http://10.20.102.62:2942/ai/"+c.message
                                ).json()

                            data2 = {
                                "author": c.author.name,
                                "dateTime": c.datetime,
                                "message": mes,
                                "emotion3": jsonmax(sen['confidence']),
                                "emotion7": emotion7
                            }
                            yield f"data:{data2}\n\n"
                            requests.get(
                                "http://localhost:8080/chat?email=" + Email + "&BCID=" + BCID + "&name=" + c.author.name,
                                data=json.dumps(data2), headers=header)
                        else:
                            data2 = {
                                "author": c.author.name,
                                "dateTime": c.datetime,
                                "message": c.message,
                                "emotion3": 2,
                                "emotion7": emotion7
                            }

                            yield f"data:{data2}\n\n"
                            URI = "http://localhost:8080/chat?email=" + Email + "&BCID=" + BCID + "&name=" + c.author.name
                            response = requests.get(URI, data=json.dumps(data2), headers=header)"""

                        preName = c.author.name
                        preDate = c.datetime
            except ClientDisconnected:
                print("클라이언트 연결 종료")
                break

    return Response(generate(BCID, Email), mimetype='text/event-stream')

def jsonmax(data):
    max_value = max(data.values())
    index = 0
    for key, value in data.items():
        if value == max_value:
            return index
        index += 1

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8801, threaded=False, processes=10)
