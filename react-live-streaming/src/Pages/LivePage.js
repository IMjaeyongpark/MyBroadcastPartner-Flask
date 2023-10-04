import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import ProgressBar from '../Components/ProgressBar'; // ProgressBar 컴포넌트의 import 문 위치 수정
import SevenEmoticon from '../Components/SevenEmotion';
import LiveChatting from '../Components/LiveChatting';
import { useNavigate } from 'react-router-dom';
import "../fonts/Font.css";

const LivePage = (props) => {
  const [data, setData] = useState([]);   //초깃값은 빈 배열, data 상태변수는 채팅데이터 저장
  const [positive, setPositive] = useState(0);  
  const [total, setTotal] = useState(0);
  const userEmail = JSON.parse(sessionStorage.getItem('userInfo')).email; // 사용자 Email
  const userBroadCastAddress = props.liveData; // 사용자 방송 주소
  const navigate = useNavigate(); // 페이지이동
  const closebutton = () => {   //나가기버튼
    navigate("/");
  }

  const updateTotal = (index) => {
    if (index === 0 || index === 1) {   //감정인덱스가 부정이거나 긍정이면 SetTotal에 +1
      setTotal((prevTotal) => prevTotal + 1);
      if (index === 1) {    //감정인덱스가 긍정이면 긍정 +1
        setPositive((prevPositive) => prevPositive + 1);
      }
    }
  };

useEffect(() => {
  //서버 IP를 가져옴
  const serverIP = process.env.REACT_APP_GITHUB_IP;
  // userBroadCastAddress랑 userEmail을 파라미터로 엔드포인트 접속
  const eventSource = new EventSource(`http://localhost:8801/live/${userBroadCastAddress}/${userEmail}`);

  // 채팅이 올라올때마다 이벤트가 발생
  eventSource.addEventListener('message', (event) => {
    try {
      //받아온 데이터 json으로 파싱
      const newData = JSON.parse(event.data.replaceAll("'", '"'));
      // emotion3 필드의 값을 가져와 updateTotal 함수에 전달
      const index = newData["emotion3"];
      updateTotal(index);
      setData((prevData) => [...prevData, newData]);
    } catch {
        console.log("error") 
    }
  });

  return () => {
    eventSource.close();   
  };

}, []); 

    return (  //url입력창과 버튼을 urlContainer로 묶었음
        <ChatContainer>
            <ChatTitle>Live Streaming</ChatTitle>
            <Button onClick={closebutton}><strong>나가기</strong></Button>    
            <UserText>User: {JSON.parse(sessionStorage.getItem('userInfo')).name}님</UserText>
            <LiveChatting data = {data}/>
            <ProgressBar positive={positive} total={total} />
            <SevenEmoticon data={data} />
        </ChatContainer>
    );
}

const ChatContainer = styled.div`
    border-radius:30px;
    width: 1300px;
    height: 750px;
    background-color: pink;
    margin: auto;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    padding-top: 20px;
    overflow: hidden; // 양옆 스크롤 제거
  ${props => props.isScrolled && `
    margin-top: 1;  
  `}
`
const ChatTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #FFEBF0;
    font-family: "Noto Sans AO";
`
const Button = styled.button`  
    position: relative;
    font-size: 1.1rem;
    border-radius: 10px;
    color: pink;   
    width: 70px;
    left: 40%;
    background-color: white; 
    line-height: 2; 
    border: 2px solid pink;
`

const UserText = styled.p`
    font-weight: bold;
    color: #FFF0F5;
    font-size: 30px;
    position: relative;
    margin-top: -2%;
    right: 40%;
    font-family: "Noto Sans B0";
`
export default LivePage;
