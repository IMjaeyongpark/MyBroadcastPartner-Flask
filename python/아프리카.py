import certifi
import ssl
import base64
import asyncio
import websockets

# WSS 연결 위한 SSL 설정
ssl_context = ssl.create_default_context()
ssl_context.load_verify_locations(certifi.where())
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# 아래 3개 변수값은 어딘가의 API로 부터 받은 값들의 조합으로 우선은 그대로 사용
Base64PdboxTicket = 'LkEzMi43YmJUNTZ2eUhNOWZLWmsudGNKTzlRMXRveURUUTl0TjFsZnU1SUc4UW5YR3JxenNSS3JHa0dueUctcWs5SFd1bWtVSVF5RnNxLTRHblA2VDFLTnBYNktlWF9xVDVzYWh1bHRJenl4b1ZnUGpldGhKemdUUkVxdU5qc3BsdjBtNzI0bFVZZ1k2LUhOV3h5NDhWR05QRlVNODRFVmNuUWVwSGFaakc3MFI4bjRpTGdMZjNtbnFndUVIb2NtZ01FZXJtVFhVOVhBdDVKRXRsajdSZDgwYlQ4ZWJPRDc3YmdDMEFQellCc2xlVjAzeUxhcHkwN0RJdERJZnFFQ3JwbGpsazJUZlVRLV9WeW5HMXFZUDN2VXhkSFpPb0VQenptdmFTck02dUs5VmRkVUdyQlBxdHBjdFdNTGU3c094VHlqQVVsUDN1TGVhVHYtUXVrRE9yb3dxR1I0dWNrLTA5cGZtUlluRVZHZ0VDZlZxU3NSaEJSRzdqZUZGU3p1Z0xMUnd1RjRsSFFZTU1wWEIxMENIdEJsbEdfN013cG96X00yWTRibWpkclM3TWdiOXNIUjI0bGs3bGpiVURtbGdJZEpuLUNreWFMS1p2YjJ4U2dXU2hLd0V6dmNFRGlxVTRwbnNMdURybGQtUnlCR2NURUd6S3pSWmhJODNGQlV0VzZHbWZJRWVGLWdaLVVXRWc0Wm9mNHBDYVk2b0l0bUxwRTlsdFdwbHVVMk5JSWpZODF1VmxZY05BdWsya0VZ...=='
Base64ChannelInfo = 'Li4wMDAyMDAwMzUxMDAuMTE5OC40MTliYTI3ZWJmZmUyZDU3NmQwZTAyM2ZlMzhmZDBlYV9kYW5jaHUxN18yNTg4MjUyMjZfaHRtbDVfMC4wLi5sb2cuLiYuc2V0X2Jwcy49LjgwMDAuJi52aWV3X2Jwcy49LjEwMDAuJi5xdWFsaXR5Lj0ubm9ybWFsLiYudXVpZC49LmY4NGQ5ODg0N2EwZGY4NmJkMWE2YTkyOGFiNDkyMTAwLiYuZ2VvX2NjMDYzZCAgLj0uS1IuJi5nZW9fcmMuPS40NC4mLmFjcHRfbGFuZy49LmtvX0tSLiYuc3ZjX2xhbmcuPS5rb19LUi4mLmpvaW5fY2MuPS40MTAuJi5zdWJzY3JpYmUuPS4wLiYubG93bGF0ZW5jeS49LjAuJi5tb2RlLj0ubGFuZGluZy5wd2QuLmF1dGhfaW5mby5OVUxMLnB2ZXIuMi5hY2Nlc3Nfc3lzdGVtLmh0bWw1Li4=...='
#Base64PdboxTicket = '.A32.7bbT56vyHM9fKZk.tcJO9Q1toyDTQ9tN1lfu5IG8QnXGrqzsRKrGkGnyG-qk9HWumkUIQyFsq-4GnP6T1KNpX6KeX_qT5sahultIzyxoVgPjethJzgTREquNjsplv0m724lUYgY6-HNWxy48VGNPFUM84EVcnQepHaZjG70R8n4iLgLf3mnqguEHocmgMEermTXU9XAt5JEtlj7Rd80bT8ebOD77bgC0APzYBsleV03yLapy07DItDIfqECrpljlk2TfUQ-_VynG1qYP3vUxdHZOoEPzzmvaSrM6uK9VddUGrBPqtpctWMLe7sOxTyjAUlP3uLeaTv-QukDOrowqGR4uck-09pfmRYnEVHIMAvQuwuadq7znpFp1s7N3wt3QSXvTAw4Sp_rgTyRDMKMRmJGSKZhu6z77kA6XcDxWRnOis-sgyc9fVtxLmqGLCp2S8eROdXZfVocWF2gmGkVHq3ATux3M00P4wdrh_H2LSOg5A7TUbPkmVKFgILLFWug3ijDw6GHQdK18tGHzAp1y2akrPfxaXyMhL0UQdXYZlivUm9oCDWOmA3qc7v4...=='
#Base64ChannelInfo = '..000200035100.1198.419ba27ebffe2d576d0e023fe38fd0ea_danchu17_258825226_html5_0.0..log..&.set_bps.=.8000.&.view_bps.=.1000.&.quality.=.normal.&.uuid.=.f84d98847a0df86bd1a6a928ab492100.&.geo_cc063d  .=.KR.&.geo_rc.=.44.&.acpt_lang.=.ko_KR.&.svc_lang.=.ko_KR.&.join_cc.=.410.&.subscribe.=.0.&.lowlatency.=.0.&.mode.=.landing.pwd..auth_info.NULL.pver.2.access_system.html5.....='



WSSUrl = 'wss://chat-76dbfccf.afreecatv.com:8001/Websocket/danchu17'

async def connect():
    # 웹 소켓에 접속을 합니다.
    async with websockets.connect(WSSUrl,
                                   ssl=ssl_context,
                                   extra_headers={
                                       'Host': 'chat-76dbfccf.afreecatv.com:8001',
                                       'Connection': 'Upgrade',
                                       'Pragma': 'no-cache',
                                       'Cache-Control': 'no-cache',
                                       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                                       'Upgrade': 'websocket',
                                       'Origin': 'https://play.afreecatv.com',
                                       'Sec-WebSocket-Version': '13',
                                       'Accept-Encoding': 'gzip, deflate, br',
                                       'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                                       'Sec-WebSocket-Key': 'qqpKu1Cyx3PH2cFPQHhxbg==',
                                       'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
                                       'Sec-WebSocket-Protocol': 'chat'
                                   },
                                   ping_interval=None) as websocket:

        # 핸드쉐이크
        await websocket.send(base64.b64decode(Base64PdboxTicket))
        await websocket.recv()
        await websocket.send(base64.b64decode(Base64ChannelInfo))

        # 이후부터 채팅내용 받아와짐
        while True:
            try:
                data = await websocket.recv()
                print(data)
            except Exception as e:
                print("ERROR:", e)


if __name__ == "__main__":
    asyncio.run(connect())
