from pytchat import LiveChat
import pafy

pafy.set_api_key('AIzaSyATIpI3znMnt3r9-9N3zr6ijtqV8ySiPwQ')

video_id = '_MpGBKEpXpo'

chat = LiveChat(video_id = video_id, topchat_only = 'FALSE')

while chat.is_alive():
    try:
        data = chat.get()
        items = data.items
        for c in items:
            print(c)


    except KeyboardInterrupt:
        chat.terminate()
        break