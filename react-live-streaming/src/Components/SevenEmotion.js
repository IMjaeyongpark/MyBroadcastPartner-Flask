import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

// Chart Colors
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', '#FFFFFF'];
// 감정명 크기
const emotionStyle = {fontSize: '1.5rem'};
// 7가지 감정
const emotions = ['Nervous', 'Embrrassed', 'Angry', 'Sadness', 'Neutral', 'Happiness','Disgust'];
// uv는 차트 초깃값
const initialData = emotions.map(emotion => ({ name: emotion , uv: 0 , style: emotionStyle }));
//차트 모양
const TriangleBar = ({ fill,x,y,width,height }) => <path d={getPath(x,y,width,height)} stroke="none" fill={fill}/>;
//차트 크기
const getPath = (x, y, width, height) => {  //
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

//LivePage에서 Props를 통해 받은 data(채팅데이터)를 사용함
function SevenEmoticon({ data }) {
  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    //감정에 따른 갯수 카운트
    const emotionCounts = {
      Nervous: data.filter((message) => message.emotion7 === 0).length,
      Embrrassed: data.filter((message) => message.emotion7 === 1).length,
      Angry: data.filter((message) => message.emotion7 === 2).length,
      Sadness: data.filter((message) => message.emotion7 === 3).length,
      Neutral :data.filter((message) => message.emotion7 === 4).length ,
      Happiness:data.filter((message) => message.emotion7 === 5).length ,
      Disgust :data.filter((message) => message.emotion7 ===6 ).length
    }

    setChartData(prevData =>
       prevData.map(item =>
         ({...item , uv : emotionCounts[item.name]}))
     );
}, [data]);

 return (
   <ChartContainer>
     <ResponsiveContainer aspect={2.8 / 1}> 
       <BarChart
       data={chartData}
       margin={{
         top: 5,
         right: 580,
         left: -15,
         bottom: -5,
       }}
     >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" stroke="black" />
       <YAxis domain={[0, 50]}/>
       <Bar
         dataKey="uv"
         fill="#8884d8"
         shape={<TriangleBar />}
         label={{ position: 'top' }}
       >
         {data.map((entry, index) => (
           <Cell
             key={`cell-${index}`}
             fill={colors[index % 20]}
           />
         ))}
       </Bar>
       </BarChart>
     </ResponsiveContainer>
   </ChartContainer>
 );
}

//차트 컨테이너 css
const ChartContainer = styled.div`
position: relative;
bottom: 490px;
left: 550px;
}
`;

export default SevenEmoticon;


