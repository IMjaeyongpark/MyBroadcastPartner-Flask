import requests
import json
from datetime import datetime


key = "AIzaSyATIpI3znMnt3r9-9N3zr6ijtqV8ySiPwQ"
video_url = 'https://www.googleapis.com/youtube/v3/videos'
video_params = {
    'part': 'snippet',
    'id': "FJfwehhzIhw",
    'key': key
}
video_r = requests.get(video_url, video_params)
video_data = json.loads(json.dumps(video_r.json()))

da = datetime.strptime("20220711", "%Y%m%d")
published = video_data["items"][0]["snippet"]["publishedAt"]
published = datetime.strptime(published,'%Y-%m-%dT%H:%M:%SZ')
a = published - da
print(str(a))
print(type(a))
