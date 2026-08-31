# MyBroadcastPartner Flask

> YouTube·CHZZK·SOOP의 실시간 채팅을 수집하고 AI 감정 분석 결과를 전달하는 Flask API입니다.

![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask&logoColor=white)
![SSE](https://img.shields.io/badge/Streaming-SSE-EF4444)
![YouTube](https://img.shields.io/badge/YouTube-Data_API-FF0000?logo=youtube&logoColor=white)

## 프로젝트 소개

MyBroadcastPartner의 실시간 방송 데이터 처리 서비스입니다. 플랫폼별 채팅을 공통 형식으로 수집하고 외부 감정 분석 API와 연동한 결과를 Server-Sent Events(SSE)로 전달합니다. YouTube 채널·영상 데이터 조회, 콘텐츠 분석, 방송 피드백과 영상 구간 추출 기능도 제공합니다.

Spring Boot 백엔드 저장소: [MyBroadcastPartner-Spring](https://github.com/IMjaeyongpark/MyBroadcastPartner-Spring)

## 주요 기능

- YouTube·CHZZK·SOOP(구 아프리카TV) 실시간 채팅 수집
- 채팅 메시지 감정 분석과 SSE 스트리밍
- YouTube 실시간 시청자·구독자 수 조회
- 방송 채팅과 시청자 데이터를 이용한 피드백 구간 계산
- YouTube 인기 영상과 카테고리별 인기 태그 조회
- 채널 정보 및 업로드 영상 조회
- 자막과 OpenAI API를 이용한 콘텐츠 요약·제목·시나리오·해시태그 생성
- YouTube 영상 구간 추출 및 AWS S3 업로드

## 처리 흐름

```text
YouTube / CHZZK / SOOP
          │
          ▼
  Platform Chat Collectors
          │
          ├─ External Emotion API
          ├─ Spring Boot Backend
          └─ SSE Streaming → Client
```

## API

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/test` | 서버 상태 확인 |
| GET | `/live/{videoId}/{email}` | YouTube 실시간 채팅·감정 분석 SSE |
| GET | `/Chlive/{channelId}` | CHZZK 실시간 채팅 SSE |
| GET | `/afreecaTV/{broadcasterId}/{broadcastNo}` | SOOP 실시간 채팅 SSE |
| GET | `/subcnt/{channelId}` | YouTube 구독자 수 조회 |
| GET | `/concurrentViewers/{videoId}` | YouTube 실시간 시청자 수 SSE |
| GET | `/comment/{videoId}` | 영상 댓글과 감정 분석 결과 조회 |
| GET | `/feedback/{videoId}` | 방송 피드백 구간 계산 |
| GET | `/po` | 국내 인기 YouTube 영상 10개 조회 |
| GET | `/categoryTop10?videoCategoryId={id}` | 카테고리 영상과 인기 태그 조회 |
| GET | `/myVideo?channel_id={id}&sequence={order}&videoType={type}` | 채널·영상 정보 조회 |
| GET | `/content?videoTitle={title}` | 관련 영상과 AI 콘텐츠 분석 |
| GET | `/saveshorts/{videoId}/{start}/{end}` | 영상 구간 추출·업로드 프로토타입 |

SSE 엔드포인트의 응답 Content-Type은 `text/event-stream`입니다.

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| API | Flask, Flask-RESTful, Flask-CORS |
| Streaming | Server-Sent Events, WebSocket |
| Async | asyncio, aiohttp, websockets |
| Platform API | YouTube Data API, CHZZK API, SOOP Live API |
| AI | 외부 감정 분석 API, OpenAI API |
| Media | pytube, MoviePy, FFmpeg |
| Storage | AWS S3, boto3 |

## 프로젝트 구조

```text
.
└─ python/
   ├─ app.py                 # Flask 진입점과 실시간 API
   ├─ Ch_api.py              # CHZZK API 연동
   ├─ afreecatv_api.py       # SOOP Live API 연동
   ├─ content.py             # YouTube 자막·AI 콘텐츠 분석
   ├─ top10.py               # 인기 영상
   ├─ categoryTop10.py       # 카테고리 영상·태그
   ├─ myVideo.py             # 채널·영상 조회
   ├─ edit.py                # 영상 구간 추출
   ├─ aws_upload.py          # S3 업로드
   ├─ aws_download.py        # S3 다운로드
   └─ requirements.txt
```

## 실행 방법

### 1. 가상환경과 의존성

```bash
cd python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

`requirements.txt`는 개발 당시의 전체 macOS 환경을 포함한 스냅샷입니다. 다른 운영체제에서는 `tensorflow-macos`, `tensorflow-metal` 등 플랫폼 전용 패키지를 제외하고 설치해야 할 수 있습니다.

### 2. 환경변수

`python/.env` 파일에 필요한 연동 정보를 설정합니다.

```env
youtube_api_key=your-youtube-api-key
openAI_api_key=your-openai-api-key
server_IP=http://your-emotion-api/
topic_IP=http://your-topic-api/
spring_server_IP=http://your-spring-backend/

BUCKET=your-s3-bucket
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=ap-northeast-2
```

실제 키, 계정 쿠키와 내부 서버 주소는 저장소에 커밋하지 마세요.

### 3. CHZZK 쿠키

CHZZK 채팅 연동은 `python/cookies.json`을 읽습니다. 필요한 쿠키를 로컬에서 설정하고 외부에 공개하지 마세요.

### 4. 서버 실행

```bash
python app.py
```

기본 주소는 `http://localhost:8801`입니다.

## 참고

- 이 저장소는 프로젝트 개발 당시의 프로토타입 코드입니다.
- 일부 외부 API와 플랫폼 비공식 엔드포인트는 정책 변경으로 동작이 달라질 수 있습니다.
- 배포 전에는 `debug` 설정, 프로세스 구성, CORS 범위와 외부 서비스 주소를 운영 환경에 맞게 조정해야 합니다.

