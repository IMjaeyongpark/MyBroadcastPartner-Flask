import pytchat
import pafy
import json

import re

import requests as requests

youtube_api_key="AIzaSyBTh6c2K5gdPgQi22TlPKOUu75IJaLn594"
client_id="h3mnzl35ep"
client_secret="6UypzJ1ZtXiaRbnHYry9AkTewLS45TmfgjwNBYJq"
pafy.set_api_key(youtube_api_key)
url = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"

video_id = 'H-ecGmLkXLM'
chat = pytchat.create(video_id=video_id)



headers = {
    "X-NCP-APIGW-API-KEY-ID": client_id,
    "X-NCP-APIGW-API-KEY": client_secret,
    "Content-Type":"application/json"
}

while chat.is_alive():

    try:
        data=chat.get()
        items = data.items

        for c in items:
            message = re.sub(r"[^\uAC00-\uD7A3a-zA-Z\s]", "", c.message)
            data = {
                "content": message
            }

            response = requests.post(url, data=json.dumps(data), headers=headers)
            text = response.json()
            sen = text['sentences'][0]
            print(f"{c.author.name}:{c.message} -> {message}   {sen['confidence']}")
    except KeyboardInterrupt:
        chat.terminate()
        break
