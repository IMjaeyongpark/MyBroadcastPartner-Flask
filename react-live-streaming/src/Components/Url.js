import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "swiper/css/pagination";
import 'swiper/css';
import styled from 'styled-components';

const Url = (props) => {
  //전송하기 버튼 클릭여부
  const [buttonClicked, setButtonClicked] = useState(false);
  //url입력창
  const [url, setUrl] = useState("");
  //live 페이지로 이동 변수
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const label = disabled ? '전송하기' : '전송하기';

    //url창에 주소입력과정
    const urlChange = (e) => {
        const length = e.target.value;  //입력한 url을 length에 저장함
        setUrl(length);   
        if (length.length >= 1) { //url입력시 상태 true -> false로 바뀜 
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    // url 전송과정
    const handleSubmit = (event) => {
      const serverIP = process.env.REACT_APP_GITHUB_IP;
      event.preventDefault(); // 폼 제출될 때 기본 동작 막음
      if (sessionStorage.getItem('userInfo') == null) {  // sessionStorage에 userInfo라는 키값으로 저장된 값이 없으면 로그인알림
          alert('로그인이 필요한 서비스입니다.');
          window.location.reload();
      }
      setButtonClicked(true);
      try {
          axios.get(  //아래 서버에 요청 함
              `http://${serverIP}:8080/identification`,
              {
                  headers: { Authorization: 'User' }, 
                  params: { 
                      URI: String(url),   //URI 라는 쿼리로 url값을 전달함
                      email: String(JSON.parse(sessionStorage.getItem('userInfo')).email) //email이라는 쿼리로 userInfo라는 키값으로 저장돼있는 이메일값을 전달함
                  },
              }
          ).then((res) => {
              console.log(res.data);
              if (res.data !== "400") { //성공했다면 live창으로 이동
                  navigate('/live');
                  props.setLiveData(res.data);
              } else {
                  alert("해당 URI는 사용자 정보와 맞지 않습니다.");
              }
          });
      } catch (error) {
          console.log(error);
      }
  };
    //enter로도 버튼기능을 쓸 수 있음
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {    
            handleSubmit(event);
        }
    };

    return (  //url입력창과 버튼을 urlContainer로 묶었음
        <UrlContainer>
            <InputText
                type="text"
                placeholder="방송 주소를 입력하세요."
                value={url}
                onChange={urlChange}
                onKeyPress={handleKeyPress}
            />
            <PinkButton disabled={disabled} onClick={handleSubmit}>
                {label}
            </PinkButton>
        </UrlContainer>
    );
}

// InputText랑 button 컨테이너
const UrlContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
`;
//url 입력css
const InputText = styled.input`
    right: 30px;
    padding: 10px;
    border-radius: 20px;
    width: 400px;
    text-align: center;
    ::placeholder {
    color: #ea45cf;
  }
    border: 2px solid pink; /* 클릭하기 전 테두리 스타일 */
    &:hover {
    border-color: hotpink; /* 호버 시 테두리 스타일 변경 */
    }
    &:focus {
    outline: none; /* 포커스 테두리 제거 */
    border-color: deeppink; /* 클릭 시 테두리 스타일 변경 */
    }
`;
//전송하기 버튼
const PinkButton = styled.button`
    background-color: hotpink;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-left:5px;
    &:hover {
        background-color: hotpink;
    }
`;

export default Url;
