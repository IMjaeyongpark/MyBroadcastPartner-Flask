import requests

youtube_api_key = "AIzaSyATIpI3znMnt3r9-9N3zr6ijtqV8ySiPwQ"
api_url = 'https://www.googleapis.com/youtube/v3/videos'
params = {
    'key': youtube_api_key,
    'part': 'snippet,statistics',
    'chart': 'mostPopular',  # 인기 동영상을 검색하기 위한 매개변수
    'regionCode': 'KR',  # 검색할 지역 또는 국가 코드 (예: 미국)
    'maxResults': 10  # 가져올 결과의 최대 수 (10개로 설정)
}
response = requests.get(api_url, params=params).json()
popular_videos = response.get('items', [])
da = []

for video in popular_videos:
    data = {}
    video_Url = data['url'] = 'https://www.youtube.com/watch?v='+video['id']
    video_title = data['title'] = video['snippet']['title']
    video_thumbnails_Url = data['thumbnails_Url'] = video['snippet']['thumbnails']['default']['url']
    da.append(data)

for i in da:
    print(i)
