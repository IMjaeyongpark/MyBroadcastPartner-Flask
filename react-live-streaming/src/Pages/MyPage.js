import LineChats from '../Charts/LineChats';
import PieChats from '../Charts/PieChats';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MyPage = () => {
  const [broadCasts, setBroadCasts] = useState([]); // 서버에서 받아온 방송별 데이터
  const [yearsData, setYearsData] = useState([]); // 서버에서 받아온 연도별 데이터
  const [tabButtonKey, setTebButtonKey] = useState([]); // 연도별, 월별, 일별 데이터 구별
  const [yearsValue, setYearsValue] = useState([]); // 연도별 value
  const [monthsValue, setMonthsValue] = useState([]); // 월별 value
  const [dayValue, setDaysValue] = useState([]);  // 일별 value
  const [broadsValue, setBroadsValue] = useState([]); // 방송별 value
  const [yearSelected, setYearSelected] = useState(false);  // 연도별
  const [monthSelected, setMonthSelected] = useState(false);  // 월별
  const [selectedYear, setSelectedYear] = useState(null); // 연도별 조건
  const [selectedMonth, setSelectedMonth] = useState(null); // 일별 조건
  const [yearSelectValue, setYearSelectValue] = useState(""); // select value값
  const [monthSelectValue, setMonthSelectValue] = useState(""); // select value값
  const [daySelectValue, setDaySelectValue] = useState(""); // select value값
  const [broadSelectValue, setBroadSelectValue] = useState("");  // select value값
  const [modal, setModal] = useState(false);  // modal창
  const isLeapYear = (year) => (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));  // 연도에 따라 일별이 달라짐(28, 29, 30, 31)
  let shouldSetModal = false; // 정보 없음 modal창

  useEffect(() => { // 서버
    const serverIP = process.env.REACT_APP_GITHUB_IP;
    axios.get(`http://${serverIP}:8081/mypage`, {
      params: {
        email: String(JSON.parse(sessionStorage.getItem('userInfo')).email),
      }
    })
      .then((res) => {
        console.log("broadCastsData", res.data.broadCasts);
        console.log("yearsData", res.data.years)
        setBroadCasts(res.data.broadCasts)  // 방송별 데이터
        setYearsData(res.data.years); // 연도별 데이터
      }
      )
      .catch((Error) => { console.log(Error) });
  }, []);

  const logoutButton = () => {  // 로그 아웃
    sessionStorage.clear()
    window.location.replace("/");
  }

  const handleEntireButton = (e) => { // 전체 데이터 Select
    setYearSelectValue(""); // 연도 선택 상자 초기화
    setMonthSelectValue(""); // 월 선택 상자 초기화
    setDaySelectValue(""); // 일 선택 상자 초기화
    setBroadSelectValue(""); // 방송 선택 상자 초기화
    setYearSelected(false) // 월별 select문 활성화 초기화
    setMonthSelected(false); // 일별 select문 활성화 초기화
    setTebButtonKey("entires", 1); // KeyButton 함수에 Parameters (EntireButton slect key)
  };

  const handleYearSelect = (e) => { // 연도별 Select
    const year = e.target.value;  // year select value
    switch(year){
      case "2020": setYearsValue("-2"); break;
      case "2021": setYearsValue("-1"); break;
      case "2022": setYearsValue("1"); break;
      case "2023": setYearsValue("0"); break;
    }
    if (year !== "2022" && year !== "2023") {
      setModal(true);
      setYearSelected(false);
    } else {
      setModal(false);
      setTebButtonKey("years");// tebButtonKey years slect key
      setYearSelected(true);
      setSelectedYear(year === "" ? null : parseInt(year, 10)); // 연도별을 클릭하지 않으면 월별은 null 클릭하면 1월 ~ 12월 띄움
      setMonthSelectValue(""); // 월 선택 상자 초기화
      setDaySelectValue(""); // 일 선택 상자 초기화
      setBroadSelectValue(""); // 방송 선택 상자 초기화
      setMonthSelected(false); // 일별 select문 활성화 초기화
    }
  };

  const handleMonthSelect = (e) => {  // 월별 Select
    const monthBasic = e.target.value;  // month select value
    const month = parseInt(monthBasic.split("월")); // value에서 "월" 빼고 정수형
    if (yearsData[yearsValue].monthTotalData[month - 1] == null && yearsData[yearsValue].monthTotalData[month - 1] == undefined) {
      setModal(true);
      setMonthSelected(false);
    }
    else {
      setModal(false);
      setMonthSelected(true);
      setMonthsValue(month - 1);  // value - 1
      setTebButtonKey("months"); // tebButtonKey months slect key
      setSelectedMonth(parseInt(month, 10));  // 월별을 클릭하지 않으면 일별은 null, 클릭하면 1일 ~ 31일
      setDaySelectValue(""); // 일 선택 상자 초기화
      setBroadSelectValue(""); // 방송 선택 상자 초기화
    }
  };

  const handleDaySelect = (e) => {  // 일별 Select
    const dayBasic = e.target.value;  // day select value
    const day = parseInt(dayBasic.split("일")); // value에서 "일" 빼고 정수형
    if (yearsData[yearsValue].monthTotalData[monthsValue].day_total_data[day - 1] == null) {
      setModal(true);
    } else {
      setModal(false);
      setDaysValue(day - 1);  // value - 1
      setTebButtonKey("days"); // tebButtonKey days
      setBroadSelectValue(""); // 방송 선택 상자 초기화
    }
  };

  const handleBroadSelect = (e) => {  // 방송별 Select
    const broad = e.target.value; // broad select value
    setBroadsValue(broad);  // value
    setTebButtonKey("broadcasts"); // tebButtonKey broadcasts
    setYearSelectValue(""); // 연도 선택 상자 초기화
    setMonthSelectValue(""); // 월 선택 상자 초기화
    setDaySelectValue(""); // 일 선택 상자 초기화
    setBroadSelectValue(""); // 방송 선택 상자 초기화
    setYearSelected(false) // 월별 select문 활성화 초기화
    setMonthSelected(false); // 일별 select문 활성화 초기화
  };

  const getDaysInMonth = (month) => { // 연도별과 월별에 따른 일별
    if (!month || !selectedYear) return 0;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(selectedYear)) {
      return 29;
    }
    return daysInMonth[month - 1];
  };

  const getCurrentData = (tabButtonKey, yearsData, broadCasts) => {
    // 서버에서 받아온 데이터를 각각의 select의 Emotion3, Emotion7을 차트화
    let allEmotion3Data = [];
    let allEmotion7Data = [];

    switch (tabButtonKey) { // 연도별, 월별, 일별, 방송별 key 비교
      case "entires": // 전체인 경우
        if (yearsData[1] !== undefined) {
          allEmotion3Data = yearsData.map((yearItam) => { // 연도별 3가지 감정
            return {
              name: parseInt(yearItam._id.split(JSON.parse(sessionStorage.getItem('userInfo')).email)),
              negative: yearItam.All_Emotion3[0],
              positive: yearItam.All_Emotion3[1],
              neutrality: yearItam.All_Emotion3[2],
            };
          });

          allEmotion7Data = yearsData.map((yearItem) => {
            // 연도별 7가지 감정
            return [
              { name: "Nervous", value: yearItem ? yearItem.All_Emotion7[0] : 0 },
              { name: "Embrrassed", value: yearItem ? yearItem.All_Emotion7[1] : 0 },
              { name: "Angry", value: yearItem ? yearItem.All_Emotion7[2] : 0 },
              { name: "Sadness", value: yearItem ? yearItem.All_Emotion7[3] : 0 },
              { name: "Neutral", value: yearItem ? yearItem.All_Emotion7[4] : 0 },
              { name: "Happiness", value: yearItem ? yearItem.All_Emotion7[5] : 0 },
              { name: "Disgust", value: yearItem ? yearItem.All_Emotion7[6] : 0 }

            ];
          }).flat() // 중첩 배열을 단일 배열로 변환
        } else {
          shouldSetModal = true;
        }
        break;

      case "years": // 연도별인 경우
        if (yearsData[yearsValue] !== undefined) {
          // id가 value와 같지 않다면 데이터 X 모달창
          allEmotion3Data = yearsData[yearsValue].monthTotalData.map((monthItam, index) => { // 월별의 3가지 감정

            return {
              name: `${index + 1}월`,
              negative: monthItam ? monthItam.All_Emotion3[0] : 0,
              positive: monthItam ? monthItam.All_Emotion3[1] : 0,
              neutrality: monthItam ? monthItam.All_Emotion3[2] : 0,
            };
          });

          allEmotion7Data = yearsData[yearsValue].monthTotalData.map((monthItam) => {  // 월별의 7가지 감정
            return [
              { name: "Nervous", value: monthItam ? monthItam.All_Emotion7[0] : 0 },
              { name: "Embrrassed", value: monthItam ? monthItam.All_Emotion7[1] : 0 },
              { name: "Angry", value: monthItam ? monthItam.All_Emotion7[2] : 0 },
              { name: "Sadness", value: monthItam ? monthItam.All_Emotion7[3] : 0 },
              { name: "Neutral", value: monthItam ? monthItam.All_Emotion7[4] : 0 },
              { name: "Happiness", value: monthItam ? monthItam.All_Emotion7[5] : 0 },
              { name: "Disgust", value: monthItam ? monthItam.All_Emotion7[6] : 0 }
            ];
          }).flat() // 중첩 배열을 단일 배열로 변환
        } else {
          shouldSetModal = true;
        }
        break;

      case "months":  // 월별인 경우
        if (yearsData[yearsValue].monthTotalData[monthsValue] != null && yearsData[yearsValue].monthTotalData[monthsValue] != undefined) { // 사용자가 클릭한 month select value가 null이 아니라면 3가지 감정과 7가지 감정을 차트화
          allEmotion3Data = yearsData[yearsValue].monthTotalData[monthsValue].day_total_data.map((dayItam, index) => {  // 일별의 3가지 감정
            return {
              name: `${index + 1}일`,
              negative: dayItam ? dayItam.All_Emotion3[0] : 0,
              positive: dayItam ? dayItam.All_Emotion3[1] : 0,
              neutrality: dayItam ? dayItam.All_Emotion3[2] : 0,
            }
          });

          allEmotion7Data = yearsData[yearsValue].monthTotalData[monthsValue].day_total_data.map((dayItam, index) => { // 일별의 7가지 감정
            return [
              { name: "Nervous", value: dayItam ? dayItam.All_Emotion7[0] : 0 },
              { name: "Embrrassed", value: dayItam ? dayItam.All_Emotion7[1] : 0 },
              { name: "Angry", value: dayItam ? dayItam.All_Emotion7[2] : 0 },
              { name: "Sadness", value: dayItam ? dayItam.All_Emotion7[3] : 0 },
              { name: "Neutral", value: dayItam ? dayItam.All_Emotion7[4] : 0 },
              { name: "Happiness", value: dayItam ? dayItam.All_Emotion7[5] : 0 },
              { name: "Disgust", value: dayItam ? dayItam.All_Emotion7[6] : 0 },
            ];
          }).flat() // 중첩 배열을 단일 배열로 변환
        } else { // 사용자가 클릭한 month select value가 null이라면 motal창 띄움
          shouldSetModal = true;
        }
        break;

      case "days":  // 일별인 경우 
        if (yearsData[yearsValue].monthTotalData[monthsValue].day_total_data != null) { // 사용자가 클릭한 day select value가 null이 아니라면 3가지 감정과 7가지 감정을 차트화
          allEmotion3Data = yearsData[yearsValue].monthTotalData[monthsValue].day_total_data[dayValue].one_Hour_Emotion.map((timeItam, index) => { // 시간대 3가지 감정
            return {
              name: `${index + 1}시`,
              negative: timeItam ? timeItam.All_Emotion3[0] : 0,
              positive: timeItam ? timeItam.All_Emotion3[1] : 0,
              neutrality: timeItam ? timeItam.All_Emotion3[2] : 0,
            };
          });

          allEmotion7Data = yearsData[yearsValue].monthTotalData[monthsValue].day_total_data[dayValue].one_Hour_Emotion.map((timeItam) => { // 시간대 7가지 감정
            return [
              { name: "Nervous", value: timeItam ? timeItam.All_Emotion7[0] : 0 },
              { name: "Embrrassed", value: timeItam ? timeItam.All_Emotion7[1] : 0 },
              { name: "Angry", value: timeItam ? timeItam.All_Emotion7[2] : 0 },
              { name: "Sadness", value: timeItam ? timeItam.All_Emotion7[3] : 0 },
              { name: "Neutral", value: timeItam ? timeItam.All_Emotion7[4] : 0 },
              { name: "Happiness", value: timeItam ? timeItam.All_Emotion7[5] : 0 },
              { name: "Disgust", value: timeItam ? timeItam.All_Emotion7[6] : 0 },
            ];
          }).flat() // 중첩 배열을 단일 배열로 변환
        } else {  // 사용자가 클릭한 day select value가 null이라면 motal창 띄움
          shouldSetModal = true;
        }
        break;

      case "broadcasts":  // 방송별인 경우
        if (broadCasts[broadsValue] != undefined) {
          const broadItem = broadCasts[broadsValue];
          console.log(broadItem.All_Emotion3[0])
          allEmotion3Data = [
            {
              name: '감정',
              negative: broadItem ? broadItem.All_Emotion3[0] : 0,
              positive: broadItem ? broadItem.All_Emotion3[1] : 0,
              neutrality: broadItem ? broadItem.All_Emotion3[2] : 0,
            }
          ];
          allEmotion7Data = [
            { name: 'Nervous', value: broadItem ? broadItem.All_Emotion7[0] : 0 },
            { name: 'Embrrassed', value: broadItem ? broadItem.All_Emotion7[1] : 0 },
            { name: 'Angry', value: broadItem ? broadItem.All_Emotion7[2] : 0 },
            { name: 'Sadness', value: broadItem ? broadItem.All_Emotion7[3] : 0 },
            { name: 'Neutral', value: broadItem ? broadItem.All_Emotion7[4] : 0 },
            { name: 'Happiness', value: broadItem ? broadItem.All_Emotion7[5] : 0 },
            { name: 'Disgust', value: broadItem ? broadItem.All_Emotion7[6] : 0 },
          ].flat();
          break;
        } else {  // 사용자가 클릭한 day select value가 null이라면 motal창 띄움
          shouldSetModal = true;
        }
      default:

        if (yearsData[1] !== undefined) {
          allEmotion3Data = yearsData.map((yearItam) => { // 연도별 3가지 감정
            return {
              name: parseInt(yearItam._id.split(JSON.parse(sessionStorage.getItem('userInfo')).email)),
              negative: yearItam.All_Emotion3[0],
              positeve: yearItam.All_Emotion3[1],
              neutrality: yearItam.All_Emotion3[2],
            };
          });

          allEmotion7Data = yearsData.map((yearItem) => {
            // 연도별 7가지 감정

            return [
              { name: "Nervous", value: yearItem ? yearItem.All_Emotion7[0] : 0 },
              { name: "Embrrassed", value: yearItem ? yearItem.All_Emotion7[1] : 0 },
              { name: "Angry", value: yearItem ? yearItem.All_Emotion7[2] : 0 },
              { name: "Sadness", value: yearItem ? yearItem.All_Emotion7[3] : 0 },
              { name: "Neutral", value: yearItem ? yearItem.All_Emotion7[4] : 0 },
              { name: "Happiness", value: yearItem ? yearItem.All_Emotion7[5] : 0 },
              { name: "Disgust", value: yearItem ? yearItem.All_Emotion7[6] : 0 }
            ];
          }).flat() // 중첩 배열을 단일 배열로 변환
        } else {
          shouldSetModal = true;
        }
        break;
    }
    return { allEmotion3Data, allEmotion7Data };
  };

  useEffect(() => {
    const { allEmotion3Data, allEmotion7Data } = getCurrentData(
      tabButtonKey,
      yearsData,
      broadCasts
    );

    // getCurrentData에서 반환된 shouldSetModal 값으로 판단하여 상태 변경을 처리합니다.
    if (shouldSetModal) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [tabButtonKey,
    yearsData,
    broadCasts]);

  const { allEmotion3Data, allEmotion7Data } = getCurrentData(  // getCurrentData 함수 불러오기
    tabButtonKey,
    yearsData,
    broadCasts
  );

  const groupedAllEmotion7Data = allEmotion7Data.reduce((groups, item) => {
    const key = item.name;
    if (!groups[key]) {
      groups[key] = { name: key, value: 0 };
    }
    groups[key].value += item.value;
    return groups;
  }, {});

  // 객체를 배열로 변환
  const combinedAllEmotion7Data = Object.values(groupedAllEmotion7Data);

  return (
    <>
      <div id="root">
        <UserInfo>
          <img src={JSON.parse(sessionStorage.getItem('userInfo')).picture} />
          <h4>
            {JSON.parse(sessionStorage.getItem('userInfo')).given_name}님
            <h6>
              ({JSON.parse(sessionStorage.getItem('userInfo')).name})
            </h6>
          </h4>
          <h5>
            {JSON.parse(sessionStorage.getItem('userInfo')).email}
          </h5>
        <button onClick={logoutButton}>로그아웃</button>
      </UserInfo>
      
      <ChartSty>
        <h5>시간대/감정</h5>
        <h6>연도별,월별,일별,방송별 시간대 및 감정을 조회할 수 있습니다.</h6>
        <EntireButton onClick={handleEntireButton}>
          전체
        </EntireButton>
        <YearSelect
          value={yearSelectValue}
          onChange={(e) => {
            setYearSelectValue(e.target.value);
            handleYearSelect(e);
          }}
        >
          <option value="">연도별</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </YearSelect>
        <MonthSelect
          value={monthSelectValue}
          onChange={(e) => {
            setMonthSelectValue(e.target.value);
            handleMonthSelect(e);
          }}
        >
          <option value="">월별</option>
          {yearSelected && Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month}>{month}월</option>
          ))}
        </MonthSelect>
        <DaySelect
          value={daySelectValue}
          onChange={(e) => {
            setDaySelectValue(e.target.value);
            handleDaySelect(e);
          }}
        >
          <option value="">일별</option>
          {monthSelected && Array.from({ length: getDaysInMonth(selectedMonth) }, (_, i) => i + 1).map((day) => (
            <option key={day}>{day}일</option>
          ))}
        </DaySelect>
        <BroadSelct
          value={broadSelectValue}
          onChange={(e) => {
            setBroadSelectValue(e.target.value);
            handleBroadSelect(e);
          }}
        >
          <option value="">방송별</option>
          {broadCasts.map((broadCastItem, index) => (
            <option key={index} value={index}>
              {broadCastItem.title}
            </option>
          ))}
        </BroadSelct>
        <LineSty>
            <LineChats data={allEmotion3Data}/>
        </LineSty>
        <PieSty>
          <PieChats data={combinedAllEmotion7Data} />
        </PieSty>
        {modal? (
          <div>
            <Nav_modal>
              <h3>해당 날짜의 데이터가 없습니다.</h3>
            </Nav_modal>
            <Navi_modal>
              <h3>해당 날짜의 데이터가 없습니다.</h3>
            </Navi_modal>
          </div>
        ):null}
      </ChartSty>
    </div>
    {/* 피드백*/}
    <FeedbackFir>BROADCAST<br />FEEDBACK</FeedbackFir>
      <Broadcastsection>
        <FeedBackCon><br /><br /><FeedbackTitle style={{ color: "#8884d8" }}>Positive</FeedbackTitle>
          <a href={"https://www.youtube.com/watch?v=6jThOENuQQE&t=275"} target="_blank"
            rel="noopener noreferrer">
            <img src="/emoticons/testpic2.png" style={{
              width: "250px",
              height: "120px",
              marginTop: "20px"
            }} /></a>
          <FeedbackText><strong style={{ color: "black", fontSize: "35px" }}>04:35 ~ 05:20</strong><br />시간대에 시청자들이<br />가장 좋아해요</FeedbackText></FeedBackCon>

        <FeedbackTitle2><br /><br /><FeedbackTitle style={{ color: "hotpink" }}>Negative</FeedbackTitle>

          <FeedbackText><strong style={{ color: "black", fontSize: "35px" }}>06:35 ~ 06:59</strong><br />시간대에 시청자들이<br />가장 실망했어요</FeedbackText>

          <a href={"https://www.youtube.com/watch?v=6jThOENuQQE&t=395"} target="_blank"
            rel="noopener noreferrer">
            <img src="/emoticons/testpic.png" style={{
              width: "250px",
              height: "120px",
              marginTop: "20px"
            }} /></a>
        </FeedbackTitle2>

        <Tmp><br /><br /><FeedbackTitle >Happiness</FeedbackTitle>

          <a href={"https://www.youtube.com/watch?v=6jThOENuQQE&t=335"} target="_blank"
            rel="noopener noreferrer">
            <img src="/emoticons/testpic3.png" style={{
              width: "250px",
              height: "120px",
              marginTop: "20px"
            }} /></a>
          <FeedbackText><strong style={{ color: "black", fontSize: "35px" }}>05:35 ~ 06:12</strong><br />시간대에 시청자들이<br />가장 행복해요</FeedbackText></Tmp>

      </Broadcastsection>
      <br /><br /><br /> <br />
    </>
  );
}

const Navi_modal = styled.div`
  width: 400px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.9; 
  z-index: 1;
  margin-left: 59rem;
  margin-top: -22.5rem;
`

const Nav_modal = styled.div`
  width: 870px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.9; 
  z-index: 1;
  margin-top: -22.5rem;
  margin-left: 2rem;
`

const EntireButton = styled.button`
  border: none;
  border-radius: 30%;
   width: 50px;
  height: 30px;
   appearance: none;
   font-size: 11px;
  text-align: center;
   background-color: white;
  margin-left: 60rem;
`

const YearSelect = styled.select`
  border: none;
  border-radius: 30%;
   width: 50px;
  height: 30px;
   appearance: none;
   font-size: 11px;
  text-align: center;
   background-color: white;
  margin-left: 0.5rem;
`

const MonthSelect = styled.select`
  border: none;
  border-radius: 30%;
   width: 50px;
  height: 30px;
   appearance: none;
   font-size: 11px;
  text-align: center;
   background-color: white;
  margin-left: 0.5rem;
`

const DaySelect = styled.select`
  border: none;
  border-radius: 30%;
  width: 50px;
  height: 30px;
  appearance: none;
  font-size: 11px;
  text-align: center;
  background-color: white;
  margin-left: 0.5rem;

  option {
    min-width: 30rem;
  }
`

const BroadSelct = styled.select`
  border: none;
  border-radius: 30%;
  width: 50px;
  height: 30px;
  appearance: none;
  font-size: 11px;
  text-align: center;
  background-color: white;
  margin-left: 0.5rem;
  
`

const LineSty = styled.div`
  width: 870px;
  height: 360px;
  background-color: white;
  margin-top: 1rem;
  margin-left: 2rem;

  border-radius:10px
`

const PieSty = styled.div`
  width: 400px;
  height: 360px;
  background-color: white;
  font-size: 10px;
  margin-left: 59rem;
  margin-top: -22.5rem;

  border-radius:10px
`

const UserInfo = styled.div`
  position: absolute;
  top: 5.8rem;
  left: 14rem;
  width: 400px;
  height: 120px;
  margin: auto;
  
  img {
    border-radius: 50%;
    position: relative;
    top: 1rem;
    right: 10rem;
  }

  h4 {
    position: relative;
    bottom: 3.5rem;
    right: 4.3rem;
  }

  h5 {
    position: relative;
    top: -5.3rem;
    right: -1.1rem;
  }

  h6 {
    position: relative;
    bottom: 1.5rem;
    left: 3.5rem;
  }

  button {
    width: 175px;
    height: 45px;
    background: white;
    border-radius: 30px;
    border: 2px solid #e9ecef;
    position: relative;
    bottom: 9rem;
    right: 0;
    margin-right: -110vw; 
    &:hover {
      background: #E2EBF9; // mouse hover 시 #E2EBF9 색상으로 변경
    }
  }
`

const ChartSty = styled.div`
  border-radius:10px;
  width: 1380px;
  height: 470px;
  background-color: pink;
  margin: auto;
  margin-top: 12.5rem;
  
  
  h5 {
    font-size: 15px;
    font-weight: 700;
    position: relative;
    right: 39rem;
    top: 1.7rem;
  }

  h6 {
    font-size: 11px;
    font-weight: 300;
    position: relative;
    right 33rem;
    top: 1.5rem;
  }

  h4 {
    width: 400px;
    position: relative;
    bottom: 20.5rem;
    left: 59.85rem;
  }
`
const FeedbackFir = styled.div`
  font-size: 80px;
  margin-top: 200px;
  color: white;
  background-color: pink;
`

const Broadcastsection = styled.div`
  width: 1380px;
  height: 470px;
  display: inline-flex;
  left: 4.5rem;
  top: 14.5rem;
  justify-content: space-around;
  
  margin-top:40px;
`

const Tmp = styled.div`
  width: 350px;
  height: 440px;
  margin-top:15px;
  border-radius:10px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  }
`

const FeedBackCon = styled.div`
  width: 350px;
  height: 440px;
  margin-top:15px;
  border-radius:10px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  }
`

const FeedbackTitle = styled.h1`
  color:#17a48f;
  font-size: 40px;
  font-weight:bold;
`

const FeedbackTitle2 = styled.div`
  width: 350px;
  height: 440px;
  margin-top:15px;
  border-radius:10px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  }
`

const FeedbackText = styled.h1`
  color:gray;
  line-height:50px;
  margin-top:20px;
  font-size: 25px;
`
export default MyPage;