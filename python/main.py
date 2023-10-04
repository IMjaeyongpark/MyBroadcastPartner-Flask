import time
import random

from flask import Flask, Response
from flask_cors import CORS

import requests as requests
import json
import pytchat
import pafy
import re
from werkzeug.exceptions import ClientDisconnected
from datetime import datetime
from googleapiclient.discovery import build
from flask_restful import Resource, Api
from Po import Po
from dotenv import load_dotenv
import os


app = Flask(__name__)
api = Api(app)
app.config['JSON_AS_ASCII'] = False
CORS(app)

#인기 급상승 10위
api.add_resource(Po, '/po')



running = True
print("실행레쓰고")

load_dotenv()
youtube_api_key = os.environ.get('youtube_api_key')


# 실시간 구독자 수
@app.route('/subcnt/<channel_ID>')
def subcnt(channel_ID):
    def getcnt(channel_ID):
        cur = 0
        youtube = build('youtube', 'v3', developerKey=youtube_api_key)
        request = youtube.channels().list(
            part='statistics',
            id=channel_ID
        )

        while True:
            response = request.execute()

            if 'items' in response:
                statistics = response['items'][0]['statistics']
                subscriber_count = statistics['subscriberCount']
                cur = subscriber_count
                yield cur + "\n\n"
            else:
                yield cur + "\n\n"
            time.sleep(1)

    return Response(getcnt(channel_ID), mimetype='text/event-stream')



# 유튜브 실시간 댓글 분석
@app.route('/live/<BCID>/<Email>')
def sse(BCID, Email):
    def generate(BCID, Email):

        chat = pytchat.create(video_id=BCID)

        # 방송 시작시간 가져오기
        video_url = 'https://www.googleapis.com/youtube/v3/videos'
        video_params = {
            'part': 'snippet',
            'id': BCID,
            'key': youtube_api_key
        }
        video_r = requests.get(video_url, video_params)
        video_data = json.loads(json.dumps(video_r.json()))
        published = video_data["items"][0]["snippet"]["publishedAt"]
        # datetime.timedelta타입으로 변환
        published = datetime.strptime(published, '%Y-%m-%dT%H:%M:%SZ')
        print(published)

        client_id = os.environ.get('client_id')
        client_secret = os.environ.get('client_secret')
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
                            "emotion3": random.randint(0,2),
                            "emotion7": random.randint(0,6)
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


#시청자 수
@app.route('/concurrentViewers/<BCID>')
def concurrentViewers(BCID):
    def viewers(BCID):
        # YouTube API 엔드포인트 URL
        url = f'https://www.googleapis.com/youtube/v3/videos?id={BCID}&key={youtube_api_key}&part=liveStreamingDetails'

        # YouTube API 호출
        while True:
            response = requests.get(url)
            data = response.json()
            vi = data['items'][0]['liveStreamingDetails']['concurrentViewers']
            print(vi)
            yield vi + "\n\n"
            time.sleep(5)

    return Response(viewers(BCID), mimetype='text/event-stream')



def jsonmax(data):
    max_value = max(data.values())
    index = 0
    for key, value in data.items():
        if value == max_value:
            return index
        index += 1


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8801, threaded=False, processes=10)
