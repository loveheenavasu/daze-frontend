import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const Wrapper = styled.div`
  width: 100%;
  overflow-x: visible;
  position: relative;
  display: flex;
  @media (max-width: 960px) {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      border-radius: 0;
      height: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #959595;
    }
  }
`;

const Content = styled.div`
  position: relative;
  display: inline-flex;
  /* align-items: center; */
  /* flex-wrap: no-wrap; */
  /* width: fit-content; */
  left: ${({ left }) => left.desktop};
  @media (max-width: 960px) {
    left: ${({ left }) => left.mobile};
    margin-bottom: 7px;
  }
`;

const Slide = styled.div`
  display: flex;
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 25px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 99;
  border-radius: 100%;
  transition: opacity 0.2s ease;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  background: #ececec;
  -webkit-box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: auto;
    width: 40%;
  }
  @media (max-width: 960px) {
    display: none;
  }
`;

const LeftArrowWrapper = styled(ArrowWrapper)`
  left: 0;
  img {
    margin-right: 3px;
    transform: rotate(-90deg);
  }
`;

const RightArrowWrapper = styled(ArrowWrapper)`
  right: 0;

  img {
    margin-left: 3px;
    transform: rotate(90deg);
  }
`;

const Slider = (props) => {
  let [left, setLeft] = useState(0);
  let [rightArrow, setRightArrow] = useState(true);
  let [leftArrow, setLeftArrow] = useState(false);

  useEffect(() => {
    // this.refsArray.map(ref => {
    //   console.log(ref.current.offsetTop);
    // });
    let content = document.getElementById(`${props.sliderName}`);
    let leftMargin = Math.round(content.getBoundingClientRect().left);
    let width = content.offsetWidth;
    if (props.children.length > 3) {
      setRightArrow(true);
    } else if (width <= window.innerWidth - leftMargin) {
      setRightArrow(false);
    }
  }, [props.children]);

  useEffect(() => {
    let content = document.getElementById(`${props.sliderName}`);
    let leftMargin = Math.round(content.getBoundingClientRect().left);
    let right = Math.round(content.getBoundingClientRect().right);
    console.log(leftMargin, content.offsetLeft, right, window.innerWidth);
    if (left !== 0) {
      if (leftMargin < content.offsetLeft) {
        setLeftArrow(true);
      } else if (leftMargin >= content.offsetLeft) {
        setLeftArrow(false);
      }
      if (window && right < window.innerWidth) {
        setRightArrow(false);
      } else if (window && right >= window.innerWidth) {
        setRightArrow(true);
      }
    }
  }, [left]);

  const handleArrowClick = (direction) => {
    let content = document.getElementById(`${props.sliderName}`);
    let width = content.offsetWidth;

    let toAdd;
    if (direction === "right") {
      toAdd = -(width / props.children.length);
    } else if (direction === "left") {
      toAdd = width / props.children.length;
    }
    // console.log(toAdd);
    if (direction === "right") {
      if (left + toAdd * 2 >= -width) {
        gsap.to(content, 0.2, {
          x: left + toAdd,
          onComplete: () => {
            setLeft(left + toAdd);
          },
        });
      }
    } else if (direction === "left") {
      if (left < 0) {
        gsap.to(content, 0.2, {
          x: left + toAdd,
          onComplete: () => {
            setLeft(left + toAdd);
          },
        });
      }
    }
  };

  return (
    <Wrapper>
      <Content left={props.left} id={`${props.sliderName}`}>
        {props.children.map((item) => (
          <Slide>{item}</Slide>
        ))}
      </Content>
      <RightArrowWrapper
        style={{
          ...props.arrowStyle,
          opacity: rightArrow ? 1 : 0,
          pointerEvents: rightArrow ? "auto" : "none",
        }}
        onClick={() => handleArrowClick("right")}
      >
        <img src="/assets/svg/arrowScrollTop.svg" alt="" />
      </RightArrowWrapper>
      <LeftArrowWrapper
        style={{
          ...props.arrowStyle,
          opacity: leftArrow ? 1 : 0,
          pointerEvents: leftArrow ? "auto" : "none",
        }}
        onClick={() => handleArrowClick("left")}
      >
        <img src="/assets/svg/arrowScrollTop.svg" alt="" />
      </LeftArrowWrapper>
    </Wrapper>
  );
};

export default Slider;
