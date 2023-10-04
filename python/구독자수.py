from googleapiclient.discovery import build

# API 키 설정
api_key = 'AIzaSyBTh6c2K5gdPgQi22TlPKOUu75IJaLn594'

# YouTube Data API 클라이언트 빌드
youtube = build('youtube', 'v3', developerKey=api_key)

# 채널 아이디 설정
channel_id = 'UCz0CQfAhFVSoE1OjQLJ5IBg'


# 채널 정보 가져오기
def get_channel_subscriber_count(channel_id):
    request = youtube.channels().list(
        part='statistics',
        id=channel_id
    )
    response = request.execute()

    if 'items' in response:
        statistics = response['items'][0]['statistics']
        subscriber_count = statistics['subscriberCount']
        return int(subscriber_count)
    else:
        return None


# 채널 구독자 수 가져오기
subscriber_count = get_channel_subscriber_count(channel_id)

if subscriber_count is not None:
    print(f'구독자 수: {subscriber_count}')
else:
    print('채널 정보를 가져올 수 없습니다.')
