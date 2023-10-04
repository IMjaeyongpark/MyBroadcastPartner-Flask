from googleapiclient.discovery import build

# API 키 설정
api_key = 'AIzaSyBTh6c2K5gdPgQi22TlPKOUu75IJaLn594'

# YouTube Data API 클라이언트 빌드
youtube = build('youtube', 'v3', developerKey=api_key)


# 인기 채널 검색
def get_popular_channels(region_code, max_results):
    response = youtube.search().list(
        part='snippet',
        type='channel',
        order='viewCount',
        regionCode=region_code,
        maxResults=max_results
    ).execute()

    channels = []

    for item in response.get('items', []):
        print(item)
        channel_id = item['id']['channelId']
        channel_title = item['snippet']['title']
        channels.append((channel_title, channel_id))

    return channels


# 한국에서 인기 채널 가져오기 (예: 10개)
popular_channels = get_popular_channels('KR', 10)

# 결과 출력
for rank, (title, channel_id) in enumerate(popular_channels, start=1):
    print(f'{rank}. {title} - Channel ID: {channel_id}')