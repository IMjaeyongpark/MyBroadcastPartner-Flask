import requests

# YouTube Data API v3 키를 여기에 입력하세요
api_key = 'AIzaSyBTh6c2K5gdPgQi22TlPKOUu75IJaLn594'
live_stream_id = '7W5tAyVvJSg'  # 확인하려는 라이브 스트리밍의 ID를 입력하세요

# YouTube API 엔드포인트 URL
url = f'https://www.googleapis.com/youtube/v3/videos?id={live_stream_id}&key={api_key}&part=liveStreamingDetails'

# YouTube API 호출
response = requests.get(url)
data = response.json()
print(data)