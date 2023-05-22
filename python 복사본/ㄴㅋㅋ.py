
import json
import requests as requests

client_id="h3mnzl35ep"
client_secret="6UypzJ1ZtXiaRbnHYry9AkTewLS45TmfgjwNBYJq"
url = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"


headers = {
    "X-NCP-APIGW-API-KEY-ID": client_id,
    "X-NCP-APIGW-API-KEY": client_secret,
    "Content-Type":"application/json"
}

message= input()

data = {
                "content": message
            }

response = requests.post(url, data=json.dumps(data), headers=headers)
text = response.json()
sen = text['sentences'][0]
print(sen['confidence'])