import time
import random

import flask
from flask import Flask, Response
from flask_cors import CORS
from datetime import timedelta
import datetime
import Ch_api
from flask import jsonify

from websocket import WebSocket
from cmd_type import CHZZK_CHAT_CMD

import requests as requests
import json
import pytchat
import pafy
import re
from werkzeug.exceptions import ClientDisconnected
from datetime import datetime
from googleapiclient.discovery import build
from flask_restful import Resource, Api
from top10 import top10
from dotenv import load_dotenv
import os
import certifi
import ssl
import asyncio
import websockets
from afreecatv_api import get_player_live


def create_app():
    app = Flask(__name__)
    return app


app = create_app()

api = Api(app)
app.config['JSON_AS_ASCII'] = False
CORS(app)

running = True
print("실행레쓰고")

load_dotenv()
youtube_api_key = os.environ.get('youtube_api_key')
topic_IP = os.environ.get('topic_IP')

# 인기 급상승 10위
api.add_resource(top10, '/po')


def generate(BCID, Email):
    print(BCID)
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
                        "emotion3": random.randint(0, 2),
                        "emotion7": random.randint(0, 6),
                        "platform": 0
                    }
                    yield f'data:{data2}\n\n'

                    # IP = os.environ.get('server_IP')
                    # emotion = requests.get(
                    #     IP + c.message
                    # ).json()
                    # emotion['emotion7'] = int(emotion['emotion7'])
                    # emotion['emotion3'] = float(emotion['emotion3'])
                    # if emotion['emotion7'] == 4 or (emotion['emotion3'] > 0.45 and emotion['emotion3'] < 0.55):
                    #     emotion['emotion3'] = 2
                    # elif emotion['emotion3'] > 0.5:
                    #     emotion['emotion3'] = 1
                    # else:
                    #     emotion['emotion3'] = 0
                    #
                    # data2 = {
                    #     "author": c.author.name,
                    #     "dateTime": c.datetime,
                    #     "message": mes,
                    #     "emotion3": emotion['emotion3'],
                    #     "emotion7": emotion['emotion7']
                    # }
                    # yield f"data:{data2}\n\n"
                    # URI = "http://localhost:8080/broadcast/chat?email=" + Email + "&BCID=" + BCID + "&name=" + c.author.name
                    # do_async(URI, data2)
                    # preName = c.author.name
                    # preDate = c.datetime

        except ClientDisconnected:
            print("클라이언트 연결 종료")
            break


class ChzzkChat:
    def __init__(self, streamer, cookies):
        self.streamer = streamer
        self.cookies = cookies
        self.sid = None
        self.userIdHash = Ch_api.fetch_userIdHash(self.cookies)
        self.chatChannelId = Ch_api.fetch_chatChannelId(self.streamer)
        self.channelName = Ch_api.fetch_channelName(self.streamer)
        self.accessToken, self.extraToken = Ch_api.fetch_accessToken(self.chatChannelId, self.cookies)
        self.connect()

    def connect(self):
        self.chatChannelId = Ch_api.fetch_chatChannelId(self.streamer)
        self.accessToken, self.extraToken = Ch_api.fetch_accessToken(self.chatChannelId, self.cookies)
        sock = WebSocket()
        sock.connect('wss://kr-ss1.chat.naver.com/chat')
        print(f'{self.channelName} 채팅창에 연결 중 .', end="")
        default_dict = {
            "ver": "2",
            "svcid": "game",
            "cid": self.chatChannelId,
        }
        send_dict = {
            "cmd": CHZZK_CHAT_CMD['connect'],
            "tid": 1,
            "bdy": {
                "uid": self.userIdHash,
                "devType": 2001,
                "accTkn": self.accessToken,
                "auth": "SEND"
            }
        }
        sock.send(json.dumps(dict(send_dict, **default_dict)))
        sock_response = json.loads(sock.recv())
        self.sid = sock_response['bdy']['sid']
        print(f'\r{self.channelName} 채팅창에 연결 중 ..', end="")
        send_dict = {
            "cmd": CHZZK_CHAT_CMD['request_recent_chat'],
            "tid": 2,
            "sid": self.sid,
            "bdy": {
                "recentMessageCount": 50
            }
        }
        sock.send(json.dumps(dict(send_dict, **default_dict)))
        sock.recv()
        print(f'\r{self.channelName} 채팅창에 연결 중 ...')
        self.sock = sock
        if self.sock.connected:
            print('연결 완료')
        else:
            raise ValueError('오류 발생')

    async def send(self, message: str):
        default_dict = {
            "ver": 2,
            "svcid": "game",
            "cid": self.chatChannelId,
        }
        extras = {
            "chatType": "STREAMING",
            "emojis": "",
            "osType": "PC",
            "extraToken": self.extraToken,
            "streamingChannelId": self.chatChannelId
        }
        send_dict = {
            "tid": 3,
            "cmd": CHZZK_CHAT_CMD['send_chat'],
            "retry": False,
            "sid": self.sid,
            "bdy": {
                "msg": message,
                "msgTypeCode": 1,
                "extras": json.dumps(extras),
                "msgTime": int(datetime.now().timestamp())
            }
        }
        self.sock.send(json.dumps(dict(send_dict, **default_dict)))

    def run(self):
        while True:
            try:
                try:
                    raw_message = self.sock.recv()
                except KeyboardInterrupt:
                    break
                except:
                    self.connect()
                    raw_message = self.sock.recv()

                raw_message = json.loads(raw_message)
                chat_cmd = raw_message['cmd']

                if chat_cmd == CHZZK_CHAT_CMD['ping']:
                    self.sock.send(
                        json.dumps({
                            "ver": "2",
                            "cmd": CHZZK_CHAT_CMD['pong']
                        })
                    )

                    if self.chatChannelId != api.fetch_chatChannelId(self.streamer):
                        self.connect()

                    continue

                if chat_cmd == CHZZK_CHAT_CMD['chat']:
                    chat_type = '채팅'
                elif chat_cmd == CHZZK_CHAT_CMD['donation']:
                    chat_type = '후원'
                else:
                    continue

                messages = []

                for chat_data in raw_message['bdy']:
                    if chat_data['uid'] == 'anonymous':
                        nickname = '익명의 후원자'
                    else:
                        try:
                            profile_data = json.loads(chat_data['profile'])
                            nickname = profile_data["nickname"]
                            if 'msg' not in chat_data:
                                continue
                        except:
                            continue

                    now = datetime.fromtimestamp(chat_data['msgTime'] / 1000)
                    now = datetime.strftime(now, '%Y-%m-%d %H:%M:%S')

                    data2 = {
                        "author": nickname,
                        "dateTime": now,
                        "message": chat_data["msg"],
                        "emotion3": random.randint(0, 2),
                        "emotion7": random.randint(0, 6),
                        "platform": 1
                    }
                    yield f'data:{data2}\n\n'
            except Exception as e:
                print(f"An error occurred: {e}")


# 아프리카 채팅 가져오기
@app.route('/afreecaTV')
def afreecaTV_sse():
    # 유니코드 및 기타 상수
    F = "\x0c"
    ESC = "\x1b\t"
    SEPARATOR = "+" + "-" * 70 + "+"

    # SSL 컨텍스트 생성
    def create_ssl_context():
        ssl_context = ssl.create_default_context()
        ssl_context.load_verify_locations(certifi.where())
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        return ssl_context

    # 메시지 디코드 및 출력
    def decode_message(bytes):
        parts = bytes.split(b'\x0c')
        messages = [part.decode('utf-8') for part in parts]
        if len(messages) > 5 and messages[1] not in ['-1', '1'] and '|' not in messages[1]:
            user_id, comment, user_nickname = messages[2], messages[1], messages[6]
            print(f"{user_nickname}[{user_id}] : {comment}")
            return f"{user_nickname}[{user_id}] : {comment}\n\n"
        else:
            # 채팅 뿐만 아니라 다른 메세지도 동시에 내려옵니다.
            pass

    # 바이트 크기 계산
    def calculate_byte_size(string):
        return len(string.encode('utf-8')) + 6

    # 채팅에 연결
    async def connect_to_chat(url, ssl_context):
        try:
            BNO, BID = url.split('/')[-1], url.split('/')[-2]
            CHDOMAIN, CHATNO, FTK, TITLE, BJID, CHPT = get_player_live(BNO, BID)
            print(f"{SEPARATOR}\n"
                  f"  CHDOMAIN: {CHDOMAIN}\n  CHATNO: {CHATNO}\n  FTK: {FTK}\n"
                  f"  TITLE: {TITLE}\n  BJID: {BJID}\n  CHPT: {CHPT}\n"
                  f"{SEPARATOR}")
        except Exception as e:
            print(f"  ERROR: API 호출 실패 - {e}")
            return

        try:
            async with websockets.connect(
                    f"wss://{CHDOMAIN}:{CHPT}/Websocket/{BID}",
                    subprotocols=['chat'],
                    ssl=ssl_context,
                    ping_interval=None
            ) as websocket:
                # 최초 연결시 전달하는 패킷
                CONNECT_PACKET = f'{ESC}000100000600{F * 3}16{F}'
                # 메세지를 내려받기 위해 보내는 패킷
                JOIN_PACKET = f'{ESC}0002{calculate_byte_size(CHATNO):06}00{F}{CHATNO}{F * 5}'
                # 주기적으로 핑을 보내서 메세지를 계속 수신하는 패킷
                PING_PACKET = f'{ESC}000000000100{F}'

                await websocket.send(CONNECT_PACKET)
                print(f"  연결 성공, 채팅방 정보 수신 대기중...")
                await asyncio.sleep(2)
                await websocket.send(JOIN_PACKET)

                async def ping():
                    while True:
                        # 5분동안 핑이 보내지지 않으면 소켓은 끊어집니다.
                        await asyncio.sleep(60)  # 1분 = 60초
                        await websocket.send(PING_PACKET)

                async def receive_messages():
                    while True:
                        data = await websocket.recv()

                        parts = data.split(b'\x0c')
                        messages = [part.decode('utf-8') for part in parts]
                        if len(messages) > 5 and messages[1] not in ['-1', '1'] and '|' not in messages[1]:
                            user_id, comment, user_nickname = messages[2], messages[1], messages[6]
                            print(f"{user_nickname}[{user_id}] : {comment}")
                            yield f"{user_nickname}[{user_id}] : {comment}\n\n"
                        else:
                            # 채팅 뿐만 아니라 다른 메세지도 동시에 내려옵니다.
                            pass

                yield receive_messages()
                await asyncio.gather(
                    ping(),
                )

        except Exception as e:
            print(f"  ERROR: 웹소켓 연결 오류 - {e}")

    ssl_context = create_ssl_context()
    BID = flask.request.args.get("BID")
    BNO = flask.request.args.get("BNO")

    # 비동기 제너레이터를 일반 제너레이터로 변환하여 반환
    return Response(connect_to_chat(f'/afreecaTV/{BID}/{BNO}', ssl_context), mimetype='text/event-stream')


# 치지직 실시간 댓글 분석
@app.route('/Chlive')
def Ch_sse():
    with open('./cookies.json') as f:
        cookies = json.load(f)

    chzzkchat = ChzzkChat(flask.request.args.get("BCID"), cookies)
    return Response(chzzkchat.run(), mimetype='text/event-stream')


# 유튜브 실시간 댓글 분석
@app.route('/live/<BCID>/<Email>')
def sse(BCID, Email):

    return Response(generate(BCID, Email), mimetype='text/event-stream')



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


async def do_async(URI, data2):
    header = {"Content-type": "application/json", "Accept": "text/plain"}
    requests.get(URI, data=json.dumps(data2), headers=header)
    print("완료!")


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
            spurl = f'http://localhost:8080/broadcast/saveViewer?BCID={BCID}&sec={t.seconds}&viewer={vi}'
            requests.get(spurl, headers=header)
            time.sleep(15)

    return Response(viewer(BCID), mimetype='text/event-stream')


@app.route("/feedback/<BCID>")
def feedback(BCID):
    URI = f'http://localhost:8080/broadcast/getChat?BCID={BCID}'
    data = requests.get(URI).json()
    published = datetime.strptime(data['published'], '%Y-%m-%dT%H:%M:%SZ')
    published = published + timedelta(hours=9)
    time_data = []
    emotion7 = [0, 0, 0, 0, -999999, 0, 0]
    for key, value in data['viewer'].items():
        time_data.append((int(key) - 32400, [0, 0, [0, 0, 0, 0, 0, 0, 0]]))

    time_data = sorted(time_data)
    for item in data['cd']:
        t = datetime.strptime(item['dateTime'], '%Y-%m-%d %H:%M:%S')
        sec = (t - published).seconds
        pre = 0
        for key, val in enumerate(time_data):
            if sec < val[0]:
                if item['emotion3'] == 0 or item['emotion3'] == 1:
                    time_data[pre][1][item['emotion3']] += 1
                time_data[pre][1][2][item['emotion7']] += 1
                emotion7[item['emotion7']] += 1
                break
            pre = key

    min_Viewr = int(jsonmax(data['viewer']) * 0.7)
    max_emo7 = emotion7.index(max(emotion7))
    emo7_max = 0
    emo7_idx = 0
    po_emo = 0
    po_idx = 0
    na_emo = 0
    na_idx = 0
    for item in time_data:
        if int(item[0]) > min_Viewr:
            if item[1][1] > po_emo:
                po_emo = item[1][1]
                po_idx = item[0]
            if item[1][0] > na_emo:
                na_emo = item[1][0]
                na_idx = item[0]
            if item[1][2][max_emo7] > emo7_max:
                emo7_max = item[1][2][max_emo7]
                emo7_idx = item[0]

    # URI = f'{topic_IP}nAK6IWev38E'
    # print(requests.get(URI).json())
    data = {
        "positive": str(po_idx),
        "negative": str(na_idx),
        "emotion7": (max_emo7, emo7_idx)
    }
    return json.dumps(data)


def jsonmax(data):
    max_value = max(data.values())
    index = 0
    for key, value in data.items():
        if value == max_value:
            return index
        index += 1


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8801, threaded=False, processes=10)
