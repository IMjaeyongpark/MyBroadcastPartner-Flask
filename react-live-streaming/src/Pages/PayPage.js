import React, { useState } from 'react';
import styled from 'styled-components';

const PayPage = (props) => {

    return (
        <div>
            <Text_div>
                <h1>더 많은 기능이 필요하신가요?</h1>
                <h6>적합한 멤버십으로 효율적인 마케팅을 시작해 보세요. 구독해지는 언제든 가능합니다.</h6>
            </Text_div>
            <Scroll_div>
                <Card>
                    <h4>베이직</h4>
                    <h6>무료 제공 솔루션</h6>
                    <h2>무료</h2>
                    <h5>✓ 월 광고 제안 5회</h5>
                    <h5>✓ 즐겨찾기 제공(채널, 영상)</h5>
                </Card>
                <Card>
                    <h4>스탠다드</h4>
                    <h6>광고 제안의 첫걸음</h6>
                    <h2>₩29,000</h2>
                    <h5>✓ 월 광고 제안 10회</h5>
                    <h5>✓ 시청자 분석 기능 20회</h5>
                    <h5>✓ 광고 단가 기능 20회</h5>
                    <h5>✓ 즐겨찾기 제공(채널, 영상)</h5>
                    <h5>✓ 유튜브 채널 비교</h5>
                    <button>무료체험 하기</button>
                </Card>
                <Card>
                    <h4>스타트업</h4>
                    <h6>유튜버 매칭을 위한 솔루션</h6>
                    <h2>₩99,000</h2>
                    <h5>✓ 월 광고 제안 100회</h5>
                    <h5>✓ 시청자 분석 기능 100회</h5>
                    <h5>✓ 광고 단가 기능 100회</h5>
                    <h5>✓ 즐겨찾기 제공(채널, 영상)</h5>
                    <h5>✓ 유튜브 채널 비교</h5>
                    <h5>✓ 데이터 다운로드</h5>
                    <button>시작하기</button>
                </Card>
                <Card>
                    <h4>프로페셔널</h4>
                    <h6>효율적인 마케팅을 위한 솔루션</h6>
                    <h2>₩499,000</h2>
                    <h5>✓ 월 광고 제안 500회</h5>
                    <h5>✓ 시청자 분석 기능 무제한</h5>
                    <h5>✓ 광고 단가 기능 무제한</h5>
                    <h5>✓ 즐겨찾기 제공(채널, 영상)</h5>
                    <h5>✓ 유튜브 채널 비교</h5>
                    <h5>✓ 데이터 다운로드</h5>
                    <button>시작하기</button>
                </Card>
                <Card>
                    <h4>엔터프라이즈</h4>
                    <h6>데이터 분석을 위한 모든 솔루션</h6>
                    <h2>가격문의</h2>
                    <h5>✓ 월 광고 제안 3000회</h5>
                    <h5>✓ 프로페셔널 모든 기능</h5>
                    <h5>✓ 맞춤 페이지 제작</h5>
                    <button>상담 요청하기</button>
                </Card>
            </Scroll_div>
        </div>
    )
}

const Text_div = styled.div`
  margin-top: 2rem;
  h1 {
    font-weight: 600;
  }
  h6 {
    margin-top: 1rem;
  }
`

const Scroll_div = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 4rem;
  justify-content: center;
`

const Card = styled.div`
  width: 250px;
  height: 400px;
  background-color: #f4f4f4;
  display: inline-block;
  padding: 1rem;
  margin-right: 20px;
  text-align: center;
  box-sizing: border-box;
  position: relative;

  h2 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;  
    font-size: 35px;
  }

  h4 {
    font-size: 18px;
    color: #32cd32;
  }

  h5 {
    font-size: 13px;
    text-align: left;
    margin-left: 1rem;
    margin-bottom: 0.75rem;
  }

  h6 {
    font-size: 16px;
  }

  button {
    width: 80%;
    height: 50px;
    background-color: #32cd32;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    position: absolute;  // 버튼의 위치를 절대적으로 설정
    bottom: 1rem;  // div의 맨 아래에서 1rem 위로 올림
    left: 50%;  // div의 가운데로 50% 이동
    transform: translateX(-50%);  // div의 가운데로 50% 이동
    &:hover {
      background-color: #32cd32;
    }
  }
`

export default PayPage;