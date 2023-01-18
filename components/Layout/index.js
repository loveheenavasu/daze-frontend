import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Head from "next/head";
import gsap from "gsap";
import Header from "../Header";
import Footer from "../Footer";

const Container = styled.div`
  margin-top: ${({ home }) => (home ? 0 : "85px")};
  width: 100%;
  min-height: 90vh;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  text-align: center;
`;

const AnimButtonScroll = keyframes`
  0%{
    transform: translateY(0) scaleX(1);
  }
  50%{
    transform: translateY(-2px) scaleX(.9);
  }
  100%{
    transform: translateY(0) scaleX(1);
  }
`;

const ScrollTopButton = styled.div`
  width: 50px;
  opacity: 0;
  pointer-events: ${({ display }) => (display ? "auto" : "none")};
  height: 50px;
  position: fixed;
  bottom: 50px;
  right: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ececec; */

  cursor: pointer;
  &:hover {
    & > img {
    }
  }
  & > #scroll-button-bg {
    background-color: #ececec;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    border-radius: 100%;
  }
  & > img {
    width: 20px;
    height: 20px;
    z-index: 99999;
    /* transform: translateY(0) scaleX(1); */
    transition: transform 0.2s ease;
  }
  @media (max-width: 960px) {
    right: 20px;
    bottom: 20px;
  }
`;

const ScrollTop = () => {
  let [display, setDisplay] = useState(false);
  const scrollHandler = (e) => {
    if (window.scrollY > window.innerHeight) {
      setDisplay(true);
      gsap.to("#scroll-top-button", 0.3, {
        autoAlpha: 1,
        y: 0,
        // ease: "none"
      });
    } else {
      setDisplay(false);
      gsap.to("#scroll-top-button", 0.3, {
        autoAlpha: 0,
        y: 100,
      });
    }
  };
  const scrollToTop = () => {
    gsap.to(window, {
      duration: (window.scrollY / window.innerHeight) * 0.2,
      scrollTo: { x: 0, y: 0 },
      ease: "Power2.easeInOut",
    });
  };
  useEffect(() => {
    gsap.set("#scroll-top-button", {
      y: 0,
      scale: 1,
    });
    const scrollButton = document.getElementById("scroll-top-button");
    scrollButton.onmouseenter = () => {
      gsap.to("#scroll-button-bg", 0.3, {
        scale: 1.2,
      });
    };
    scrollButton.onmouseleave = () => {
      gsap.to("#scroll-button-bg", 0.3, {
        scale: 1,
      });
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  return (
    <ScrollTopButton
      id="scroll-top-button"
      display={display}
      onClick={scrollToTop}
      // onClick={() => window.scrollTo(0, 0)}
      // style={{ display: display ? "block" : "none" }}
    >
      <div id="scroll-button-bg"></div>
      <img src="/assets/svg/arrowScrollTop.svg" alt="" />
    </ScrollTopButton>
  );
};

const Layout = (props) => {
  const { title, home, children, setLang, lang, description } = props;
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     // document.getElementsByTagName("body")[0].style.overflowY = "hidden";
  //     console.log(window.scrollY);
  //     gsap.to(window, 0.1, {
  //       target: document.getElementsByTagName("body")[0],
  //       scrollTo: { y: window.scrollY, x: 0 }
  //     });
  //   });
  // }, []);
  return (
    <Wrapper>
      <Head>
        <title>{`${title || ""} | DAZE MGMT`}</title>
        <meta name="description" content={description || "Daze MGMT"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </Head>
      <Header home={home} setLang={setLang} lang={lang}></Header>
      <Container home={home}>{children}</Container>
      <ScrollTop />
      <Footer setLang={setLang} lang={lang}></Footer>
    </Wrapper>
  );
};

export default Layout;
