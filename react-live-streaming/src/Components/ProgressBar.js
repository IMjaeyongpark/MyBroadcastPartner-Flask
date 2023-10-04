import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  background-color: white;
  width: 50%;
  margin-left: 45%;
  bottom: 550px;
  height: 33px;
  border-radius: 50px;
  position: relative;
`;

const PositiveFiller = styled.div`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: #066ad1;
  border-radius: inherit;
  text-align: right;
  transition: width 1s ease-in-out;
  display: inline-block;
`;

const NegativeFiller = styled.div`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background:  #FF5db0;
  border-radius: inherit;
  text-align: right;
  transition: width 1s ease-in-out;
  display: inline-block;
`;

const PositivePercentage = styled.div`
  padding:1vh;
  color: white;
  font-family: "Noto Sans AO";
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  right: 1%;
  top: -20%;
  }
`;
const NegativePercentage = styled.div`
  padding: 1vh;
  color: white;
  font-family: "Noto Sans AO";
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  right: 88%; 
  top: -20%;
  }
`;

const PositiveText = styled.h3`
  position: absolute;
  color: #0000ff;
  font-family: Noto Sans B0;
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 93%;
  margin-top: -1%;
  }
`;

const NegativeText = styled.h1`
  position: absolute;
  color: #ff0000;
  font-family: Noto Sans B0;
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: -5%;
  margin-top: -1%;
  
  }
`;


const ProgressBar = (props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  var positivePercentage = parseInt((props.positive / props.total) * 100);
  var negativePercentage = 100 - positivePercentage;
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ProgressBarContainer>
      <NegativeFiller percentage={negativePercentage} />
      <PositiveFiller percentage={positivePercentage} />
      <PositivePercentage>
        {positivePercentage}%
      </PositivePercentage>
      <NegativePercentage>
        {negativePercentage}%
      </NegativePercentage>
      <NegativeText>Negative</NegativeText>
      <PositiveText>Positive</PositiveText>
    </ProgressBarContainer>
  );
};

export default ProgressBar;