import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
const ReactMarkdown = require("react-markdown");
import { Parallax, Background } from "react-parallax";
import gsap from "gsap";
import { shuffle, nFormatter } from "../../utils";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

import { Container as Default } from "../Defaults";

import Slider from "../Slider";

import ScrollReveal from "./scrollReveal";

import CookieConsent from "react-cookie-consent";


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 130vh;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 50;
  & > div.content {
    position: relative;
    padding-top: 80px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  & .scroll-line {
    width: 2px;
  }
  .CookieConsent {
    align-items:center !important;
    & > div:nth-child(1) {
     flex: unset !important;
     width:100%;
     text-align:center;
     margin:0px !important;
    }
  }
    .CookieConsent-buttonWrapper-reversed {
     width:0px;
    }
  @media (max-width: 960px) {
    margin-top: 100vh;
  }

  & .CookieConsent-buttonWrapper-reversed {
    display: flex;
    flex-direction: row-reverse;
  }


@media(max-width:425px){
  .CookieConsent {
    align-items:center !important;
    & > div:nth-child(1) {
      width:100px
    }
}
  @media(max-width: 424px){
    .CookieConsent {
     padding:10px 5px;
     font-size:13px !important;
      align-items:center !important;
      & > div:nth-child(1) {
        flex: unset !important;
        margin: 0 !important;
        width: 185px !important;
      }
      .CookieConsent-buttonWrapper-reversed {
        width:49%
      }
  }


    #rcc-confirm-button{
      margin-right: 1px !important;
      margin-left: 0px !important;
      margin-bottom: 15px !important;
      margin-top: 15px !important;
      padding:11px 9px !important;
    }

    #rcc-decline-button {
      padding:11px 9px !important;
      margin-right:15px !important;
      magin-left:5px !important;
    }
  
  }
  @media(max-width: 375px){
    .CookieConsent {
     padding:10px 0px;
      & > div:nth-child(1) {
        width: 184px !important;
      }
      .CookieConsent-buttonWrapper-reversed {
        width:100px;
      }
      #rcc-decline-button {
        margin-right:0px !important;
        margin-left:5px !important;
      }
    }
    
`;

// CookieConsent {
//   buttonStyle{
//     background-color :#fff;
//   }
// }
// const CookieConsent = styled.div`
// buttonStyle{
//       background-color :#fff;
//     }
// `

const Container = styled(Default)``;

const Button = styled.div`
  display: inline-block;
  margin-bottom: 50px;
  border: 1px solid #000;
  align-self: center;
  background-color: #fff;
  transition: background-color 0.2s ease;
  a  {
    display: inline-block;
    padding: 20px 40px;
    text-decoration: none;
    color: #000;
    font-family: "SackersGothicStd-Heavy";
    font-size: 14px;
    text-transform: lowercase;
    transition: color 0.2s ease;
  }
  &:hover {
    background-color: #000;
    a {
      color: #fff;
      /* transform: scale(1.05); */
    }
  }
`;

const Title = styled.div`
  & h2 {
    margin: 0;
    font-weight: normal;
  }
  & h2.stand-book {
    font-family: "Bodoni-Book";
    font-size: 90px;
    letter-spacing: 8px;
    line-height: 1;
  }
  & h2.stand-italic {
    font-size: 95px;
    letter-spacing: 5px;
    line-height: 1.5;
    font-family: "Bodoni-BookIta";
  }
  & h2.book {
    font-family: "SVN-Miller Banner";
    font-size: 65px;
    letter-spacing: 8px;
    line-height: 75px;
  }
  & h2.booked{
    font-family: "SVN-Miller Banner";
    font-size: 71.2252px;
  }
  & h2.italic {
    font-size: 65px;
    letter-spacing: 3px;
    text-transform:upperCase;
    font-family: "SVN-Miller Banner";
  }
  @media (max-width: 960px) {
    /* transform: scale(0.5); */
    width: auto;
    & h2 {
      margin-left: 0 !important;
    }
    & h2.book{
      font-size: 27.92px;
    line-height: 38px;
    font-family: "SVN-Miller Banner";
    font-style: italic;
    letter-spacing: 0px;
    }
    & h2.booked{
      font-size: 26px ;
    }
    h2.stand-book {
      font-family: "SVN-Miller Banner";
      font-size: 35px;
      letter-spacing: 8px;
      line-height: 1;
    }
    & h2.italic {
      font-size: 27.92px;
      line-height: 27px;
      letter-spacing: 0px;
      font-style: italic;
      font-family: "SVN-Miller Banner";
    }
    & h2.stand-italic {
      font-size: 35px;
      letter-spacing: 5px;
      line-height: 1;
      font-family: "Bodoni-BookIta";
      margin-bottom: 50px;
    }
  }
`;

const LeftTitle = styled.div`
  position: absolute;
  transform: rotate(-90deg);
  font-family: "SackersGothicStd-Heavy";
  font-size: 14px;
  left: 50px;
  top: 200px;
  z-index: 999;
  /* line-height: 1.7; */
  /* font-weight: 400; */
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 200%;
    height: 1px;
    background-color: #000;
    width: 55px;
  }
  @media (max-width: 960px) {
    position: relative;
    left: -40%;
    top: 50px;
  }
`;

const GrayBox = styled.div`
  width: 100%;
  height: 500px;
  background-color: #ebebeb;
  z-index: 99;
`;

const Intro = styled.p`
  margin-top: 50px;
  font-family: "Miller-Banner-Light";
  font-size: 22px;
  width: 60%;
  text-align: justify;
  line-height: 1.7;

  strong{
    font-weight:bold;
  }
  @media (max-width: 960px) {
    width: 90%;
  }
`;

const StatsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  flex-wrap: wrap;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    @media (max-width: 960px) {
      width: 50%;
    }
  }
  h3  {
    color: #000;
    font-size: 56px;
    font-family: "Bodoni-Book";
    font-weight: 300;
    line-height: 43px;
    margin: 30px 0 25px 0;
    text-transform: uppercase;
  }
  p {
    color: #979797;
    font-size: 12px;
    font-family: "Avenir Next";
    font-weight: 600;
    margin: 0;
    letter-spacing: 1.88;
  }
  @media (max-width: 960px) {
    margin-top: 100px;
    margin-bottom: 0;
  }
`;

const Infos = styled.div`
  margin-top: 50px;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  height: 400px;
  justify-content: space-around;
  align-items: flex-start;
  margin-left: 50px;
  margin-right: 50px;
  p {
    width: 40%;
    /* margin: 10px; */
    font-family: "Avenir Next";
    font-size: 16px;
    line-height: 1.7;
    font-weight: 400;
    text-align: justify;
    /* margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px; */
  }

  strong {
    font-weight: bold;
  }
  @media (max-width: 960px) {
    hieght: auto;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-left: 0;
    margin-right: 0;
    p {
      width: 70%;
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const TalentsInfos = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* height: 400px; */
  align-items: center;
  p {
    text-align: center;
    font-family: Miller-Banner-Light;
    text-align: justify;
    font-size: 22px;
    width: 90%;
    line-height: 1.7;
  }
  strong{
    font-weight:bold;
  }
  @media (max-width: 960px) {
    p {
      text-align: justify;
      font-size: 16px;
    }
  }
`;

const ClientInfo = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  & > div {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
    img {
      height: 45px;
      width: auto;
    }
    h3 {
      font-size: 20px;
      font-family: "SackersGothicStd-Heavy";
      text-transform: lowercase;
      letter-spacing: 1.9px;
      margin: 25px 0 25px 0;
    }
    p {
      font-family: "Avenir Next";
      font-size: 16px;
      line-height: 1.7;
      font-weight: 400;
      text-align: left;
      margin: 0;
      text-align: justify;

    }
    strong {
      font-weight: bold;
    }
    
  }
  @media (max-width: 960px) {
    & > div {
      width: 80%;
      line-height: 1.2;
      img {
        height: 45px;
        width: aut;
      }
    }
    & div:nth-child(0n + 1) {
      order: 2;
    }
    & div:nth-child(0n + 2) {
      order: 1;
    }
    & div:nth-child(0n + 3) {
      order: 3;
    }
    & div:nth-child(0n + 4) {
      order: 4;
    }
  }
`;

const TalentWrapper = styled.div`
  width: 310px;
  height: 375px;
  background-color: #ebebeb;
  background-position: center;
  flex-shrink: 0;
  background-size: cover;
  margin: 0 10px;
  cursor: pointer;
  text-align: center;
  &:hover {
    & > a {
      opacity: 1;
    }
  }
  & > a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    h4 {
      font-size: 30px;
      font-family: "Bodoni-Book";
      font-weight: 300;
      margin: 5px 0;
    }
    p {
      margin: 0;
      font-size: 24px;
      font-family: "Avenir Next";
      font-weight: 300;
    }
  }
  @media (max-width: 960px) {
    width: 228px;
    height: 276px;
    margin: 0 5px;
    & > div {
      pointer-events: none;
    }
    &:hover > div {
      opacity: 1;
    }
    &:active > div  {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const ClientWrapper = styled.div`
  width: 320px;
  height: 320px;
  background-color: #ebebeb;
  background-position: center;
  flex-shrink: 0;
  background-size: cover;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    & > a {
      opacity: 1;
    }
  }
  & a {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    h4 {
      font-size: 30px;
      font-family: "Bodoni-Book";
      font-weight: 300;
      margin: 5px 0;
      span {
        width: 100%;
        display: block;
      }
    }
    p {
      margin: 0;
      font-size: 24px;
      font-family: "Avenir Next";
      font-weight: 300;
    }
  }
  @media (max-width: 960px) {
    width: 250px;
    height: 250px;
    margin: 0 5px;
    & > div {
      pointer-events: none;
    }
    &:hover > div {
      opacity: 1;
    }
    &:active > div  {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const Talent = ({ talent }) => {
  return (
    <TalentWrapper
      style={{
        backgroundImage: `url(${publicRuntimeConfig.API_URL}${
          talent.profile_pic && talent.profile_pic.url
        })`,
      }}
    >
      <Link href={`/talents/${talent.instagram_id}`}>
        <a>
          <h4>
            {talent.firstname} {talent.lastname}
          </h4>
          <p>{nFormatter(Number(talent.followers), 1)}</p>
        </a>
      </Link>
    </TalentWrapper>
  );
};

const Client = ({ client }) => {
  return (
    <ClientWrapper
      style={{
        backgroundImage: `url(${publicRuntimeConfig.API_URL}${
          client.img && client.img.url
        })`,
      }}
    >
      <Link href="/clients">
        <a>
          <h4>
            <span>{client.name.split(" x ")[0]}</span>
            <span>x</span>
            <span>{client.name.split(" x ")[1]}</span>
          </h4>
        </a>
      </Link>
    </ClientWrapper>
  );
};

const LeftMenuWrapper = styled.div`
  position: fixed;
  left: 30px;
  top: 0;
  bottom: 0;
  /* height: 160px; */
  margin: auto 0;
  z-index: 99999;
  opacity: 0;
  height: 102px;
  display: block;
  /* bottom: auto; */
  @media (max-width: 960px) {
    display: none;
  }
`;

const LeftMenuItem = styled.div`
  cursor: pointer;
  position: relative;
  text-align: left;
  font-size: 12px;
  font-family: "SackersGothicStd-Heavy";
  text-transform: lowercase;
  letter-spacing: 1.9px;
  margin: 15px 0;
  padding-left: 20px;
  & > span {
    /* opacity: ${({ isActive }) => (isActive ? 1 : 0)}; */
    opacity: 0;
    transition: opacity 0.3s ease, color 0.3s ease;
    /* transition-delay:1s; */
  }
  &:hover {
    &::before {
      background-color: ${({ isActive }) => (isActive ? "#000" : "#959595")};
    }
    &::after {
      width: ${({ isActive }) => (isActive ? "50px" : "0")};
      background-color: ${({ isActive }) => (isActive ? "#000" : "#959595")};
      opacity: 1;
    }
    & > span {
      opacity: 1;
      color: ${({ isActive }) => (isActive ? "#000" : "#959595")};
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 130%;
    width: ${({ isActive }) => (isActive ? "0px" : "0")};
    height: 1px;
    left: 20px;
    background-color: #000;
    opacity: 0;
    transition: width 0.3s ease, opacity 0.3s ease;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    border: ${({ isActive }) =>
      isActive ? "1px solid #000" : "1px solid #959595"};
    background-color: ${({ isActive }) => (isActive ? "#000" : "transparent")};
    transition: background-color 0.3s ease, border 0.3s ease;
  }
`;

const LeftMenu = ({ lang }) => {
  let [item, setItem] = useState(null);
  // let [tops, setTops] = useState({});

  const handleClick = (id) => {
    let content = document.getElementById(id);
    let top = content.getBoundingClientRect().top + window.scrollY;
    gsap.to(window, 0.7, {
      scrollTo: "#" + id,
      ease: "Power2.easeInOut",
    });
    // content.scrollIntoView(true);
    // window.scrollTo(0, window.scrollY - 80);
  };

  let [isLeftMenu, setLeftMenu] = useState(false);

  const menuScrollHandler = (e) => {
    e.preventDefault();
    const whoContent = document.getElementById("whoarewe-home");
    const talentsContent = document.getElementById("talents-home");
    const whatContent = document.getElementById("whatwedo-home");
    let tops = {
      0: whoContent.getBoundingClientRect().top + window.scrollY,
      1: talentsContent.getBoundingClientRect().top + window.scrollY,
      2: whatContent.getBoundingClientRect().top + window.scrollY,
    };
    if (window.scrollY > window.innerHeight) {
      setLeftMenu(true);
    } else if (window.scrollY <= window.innerHeight) {
      setLeftMenu(false);
    }
    if (
      window.scrollY < tops[0] + whoContent.offsetHeight &&
      window.scrollY + window.innerHeight > tops[0] &&
      item !== 0
    ) {
      setItem(0);
    } else if (
      window.scrollY < tops[2] + whatContent.offsetHeight &&
      window.scrollY + window.innerHeight > tops[2] &&
      item !== 2
    ) {
      setItem(2);
    } else if (
      window.scrollY < tops[1] + talentsContent.offsetHeight &&
      window.scrollY + window.innerHeight > tops[1] &&
      item !== 1
    ) {
      setItem(1);
    } else {
      setItem(null);
    }
  };

  useEffect(() => {
    if (isLeftMenu) {
      gsap.to("#left-menu-wrapper", 0.3, {
        autoAlpha: 1,
        y: 0,
      });
    } else if (!isLeftMenu) {
      gsap.to("#left-menu-wrapper", 0.3, {
        autoAlpha: 0,
        y: 100,
      });
    }
  }, [isLeftMenu]);

  useEffect(() => {
    const whoContent = document.getElementById("whoarewe-home");
    const talentsContent = document.getElementById("talents-home");
    const whatContent = document.getElementById("whatwedo-home");
    window.addEventListener("scroll", menuScrollHandler);
    gsap.set("#left-menu-wrapper", {
      y: 100,
    });
    return () => window.removeEventListener("scroll", menuScrollHandler);
  }, []);

  return (
    <LeftMenuWrapper id="left-menu-wrapper">
      <LeftMenuItem
        isActive={item === 0}
        onClick={() => handleClick("whoarewe-home")}
      >
        <span>{lang === "fr" ? "qui sommes nous ?" : "who are we ?"}</span>
      </LeftMenuItem>
      <LeftMenuItem
        isActive={item === 1}
        onClick={() => handleClick("talents-home")}
      >
        <span>talents</span>
      </LeftMenuItem>
      <LeftMenuItem
        isActive={item === 2}
        onClick={() => handleClick("whatwedo-home")}
      >
        <span>{lang === "fr" ? "nos solutions" : "what we do"}</span>
      </LeftMenuItem>
    </LeftMenuWrapper>
  );
};

const Home = (props, req) => {
  const { lang, page } = props;
  console.log(page,"data")

const titleText = (lang === 'fr' ? page.digitial_marketing_title_fr : page.digitial_marketing_title_en) ;

const influText= (lang === 'fr' ? page.Influential_talents_title_fr : page.Influential_talents_title_en);

const standText = (lang === 'fr' ? page.stand_out_crowd_title_fr : page.stand_out_crowd_title_en);

  useEffect(() => {}, []);
  return (
    <Wrapper>
      <LeftMenu lang={lang}></LeftMenu>
      <div className="content" id="whoarewe-home">
        {/* <LeftTitle>who are we?</LeftTitle> */}
        <Container>
          <center>
            <Title  dangerouslySetInnerHTML={{__html: titleText}}>
              {/* <h2 className="italic" style={{ marginLeft: -250 }}>
                Digital
              </h2>
              <h2 className="book">MARKETING</h2>
              <h2 className="book" style={{ marginLeft: 350 }}>
                AGENCY
              </h2> */}
            </Title>
            <Intro>
              <ReactMarkdown source={lang === "fr" ? page.who_intro_fr : page.who_intro_en}/>
            </Intro>
            <Infos>
              <ReactMarkdown
                source={lang === "fr" ? page.who_fr : page.who_en}
              />
            </Infos>
          </center>
          <StatsWrapper>
            <div id="posts">
              <h3>
                <ScrollReveal
                  number={page.posts}
                  digit={1}
                  id="posts"
                ></ScrollReveal>
              </h3>
              <p>POSTS & STORIES</p>
            </div>
            <div id="likes">
              <h3>
                <ScrollReveal
                  number={page.likes}
                  digit={1}
                  id="likes"
                ></ScrollReveal>
              </h3>
              <p>LIKES</p>
            </div>
            <div id="reach">
              <h3>
                <ScrollReveal
                  number={page.reach}
                  digit={1}
                  id="reach"
                ></ScrollReveal>
              </h3>
              <p>REACH</p>
            </div>
            <div id="impressions">
              <h3>
                <ScrollReveal
                  digit={1}
                  number={page.impressions}
                  id="impressions"
                ></ScrollReveal>
              </h3>
              <p>IMPRESSIONS</p>
            </div>
          </StatsWrapper>
        </Container>
      </div>
      <center
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          flexWrap: "no-wrap",
          top: 70,
          zIndex: 10,
        }}
      >
        <img className="scroll-line" src="/assets/svg/scroll-line.svg" alt="" />
      </center>
      <Parallax
        bgImage="/assets/images/img-water.jpg"
        bgImageAlt="the cat"
        strength={400}
        style={{ zIndex: 20 }}
      >
        <div style={{ height: 500, width: "100vw", zIndex: 11 }}></div>
      </Parallax>
      <div className="content" style={{ marginTop: 50 }} id="talents-home">
        <Container style={{ marginBottom: 50 }}>
          <center>
          <Title dangerouslySetInnerHTML={{__html: influText}}/>
          {/* <Title>
            <ReactMarkdown source={influText}/>
          </Title> */}
            <TalentsInfos>
              <ReactMarkdown
                source={lang === "fr" ? page.talents_fr : page.talents_en}
              />
            </TalentsInfos>
          </center>
        </Container>
        <div style={{ margin: "50px 0", width: "100%" }}>
          <Slider
            left={{ desktop: "5%", mobile: "5%" }}
            sliderName="slider-talent"
          >
            {page.talents.map((item, i) => (
              <Talent talent={item}></Talent>
            ))}
          </Slider>
        </div>
        <center
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "no-wrap",
            alignItems: "center",
          }}
        >
          <Button>
            <Link href="/talents">
              {lang === "fr" ? "plus de talents" : "more talents"}
            </Link>
          </Button>
          <img
            className="scroll-line"
            src="/assets/svg/scroll-line.svg"
            alt=""
          />
        </center>
      </div>
      <div className="content" style={{ marginBottom: 120 }} id="whatwedo-home">
        {/* <LeftTitle>what we do</LeftTitle> */}
        <center>
          <Title style={{ transform: "scale(0.8)" }} dangerouslySetInnerHTML={{__html: standText}}>
          </Title>
        </center>
        <Slider
          left={{ desktop: "5%", mobile: "5%" }}
          sliderName="slide-client"
        >
          {/* {console.log(page)} */}
          {page.creations.map((item, i) => (
            <Client client={item}></Client>
          ))}
        </Slider>
        <Container>
          <center>
            <ClientInfo style={{ margin: "50px 0" }}>
              <div>
                <img src="/assets/svg/event.svg" alt="" />
                <h3>event-planning</h3>
                <ReactMarkdown
                  source={lang === "fr" ? page.events_fr : page.events_en}
                />
              </div>
              <div>
                <img src="/assets/svg/tailor.svg" alt="" />
                <h3>tailor-made campaigns</h3>
                <ReactMarkdown
                  source={lang === "fr" ? page.tailor_fr : page.tailor_en}
                />
              </div>
              <div>
                <img src="/assets/svg/gifting.svg" alt="" />
                <h3>gifting</h3>
                <ReactMarkdown
                  source={lang === "fr" ? page.giftings_fr : page.giftings_en}
                />
              </div>
              <div>
                <img src="/assets/svg/in-shop.svg" alt="" />
                <h3>in-shop activation</h3>
                <ReactMarkdown
                  source={lang === "fr" ? page.shop_fr : page.shop_en}
                />
              </div>
            </ClientInfo>
            <center>
              <Button>
                <Link href="/clients">
                  {lang === "fr" ? "nos clients" : "our clients"}
                </Link>
              </Button>
            </center>
          </center>
        </Container>
      </div>
      <CookieConsent
      buttonStyle={{ background: '#fff', marginRight: '10px', padding: '10px 17px',
      fontFamily: 'Sackers Gothic Std',
      fontStyle: 'normal',
      fontWeight: 850,
      fontSize: '12px',
      lineHeight: '14px'
    }}
      style={{ background: 'black'}}
      enableDeclineButton
      onDecline={() => { console.log('Cookies declined'); }}
      declineButtonText="DECLINE" 
      className="CookieConsent"
      declineButtonStyle={{ background: '#000', marginRight: '20px',color: '#fff', padding: '10px 14px' , border:"1px solid #fff",
      fontFamily: 'Sackers Gothic Std',
      fontStyle: 'normal',
      fontWeight: 850,
      fontSize: '12px',
      lineHeight: '14px'
    }}
      buttonText="ACCEPT"
      buttonWrapperClasses="CookieConsent-buttonWrapper-reversed"
   
    >
        <span style={{ color: 'white'}}>
          This website uses cookies to enhance the user experience.
        </span>
      </CookieConsent>
    </Wrapper>
  );
};

export default Home;
