import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdLogout } from "react-icons/md";

const DropdownMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);   //false로 초기화
  const [modal, setModal] = useState(false);  //false로 초기화
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할
  
  const toggleDropdown = () => {    // isOpen상태값을 반전시켜줌
    setIsOpen(!isOpen);   // isOpen값이 true면 드롭다운메뉴(마이페이지)가 열리고 false면 메뉴가 닫힘
  };
  const outDropdown = () => {    // SetisOpen값을 초기화
    setIsOpen(false);   //SetisOpen값을 초기화
  };
  const handleClick = () => {
    setModal(true);
  }
  const handleClickOutside=(event)=>{ // 바깥 윈도우 클릭시 modal창 초기화
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setModal(false);
    }
  }

  const MyPageButton = () => {  // 마이페이지 이동
    navigate("/mypage");
    setModal(false);
  }

  const PayButton = () => { // 결제 버튼 클릭시 PayPage 이동
    navigate("/paypage");
  }
  
  const logoutButton = () => {  // 로그아웃
    sessionStorage.clear();
    window.location.replace("/");
  }

  useEffect(()=>{ // 모달창 밖을 클릭하면 모달창 꺼짐
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })

  useEffect(() => { // 사용자 정보에 마우스 0.5초 이동 시 DropdownMene 활성화
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowInfo(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowInfo(false);
    }
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="Drop" >
      <Pay_button onClick={PayButton}>요금안내</Pay_button>
      <Button onMouseEnter={toggleDropdown} onMouseLeave={outDropdown} onClick={handleClick}>
        <img src={JSON.parse(sessionStorage.getItem('userInfo')).picture} />
      </Button>
      <NameButton onMouseEnter={toggleDropdown} onMouseLeave={outDropdown} onClick={handleClick}>
          <h6 ><strong>{JSON.parse(sessionStorage.getItem('userInfo')).name}님</strong> 환영합니다.</h6>
      </NameButton>
      {isOpen && (
         <>
         {showInfo ? (
        <LinkWrapper>
          <h2>Google 계정</h2>
          <h3>{JSON.parse(sessionStorage.getItem('userInfo')).name}</h3>
          <h4>{JSON.parse(sessionStorage.getItem('userInfo')).email}</h4>
        </LinkWrapper>
         ) : null}
         </>
      )}
      {modal? (
        <div>
          <Nav_modal>
              <Nav_modalin>
                <UserInfomation>
                  <img src={JSON.parse(sessionStorage.getItem('userInfo')).picture} />
                  <h6>{JSON.parse(sessionStorage.getItem('userInfo')).name}</h6>
                  <h4>{JSON.parse(sessionStorage.getItem('userInfo')).email}</h4>
                </UserInfomation>
                <LinkButton onClick={MyPageButton}>
                  <StyledLink to="/MyPage">MyPage</StyledLink>
                </LinkButton>
              </Nav_modalin>
              <UserButton onClick={logoutButton}>
                <h5><MdLogout /></h5>
                <h6>Logout</h6>
                </UserButton>
          </Nav_modal>
        </div>
      ):null}
    </div>
  );
}

const Pay_button = styled.button`
  position: absolute;
  right: 15rem;
  bottom: 0.8rem;
  background-color: pink;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1rem;

  &:hover {
    background-color: hotpink;
  }
`

const UserInfomation = styled.div`
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    top: 1.3rem;
    left: 11px;
  }
  
  h4 {
    font-size: 15px;
    position: absolute;
    top: 53px;
    left: 80px;
  }
  
  h6 {
    font-size: 15px;
    position: absolute;
    top: 32px;
    left: 80px;
  }
`

const Nav_modalin = styled.div`
  width: 270px;
  height: 160px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  border-radius: 30px;
  font-family: "Jalnan";
  top: 0.3rem;
`

const Nav_modal = styled.div`
  background-color: #F3F6FC;
  width: 286px;
  height: 236px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  z-index: 1;
  border-radius: 30px;
  border: 2px solid #DFE1E5;
  font-family: "Jalnan";
  right: 2rem;
  top: 4rem;
`

const LinkWrapper = styled.div`
  background-color: #3C4043;
  border-radius: 4px;
  color: #fff;
  padding-right: 3px;
  padding-left: 3px;
  position: absolute;
  z-index: 1;
  right: 50px;
  top: 3.5rem;
  transition: 3s ease-in;

  h2 {
    font-size: 12px;
    position: relative;
    bottom: -6px;
    text-align: left;
  }

  h3 {
    position: relative;
    font-size: 12px;
    color: #A5C1BB;
    bottom: -4px;
    text-align: left;
  }

  h4 {
    position: relative;
    font-size: 12px;
    color: #A5C1BB;
  }
`;

const UserButton = styled.button`
  position : absolute;
  background-color: #F3F6FC;
  width: 270px;
  height: 60px;
  bottom: 9px;
  border: none;
  border-radius: 30px;
  font-family: "Jalnan";
  &:hover {
    background: #E2EBF9; // mouse hover 시 #E2EBF9 색상으로 변경
  }

  h5{
    position : absolute;
    left: 4rem;
    bottom: 11px;
  }

  h6 {
    position : absolute;
    right: 6.9rem;
    bottom: 13px;
  }
`

const LinkButton = styled.button`
  position : absolute;
  background-color: white;
  width: 270px;
  height: 60px;
  bottom: 0rem;
  border: none;
  border-radius: 30px;
  &:hover {
    background: #E2EBF9;
  }
`

const StyledLink = styled(Link)`
  position : relative;
  color: black;
  font-size: 14px;
  text-decoration: none;
  padding: none;
  border: none;
  background-color: none;
  font-family: "Jalnan";
`;

const Button = styled.button`
  background: none;
  color: black;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 190px;
  bottom: 1rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    top: 0px;
  }
`;

const NameButton = styled.button`
  background: none;
  color: black;
  border: none;
  position: absolute;
  right: 2.7rem;
  top: 1.75rem;
  width: 148px;
  height: 25px;
`

export default DropdownMenu;