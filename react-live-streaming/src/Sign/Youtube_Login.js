import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import styled from 'styled-components';

const API_KEY = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_KEY;

function setSessionCookie(sessionId) {
  document.cookie = `JSESSIONID=${sessionId}; path=/;`;
}

const loadClient = async () => {  // gapi 클라이언트 초기화
  try {
    await gapi.client.init({
      api_key: API_KEY,
      client_id: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      scope: 'https://www.googleapis.com/auth/youtube.readonly'
    });
  } catch (error) {
    console.error('API에 대한 GAPI 클라이언트 로드 중 오류 발생', error);
  }
};

const authenticate = async () => {  // 사용자 인증 후 YouTube API에 접근할 수 있는 권한 부여
  try {
    await loadClient(); // 성공적으로 인증 후 loadClient 함수 호출
    const options = {
      prompt: 'select_account' // 계정 강제 선택
    };
    await gapi.auth2.getAuthInstance().signIn(options);

    const user = gapi.auth2.getAuthInstance().currentUser.get();  // 유저 정보
    const serverIP = process.env.REACT_APP_GITHUB_IP;
    console.log(user.xc.access_token);
    sessionStorage.setItem('userInfo', JSON.stringify(jwtDecode(user.xc.id_token)));  // 유저 토큰
    axios.get(`http://${serverIP}:8080/find`,{    // 액세스 토큰을 받아오는 HTTP 요청을 보냅니다.
      params:{
        id_token: String(user.xc.id_token),
        access_token: String(user.xc.access_token),
      }
    }).then((res)=>{
        const sessionId = res.data;
        setSessionCookie(sessionId)
    })
    .catch((Error)=>{console.log(Error)})
    window.location.replace("/");
  } catch (error) {
    console.error('로그인에 실패했습니다.', error);
  }
};

const YouTubeVideoInfo = () => {
  useEffect(() => { // client:auth2를 비동기적으로 로드 후 초기화
    gapi.load('client:auth2', () => {
      try {
        loadClient();
      } catch (error) {
        console.error('인증을 초기화하는 중 오류가 발생했습니다.', error);
      }
    });
  }, []);

  const execute = async () => { // 특정 비디오의 정보를 가져오는 역할
    try {
      const response = await gapi.client.youtube.videos.list({  // id에 지정된 비디오의 정보를 가져옴
        part: ['snippet'],
        id: ['imKQT1qS_A4'],
      });
      console.log('Response', response);
    } catch (error) {
      console.error('실행오류', error);
    }
  };

  return (
    <Login_fir>
      <Login_button onClick={authenticate}>
        <Login_div>
      <img src="img/youtubeLogo.png" alt="YouTube Logo"/>
      </Login_div>
        YouTube 계정으로 로그인하기
        </Login_button>
    </Login_fir>
  );
};

const Login_fir = styled.div`
  width: 80%;
`

const Login_button = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  padding: 4px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`

const Login_div = styled.div`
  background-color: white;
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;

  img {
    width: 25px;
    margin-bottom: 2px;
  }
`

export default YouTubeVideoInfo;