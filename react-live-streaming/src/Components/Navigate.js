import React, { useState } from 'react';
import styled from "styled-components";
import { Navbar, Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // 외부 css에서 네비바 가져옴
import Login from '../Sign/Login';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import YouTube_Login from '../Sign/Youtube_Login';

const Navigate = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

    const openModal = (event) => {  // 모달창 활성화
      setModal(true);
    }
    const closeModal = () => {  // 모달창 비활성화
        setModal(false);
    }
    const MainButton = () => {  // 로고 클릭시 메인페이지 이동
        navigate("/");
    }

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    return (
        <div className='Navigation'>
            <Navbar style={{backgroundColor : "white", boxShadow : "1.5px 1.5px 1.5px 1.5px #F3F4F6", width: "100%"}} >
                <Navbar.Brand>
                  <UserImg onClick={MainButton}>  
                    <img className="RogoImage" alt="Live_Logo" src="img/logo2.png" />
                  </UserImg>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    {sessionStorage.getItem('userInfo') ? (
                        <DropdownMenu/>
                    ) : (
                        <Form inline>
                            <ModalButton type="button" onClick={openModal}>Login</ModalButton>
                            <UserName><strong>로그인이 필요합니다.</strong></UserName>
                        </Form>
                    )}
                </Nav>
                {modal? (
                <div>
                    <Nav_modal onClick={closeModal}>
                        <Nav_modalin onClick={stopPropagation}>
                        <h4>로그인</h4>
                        <h6>유튜브 로그인</h6>
                        <YouTube_Login />
                        <Divider>or</Divider>
                        <h6>구글 로그인</h6>
                        <Login />
                        <XButton onClick={closeModal}>X</XButton>
                        <h5>계정이 없으신가요? <a href={"https://accounts.google.com/signup/v2/createaccount?biz=false&cc=KR&continue=https%3A%2F%2Fwww.google.com%3Fhl%3Dko&dsh=S671864125%3A1696318661268810&flowEntry=SignUp&flowName=GlifWebSignIn&hl=ko&theme=glif"}>회원가입</a><br/><br/>
                        나의 방송 파트너는 Google or YouTube 계정으로<br/> 로그인이 가능합니다.</h5>
                        </Nav_modalin>
                    </Nav_modal>
                </div>
            ):null}
            </Navbar>
            </div>
    );
}

const ModalButton = styled.button`
  padding: 6px 12px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  border-radius: 8px;
  position: absolute;
  top: 18px;
  right: 11.5rem;
  background-color: pink;
  color:white;
  &:hover {
    background-color: hotpink;
  }
`;

const XButton = styled.button`
  border: none;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 25px;
  font-weight: 600;

  background: ${(props) => props.background || 'white'};
`

const UserImg = styled.button`
  background: none;
  border: none;
  position: relative;
  left: 2rem;
`

const Divider = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid gray;
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;


const Nav_modalin = styled.div`
  width: 386px;
  height: 586px;
  background-color: white;
  padding: 20px; // 내부 패딩 추가
  border-radius: 10px; // 둥근 모서리
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h4 {
    margin-top: 1rem;
    margin-right: 15rem;
    font-weight: bold;
  }

  h5 {
    margin-top: 9rem;
    font-size: 14px;
  }

  h6 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-right: 14rem;
  }
`

const Nav_modal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 어두운 반투명 배경
  position: fixed;
  top: 0; // 화면 상단부터 시작
  left: 0; // 화면 왼쪽부터 시작
  z-index: 999; // 다른 요소들 위에 나타나도록 z-index 설정
`

const UserName = styled.div`
  color: black;
  position: absolute;
  right: 2.5rem;
  top: 26px;
`;

export default Navigate;