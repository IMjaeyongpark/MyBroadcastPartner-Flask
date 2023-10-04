import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  height: 4vh;
  width: ${({ isSmallScreen }) => (isSmallScreen ? "90%" : "50%")};
  background-color: white;
  border-radius: 50px;
  margin: 3vh;
  position: relative;
  top: ${({ isSmallScreen }) => (isSmallScreen ? "auto" : "3%")};
  bottom: ${({ isSmallScreen }) => (isSmallScreen ? "5%" : "auto")};
  left: ${({ isSmallScreen }) => (isSmallScreen ? "50%" : "47%")};
  transform: ${({ isSmallScreen }) =>
    isSmallScreen ? "translate(55%, -200%)" : "translateY(-50%)"};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const PositiveFiller = styled.div`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: #0000ff;
  border-radius: inherit;
  text-align: right;
  transition: width 1s ease-in-out;
  display: inline-block;
`;

const NegativeFiller = styled.div`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: #ff0000;
  border-radius: inherit;
  text-align: right;
  transition: width 1s ease-in-out;
  display: inline-block;
`;

const PositivePercentage = styled.div`
  padding: 1vh;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: ${({ isSmallScreen }) => (isSmallScreen ? "50%" : "45%")};
  left: ${({ isSmallScreen }) => (isSmallScreen ? "50%" : "95%")};
  transform: ${({ isSmallScreen }) =>
    isSmallScreen ? "translate(50%, -50%)" : "translate(-50%, -50%)"};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    left: ${({ isSmallScreen }) => (isSmallScreen ? "95%" : "95%")};
    top: ${({ isSmallScreen }) => (isSmallScreen ? "60%" : "45%")};
    transform: ${({ isSmallScreen }) =>
      isSmallScreen ? "translate(-50%, -50%)" : "translate(-50%, -50%)"};
  }
`;
const NegativePercentage = styled.div`
  padding: 1vh;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: ${({ isSmallScreen }) => (isSmallScreen ? "50%" : "45%")};
  right: ${({ isSmallScreen }) => (isSmallScreen ? "50%" : "82%")};
  transform: ${({ isSmallScreen }) =>
    isSmallScreen ? "translate(50%, -50%)" : "translate(-50%, -50%)"};

  @media (max-width: 768px) {
    font-size: 1.3rem;
    left: ${({ isSmallScreen }) => (isSmallScreen ? "7%" : "82%")};
    top: ${({ isSmallScreen }) => (isSmallScreen ? "60%" : "45%")};
    transform: ${({ isSmallScreen }) =>
      isSmallScreen ? "translate(-50%, -50%)" : "translate(-50%, -50%)"};
  }
`;
const PositiveText = styled.h3`
  color: #0000ff;
  font-weight: bold;
  font-size: 1.3rem;
  position: absolute;
  top: ${({ isSmallScreen }) => (isSmallScreen ? "56%" : "calc(100% + 2vh)")};
  right: ${({ isSmallScreen }) => (isSmallScreen ? "50%" : "0")};
  transform: ${({ isSmallScreen }) =>
    isSmallScreen ? "translate(50%, -50%)" : "translate(50%, -50%)"};

  @media (max-width: 768px) {
    font-size: 1.3rem;
    right: ${({ isSmallScreen }) => (isSmallScreen ? "5%" : "0")};
    top: ${({ isSmallScreen }) => (isSmallScreen ? "150%" : "calc(100% + 5vh)")};
  }
`;

const NegativeText = styled.h1`
  color: #ff0000;
  font-weight: bold;
  font-size: 1.3rem;
  margin-top:1000px;
  top: ${({ isSmallScreen }) => (isSmallScreen ? "56%" : "calc(100% + 2vh)")};
  right: ${({ isSmallScreen }) => (isSmallScreen ? "56%" : "20")};
  transform: ${({ isSmallScreen }) =>
    isSmallScreen ? "translate(50%, -50%)" : "translateX(-30%) translateY(-50%)"};

  @media (max-width: 768px) {
    font-size: 1.3rem;
    right: ${({ isSmallScreen }) => (isSmallScreen ? "93%" : "0")};
    top: ${({ isSmallScreen }) => (isSmallScreen ? "150%" : "calc(100% + 5vh)")};
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
    <ProgressBarContainer isSmallScreen={isSmallScreen}>
      <NegativeFiller percentage={negativePercentage} />
      <PositiveFiller percentage={positivePercentage} />
      <PositivePercentage isSmallScreen={isSmallScreen}>
        {positivePercentage}%
      </PositivePercentage>
      <NegativePercentage isSmallScreen={isSmallScreen}>
        {negativePercentage}%
      </NegativePercentage>
      <NegativeText>Negative</NegativeText>
      <PositiveText isSmallScreen={isSmallScreen}>Positive</PositiveText>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
