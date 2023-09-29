import requests

token = "eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxOTYwMDA5ODUyODAtaWpydmRvMmpuMDB2cXBsYW5kdTdxYThnazRtN2lzMGUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxOTYwMDA5ODUyOD"
key = "AIzaSyATIpI3znMnt3r9-9N3zr6ijtqV8ySiPwQ"
try:
    #방송 id로 채널 정보(채널id)가져오기
    video_url = 'https://www.googleapis.com/youtube/v3/videos'
    video_params = {
        'part': 'snippet',
        'id': "nPS6Kbc9prE",
        'key': key
    }
    video_r = requests.get(video_url, video_params)
    video_data = video_r.json()

    #채널id로 방송 정보 가져오기
    channel_url = 'https://www.googleapis.com/youtube/v3/channels'
    channel_params = {
        'part': 'statistics',
        'managedByMe':True,
        'id': video_data['items'][0]['snippet']['channelId'],
        'key': key,
        "onBehalfOfContentOwner":token
    }
    channel_r = requests.get(channel_url, channel_params)
    channel_data = channel_r.json()
    print(channel_data)
except:
    print("에러남.")
