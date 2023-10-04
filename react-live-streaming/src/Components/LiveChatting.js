import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import "../fonts/Font.css";

//LivePage에서 props로 채팅데이터르 받음
const LiveChatting = ({ data }) => {
  const chatContainerRef = useRef(null);
  //채팅 데아터가 들어올때마다 자동으로 스크롤이 내려감
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'chat-container',
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  //7가지 감정 이모티콘 이미지
  const renderEmotionImage = (emotionIndex) => {
    const emotionImages = [
      "/emoticons/Nervous.png",
      "/emoticons/Embrrassed.png",
      "/emoticons/Angry.png",
      "/emoticons/Sadness.png",
      "/emoticons/Neutral.png",
      "/emoticons/Happiness.png",
      "/emoticons/Disgust.png"
    ];
    return (
      <img 
        style={{width:"35px",height:"35px",marginLeft:"3%"}} 
        src={emotionImages[emotionIndex]} 
        alt={`Emotion ${emotionIndex}`} 
      />
    );
  };
  //3가지[부정,긍정,중립] 이모티콘
  const renderEmotionIcon = (emotionIndex) => {
    const emotionIcons = [
        "/emoticons/Bad.K.png",
        "/emoticons/Good.K.png",
        "/emoticons/JungRip.K.png",
    ];
    return (
        <img
        style={{width:"40px",height:"35px",marginLeft:"1%"}} 
        src={emotionIcons[emotionIndex]}
        alt={`Emotion ${emotionIndex}`} 
        />
    );
  };

  return (
    <MessengerContainer ref={chatContainerRef} id="chat-container">
    <div className="chat-messages">
      {data.map((data, index) => (
        <ChatMessage key={index} author={data.author}>
          <p className="author">{data.author}</p>
          <p className="dateTime">{data.dateTime}</p>
          <p className="message">'{data.message}'</p>
          {renderEmotionIcon(data["emotion3"])}
          {renderEmotionImage(data["emotion7"])}
        </ChatMessage>
      ))}
    </div>
  </MessengerContainer>
  );
};

//채팅창 컨테이너
const MessengerContainer = styled.div`
  border: 2px solid hotpink;
  border-radius: 30px;
  margin-left: 30px;
  margin-top: 1%;
  padding: 1%;
  width: 500px;
  height: 550px;
  background-color: white;
  overflow-y: auto;     
  &::-webkit-scrollbar {
    width: 8px; 
  }
  &::-webkit-scrollbar-thumb {
    background: #D3D3D3; 
    border-radius: 5px; 
  }

`;

//채팅창 안에서 사용자들의 채팅
const ChatMessage = styled.div`
  margin-top: 1%;
  display: flex;
  align-items: flex-start;

  img {
    margin-right: 1%;
    width: 3vw;
    height: 3vw;
  }

  p {
    margin-right: 2%;
    line-height: 1.3;
    word-break: break-word;
  }

  .author {
    font-family: "Noto Sans B0";
    margin-right: 1%;
    font-weight: bold;
    flex-shrink: 1; /* author 영역이 메시지 영역을 밀어내지 않도록 설정 */
    margin-bottom: 0.5rem; /* author 영역과 다음 메시지 사이의 간격 설정 */
    hyphens: auto; /* 긴 단어를 분리하여 줄바꿈되도록 설정 */
    flex-basis: 20%;
  }
  
  .dateTime {
    font-family: "Noto Sans B0";
    color: blue;
    flex-shrink: 3; /* author 영역이 메시지 영역을 밀어내지 않도록 설정 */
    margin-bottom: 0.1rem; /* author 영역과 다음 메시지 사이의 간격 설정 */
    flex-shrink: 1; 
    white-space: pre-wrap; /* 줄 바꿈을 유지하면서 공백도 유지하도록 설정 */
    word-wrap: break-word; /* 긴 단어를 줄바꿈하여 영역에 맞게 나누도록 설정 */
    hyphens: auto; /* 긴 단어를 분리하여 줄바꿈되도록 설정 */
    flex-basis: 20%;
  }
  .message {
    font-family: "Noto Sans Chat";
    white-space: pre-wrap; /* 줄 바꿈을 유지하면서 공백도 유지하도록 설정 */
    word-wrap: break-word; /* 긴 단어를 줄바꿈하여 영역에 맞게 나누도록 설정 */
    hyphens: auto; /* 긴 단어를 분리하여 줄바꿈되도록 설정 */
    flex-basis: 40%;
  }
`;

export default LiveChatting;
