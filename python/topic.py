import json
from keybert import KeyBERT
from kiwipiepy import Kiwi
from transformers import BertModel
from youtube_transcript_api import YouTubeTranscriptApi
import re
#YOUTUBE SCRIPT
srt = YouTubeTranscriptApi.get_transcript("nAK6IWev38E",languages=["ko"])
#spring에서 넘어온 긍정이 가장 많은 시간대
emotionhour = 2000
#전체 영상 시간
videohour = 3150



with open("subtitles.txt","w", encoding='utf-8')as f:
    for i in srt:
        print(i)
        f.write("{}\n".format(i))
        absNum = abs(i['start'] - emotionhour)
        if absNum < videohour:
            videohour = absNum
            #근삿값
            nearhour = i['start']


print(f'nearhour:{nearhour}')

#영상 스크립트 추출시간
durationEndhour = nearhour+150
durationStarthour = nearhour-100
texts=[]
for i in srt:
    if(i['start']>=durationStarthour and i['start']<durationEndhour):
        print(i)
        texts.append(i['text'])

data=[]
# 텍스트만 추출하여 리스트에 저장
# texts = [item['text'] for item in srt]

print(texts,"sss")

#'[__]' => '' 로 처리
for text in texts:
    data.append(text.replace('[ __ ]',''))

#리스트 to string
result = ' '.join(s for s in data)
print(result)

model = BertModel.from_pretrained('skt/kobert-base-v1')
kw_model = KeyBERT(model)
#(2,4) 2개단어부터 4개 단어까지 키워드를 추출할 수 있다
keywords2 = kw_model.extract_keywords(result,keyphrase_ngram_range=(3,6),use_maxsum = True,top_n = 20)
keywords = kw_model.extract_keywords(result, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=10)
print(f'keyword: {keywords}')
print(f'keyword2: {keywords2}')

kiwi = Kiwi()
kiwi.analyze(result)

# 명사 추출 함수
def noun_extractor(text):
    results = []
    result = kiwi.analyze(text)
    for token, pos, _, _ in result[0][0]:
        if len(token) != 1 and pos.startswith('N') or pos.startswith('SL'):
            results.append(token)
    return results


nouns = noun_extractor(text)
print(nouns)
text = ' '.join(nouns)
print(text)
keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=20)
print(keywords)