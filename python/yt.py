import requests

key = "AIzaSyATIpI3znMnt3r9-9N3zr6ijtqV8ySiPwQ"
try:
    #방송 id로 채널 정보(채널id)가져오기
    video_url = 'https://www.googleapis.com/youtube/v3/videos'
    video_params = {
        'part': 'snippet',
        'id': "MV0kkZkcASs",
        'key': key
    }
    video_r = requests.get(video_url, video_params)
    video_data = video_r.json()
    print(video_data['items'][0]['snippet']['channelId'])

    channel_url = 'https://www.googleapis.com/youtube/v3/channels'
    channel_params = {
        'part': 'snippet',
        'mine':True,

    }
    access_token = "ya29.a0AfB_byAcJ-klOnJrXCl5HhMYAgCKFgN-RiBlM9xEPrE6iLSH97mQiZTg5uvVoBlbrQmcLqPNRYwBOvIFBFFyI9PFZehW8tsD28eDQ2fHxGDSNosAJGa8b_JS5nIxujNPaZphKn3tQ1Rjkvh0I9clJeLNHhaqNMud1LcaCgYKAYUSARMSFQGOcNnC-lry5C99LqPlR-LxS1djoA0170"
    headers = {'Authorization': f'Bearer {access_token}'}
    api_url = 'https://www.googleapis.com/youtube/v3/channels'
    response = requests.get(api_url,params=channel_params,headers=headers)
    print(response.json())
except:
    print("에러남.")
