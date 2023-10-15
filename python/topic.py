

def topic():
    print('왔니')
    # YOUTUBE SCRIPT
    srt = YouTubeTranscriptApi.get_transcript("nAK6IWev38E", languages=["ko"])
    # spring에서 넘어온 긍정이 가장 많은 시간대
    emotionhour = 1300
    # 전체 영상 시간
    videohour = 3150

    for i in srt:
        absNum = abs(i['start'] - emotionhour)
        if absNum < videohour:
            videohour = absNum
            # 근삿값
            nearhour = i['start']

    # 영상 스크립트 추출시간
    durationEndhour = nearhour + 100
    durationStarthour = nearhour - 50
    data = []
    for i in srt:
        if (i['start'] >= durationStarthour and i['start'] < durationEndhour):
            data.append(i['text'].replace('[ __ ]', ''))

    # 리스트 to string
    result = ' '.join(s for s in data)

    # 명사 추출 함수
    def noun_extractor(text):
        results = []
        result = kiwi.analyze(text)
        for token, pos, _, _ in result[0][0]:
            if len(token) != 1 and pos.startswith('N') or pos.startswith('SL'):
                results.append(token)
        return results

    text = ' '.join(noun_extractor(result))
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=10)
    print(keywords)
    return keywords

print(topic())
