import Reast, { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #ebebeb;
  z-index: 99;
  background-position: center 0px;
  background-size: 150%;
  background-repeat: no-repeat;
`;

const ParallaxImg = props => {
  const parallax = () => {
    const element = document.getElementById(props.id);
    if (
      Math.round(element.getBoundingClientRect().top) -
        window.scrollY +
        window.innerHeight <
      0
    ) {
      gsap.to(`#${props.id}`, 0.2, {
        backgroundPosition: `center ${-window.scrollY / 8}px`
      });
      //   element.style.backgroundPositionY =  + "px";
    }
  };
  useEffect(() => {
    const element = document.getElementById(props.id);
    window.addEventListener("scroll", parallax);
    return () => window.removeEventListener("scroll", parallax);
  }, []);
  return (
    <Wrapper
      id={props.id}
      style={{ backgroundImage: `url(${props.src})` }}
    ></Wrapper>
  );
};

export default ParallaxImg;
