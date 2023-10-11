import time
import random
import sys
from flask import Flask, Response
from flask_cors import CORS
from datetime import timedelta

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

# 인기 급상승 10위
api.add_resource(Po, '/po')

running = True
print("실행레쓰고")

load_dotenv()
youtube_api_key = os.environ.get('youtube_api_key')


# 실시간 구독자 수
@app.route('/subcnt/<channel_ID>')
def subcnt(channel_ID):
    youtube = build('youtube', 'v3', developerKey=youtube_api_key)
    request = youtube.channels().list(
        part='statistics',
        id=channel_ID
    )
    response = request.execute()

    if 'items' in response:
        statistics = response['items'][0]['statistics']
        subscriber_count = statistics['subscriberCount']
        return subscriber_count
    else:
        return "400"


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

        preName = ""
        preDate = ""
        while chat.is_alive():
            try:
                data = chat.get()
                items = data.items
                for c in items:
                    if not (preDate == c.datetime and preName == c.author.name):
                        mes = re.sub(r':[^:]+:', '', c.message)
                        IP = os.environ.get('server_IP')
                        emotion = requests.get(
                            IP + c.message
                        ).json()
                        emotion['emotion7'] = int(emotion['emotion7'])
                        emotion['emotion3'] = float(emotion['emotion3'])
                        if emotion['emotion7'] == 4 or (emotion['emotion3'] > 0.45 and emotion['emotion3'] < 0.55):
                            emotion['emotion3'] = 2
                        elif emotion['emotion3'] > 0.5:
                            emotion['emotion3'] = 1
                        else:
                            emotion['emotion3'] = 0

                        data2 = {
                            "author": c.author.name,
                            "dateTime": c.datetime,
                            "message": mes,
                            "emotion3": emotion['emotion3'],
                            "emotion7": emotion['emotion7']
                        }
                        yield f"data:{data2}\n\n"
                        header = {"Content-type": "application/json", "Accept": "text/plain"}
                        URI = "http://localhost:8080/chat?email=" + Email + "&BCID=" + BCID + "&name=" + c.author.name
                        requests.get(URI, data=json.dumps(data2), headers=header)
                        preName = c.author.name
                        preDate = c.datetime

            except ClientDisconnected:
                print("클라이언트 연결 종료")
                break

    return Response(generate(BCID, Email), mimetype='text/event-stream')


# 시청자 수
@app.route('/concurrentViewers/<BCID>')
def concurrentViewers(BCID):
    def viewer(BCID):
        header = {"Content-type": "application/json", "Accept": "text/plain"}
        URI = "https://www.googleapis.com/youtube/v3/videos?id=" + BCID + \
              "&key=" + youtube_api_key + "&part=snippet,contentDetails,statistics,status"
        res = requests.get(URI).json()
        published = datetime.strptime(res['items'][0]['snippet']['publishedAt'], '%Y-%m-%dT%H:%M:%SZ')
        url = f'https://www.googleapis.com/youtube/v3/videos?id={BCID}&key={youtube_api_key}&part=liveStreamingDetails'

        while 1:
            # YouTube API 호출
            response = requests.get(url)
            data = response.json()
            vi = data['items'][0]['liveStreamingDetails']['concurrentViewers']
            yield f"data:{vi}\n\n"
            t = datetime.now() - published
            spurl = f'http://localhost:8080/saveViewer?BCID={BCID}&sec={t.seconds}&viewer={vi}'
            requests.get(spurl, headers=header)
            time.sleep(15)

    return Response(viewer(BCID), mimetype='text/event-stream')


@app.route("/feedback/<BCID>")
def feedback(BCID):
    URI = f'http://localhost:8080/getChat?BCID={BCID}'
    data = requests.get(URI).json()
    published = datetime.strptime(data['published'], '%Y-%m-%dT%H:%M:%SZ')
    time_data = {}
    print(data)
    for key, value in data['viewer'].items():
        time_data[key] = [0, 0]

    for item in data['cd']:
        t = datetime.strptime(item['time'], '%Y-%m-%d %H:%M:%S')
        sec = (t - published).seconds
        for key, value in data['viewer'].items():
            print(value)
            if sec > int(key):
                time_data[key][item['emotion3']] += 1
                break
    min_Viewr = int(jsonmax(data['viewer']) * 0.7)
    max_emo = -1
    max_idx = 0
    min_emo = 9999999999999
    min_idx = 0
    for key, value in time_data.items():
        print(value)
        if int(key) > min_Viewr:
            if value[1] > max_emo:
                max_emo = value[1]
                max_idx = key
        if int(key) > min_Viewr:
            if value[0] < min_emo:
                min_emo = value[0]
                min_idx = key

    return f'{str((max_idx))}\n{str(min_idx)}'


def jsonmax(data):
    max_value = max(data.values())
    index = 0
    for key, value in data.items():
        if value == max_value:
            return index
        index += 1


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8801, threaded=False, processes=10)
