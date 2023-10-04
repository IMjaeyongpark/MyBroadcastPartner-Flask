import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import "swiper/css/pagination";
import 'swiper/css';
import Url from '../Components/Url';

const MainPage = (props) => {
    
  return (
    <Container>
      <UserLabel>
            <MainBanner> 
              <MainText>
              <div style={{color:'black', fontSize: '45px'}}>
                <strong style={{color:'#ff0045'}}>실시간 시청자수 1만 콘텐츠!</strong><br/> 어떻게 만들지?
              </div><br/>
              <div style={{color:'gray', fontSize: '20px'}}>실시간으로 시청자들의 감정을 알고싶다면 <br/>지금바로 방송의 주소를 입력해주세요!</div>
              <Url setLiveData={props.setLiveData} />
              </MainText>  
              <TitleBanner>
                <img  style={{marginTop:40,marginLeft:60,height: '75%'}} className="title_logo2" alt="Title" src="img/main.png" />
              </TitleBanner>
            </MainBanner>
            </UserLabel>

            {/*하단 배너 */}
            <UserContainer>
              <Banner>
                <h2>나의 방송 파트너에 오신것을 환영합니다.</h2><br/>
                <h6>스트리머들을 위한 실시간 채팅 관리, 방송 감정 데이터 관리, 방송피드백 등</h6>
                <h6>다양한 기능이 제공되고 있습니다.</h6>
                <h6>크리에이터들의 시간과 노력을 절약 할 수 있습니다.</h6>
                <FeaturesContainer>
                  <FeatureItem>
                    <img src="img/AI.png"></img>
                    <h4>감정분석 AI</h4>
                    <h6>실시간으로 시청자들의 채팅을 AI가 3가지와</h6>
                    <h6>7가지의 감정을 분석합니다.</h6>
                  </FeatureItem>
                  <FeatureItem>
                    <img src="img/Flow.png"></img>
                    <h4>방송 흐름 분석</h4>
                    <h6>방송에 종료된 후 종합된 감정 데이터를 통해</h6>
                    <h6>방송의 방향성을 정할 수 있습니다.</h6>
                  </FeatureItem>
                  <FeatureItem>
                    <img src="img/Platform.png"></img>
                    <h4>유튜브 플랫폼</h4>
                    <h6>저희 플랫폼은 유튜브 스트리머를 대상으로</h6>
                    <h6>지원하고 있습니다.</h6>
                  </FeatureItem>
                </FeaturesContainer>
                <MyContainer>
                  <MyLift>
                    <img src="img/My_img.png"></img>
                  </MyLift>
                  <MyRight>
                    <h2>마이페이지</h2><br/>
                    <h6>데이터 분석을 통해 시청자들의 감정을 연도, 월, 일, 방송별로</h6>
                    <h6>시각화했습니다. 이 정보는 스트리머에게 시청자 반응을 이해하고,</h6>
                    <h6>방송 품질과 콘텐츠를 향상시키는 데 도움을 줍니다.</h6>
                    <DataText>
                      <img src="img/three.png"></img>
                      <h3>3가지 감정 데이터</h3>
                      <h6>3가지 감정 분석을 기반으로, 사용자가 선택한 시간대에</h6>
                      <h6>따라 해당 기간의 전체 데이터를 시각화합니다.</h6>
                    </DataText>
                    <DataText>
                      <img src="img/seven.png"></img>
                      <h3>7가지 감정 데이터</h3>
                      <h6>7가지 감정 분석을 기반으로, 사용자가 선택한 시간대와</h6>
                      <h6>감정에 대한 평균값을 계한하여 시각화합니다.</h6>
                    </DataText>
                  </MyRight>
                </MyContainer>
                <LifeContainer>
                  <LifeLeft>
                    <h2>실시간페이지</h2><br/>
                    <h6>방송 중에는 시청자들의 채팅과 함께 3가지 기본 감정(긍정, 부정, 중립) 및</h6>
                    <h6>7가지 상세 감정(행복, 분노, 혐오, 공포, 중립, 슬픔, 놀람)을</h6>
                    <h6>실시간으로 프로그래스바와 감정 이모티콘으로 사용자에게 시각화합니다.</h6>
                    <EmoticonText>
                      <img src="img/emoticon.png"></img>
                      <h3>감정 이모티콘</h3>
                      <h6>감정을 이모티콘으로 표현해 시청자</h6>
                      <h6>채팅 옆에 위치시켜 실시간으로</h6>
                      <h6>시각화합니다.</h6>
                    </EmoticonText>
                    <ProgressText>
                      <img src="img/progress.png"></img>
                      <h3>프로그래스바</h3>
                      <h6>감정을 프로그래스바 형태로 채팅방</h6>
                      <h6>옆에 배치하여 한눈에 쉽게</h6>
                      <h6>시각화합니다.</h6>
                    </ProgressText>
                  </LifeLeft>
                  <LifeRight>
                    <img src="img/Live_img.png"></img>
                  </LifeRight>
                </LifeContainer>
              <br />
              </Banner>
            </UserContainer>
    </Container>
      
  );
}

//메인페이지 전체 컨테이너
const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 700px;
`;
//메인페이지 방송화면 이미지
const TitleBanner = styled.div`
    height: 400px;
    margin-left : 30px;
`

//position : relative가 자식 , absolute가 부모 flex
const UserLabel = styled.div`
  
`
// url입력창과 스트리머이미지가 들어가있는 메인배너
const MainBanner = styled.div`
  width: 100%;
  
  background-color: pink;
  justify-content: center; 
  flex-direction: row;
  display: flex;
`;
// 메인배너 안에 우리 웹을 설명해주는 텍스트
const MainText = styled.div`
  justify-content: center; 
  flex-direction: column;
  display: flex;
  align-items: center;
`;

/////////////////////////////////////////하단css
const UserContainer = styled.div`
    width: 100%;
    height: 700px;
    margin-top: -13rem;
`;
// 우리 플랫폼의 주 기술 3가지
const FeaturesContainer = styled.div`
  margin-top: 5rem; 
  display: flex;
  justify-content: space-between; // 각 항목들 사이에 공간을 균등하게 배분
  justify-content: space-around; /* 가로 방향 중앙 정렬 */
  padding: 0 12rem; /* 왼쪽과 오른쪽에 좀 더 간격을 주기 위해 padding 추가 */
`;

// FeaturesContainer안에 주 기술 3가지의에 대한 css
const FeatureItem = styled.div`
  width: 20rem;
  padding: 20px;
  background-color: #F3F4F6;
  border-radius: 10px;
  text-align: left;
  margin: 1rem;
  img {
    width: 3rem;
    height: 3rem;
  }
  h4 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }
  h6 {
    font-size: 16px;
    color: #666;
  }
`;
//하단 배너
const Banner = styled.div`
   
    right: 0;
    left: 0;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 800px;
    margin-top: 300px; /* 위쪽 간격 조절 */
`;

//마이페이지부터 실시간페이지까지의 컨테이너
const MyContainer = styled.div`
  margin-top: 5rem; 
  display: flex;
  justify-content: space-between;
  padding: 0 15%;
`;

//마이페이지의 이미지설명 부분
const MyLift = styled.div`
  flex: 1; // 전체 공간의 1/3을 차지하도록 설정
  padding: 2rem; // 내부 요소와의 거리
  background-color: #f3f4f6; // 배경색
  border-radius: 15px;
  img {
    width: 28rem;
    height: 28rem;
    margin-top: 3rem;
  }
`;
//마이페이지의 텍스트 설명 부분
const MyRight = styled.div`
  flex: 1; // 전체 공간의 1/3을 차지하도록 설정
  padding: 2rem; // 내부 요소와의 거리
  border-radius: 15px;
  text-align: left;
  margin-left: 3rem;
`;

//마이페이지의 텍스트 설명부분
const DataText = styled.div`
  margin-top: 5rem;
  width: 20rem;
  text-align: left;
  
  img {
    width: 2rem;
    height: 2rem;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  h6 {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 5px;
  }
`;

//메인페이지 실시간페이지에 관한 설명
const LifeContainer = styled.div`
  margin-top: 5rem; 
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 0 15%;
`;

//메인페이지 실시간페이지에 관한 설명
const LifeLeft = styled.div`
  flex: 1; // 전체 공간의 1/3을 차지하도록 설정
  padding: 2rem; // 내부 요소와의 거리
  border-radius: 15px;
  text-align: left;
  margin-left: 3rem;
`;

//실시간 페이지 우측 7가지 감정을 원형 이미지로 설명한 부분
const LifeRight = styled.div`
  flex: 1; // 전체 공간의 1/3을 차지하도록 설정
  padding: 2rem; // 내부 요소와의 거리
  background-color: #f3f4f6; // 배경색
  border-radius: 15px;
  img {
    width: 26rem;
    height: 26rem;
    margin-top: 7rem;
  }
`;

//실시간 페이지 기능설명 중 감정 이모티콘
const EmoticonText = styled.div`
  margin-top: 5rem;
  width: 20rem;
  text-align: left;
  
  img {
    width: 2rem;
    height: 2rem;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  h6 {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 300;
  }
`;

//실시간 페이지 기능설명 중 프로그래스바
const ProgressText = styled.div`
  margin-top: 5rem;
  width: 20rem;
  text-align: left;
  
  img {
    width: 5rem;
    height: 1rem;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  h6 {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 300;
  }
`;


export default MainPage;