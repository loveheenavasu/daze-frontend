import React, { useEffect } from "react";
import styled from "styled-components";
import { shuffle } from "../../utils";
import gsap from "gsap";
import Link from "next/link";
import translations from "./locale";
import getConfig from "next/config";
import { useState } from "react";
const ReactMarkdown = require("react-markdown");
import CustomModal from "./CustomModal";
import Slider from "../Slider/sliderTalent";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 10px;
  }
`;

const ClientWrapper = styled.div`
  width: 100%;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 960px;
  // min-height: 360px;
  overflow: hidden;
  & > #client-background-img {
    width: 100%;
    height: 100%;
    position: absolute;
    /* background-image:  */
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0;
  }
  & #new-custom-slide {
    height: 70px;
  }
  & > #logos-clients-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    opacity: 0;
  }
  & img {
    max-height: 50px;
    height: auto;
    width: auto;
    max-width: 200px;
    margin: 20px;
    filter: grayscale(100%);
  }
  & h1 {
    font-family: "SVN-Miller Banner";
    font-style: normal;
    font-weight: 400;
    font-size: 57.2727px;
    line-height: 77px;
    text-align: center;
    color: #000000;
    margin-bottom: 60px;
  }
  & p {
    font-family: "SVN-Miller Banner";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #000000;
  }
  & #new-arrow-style {
    // background: none;
    box-shadow: none;
    background-color: white;
    border-radius: 0px;
    margin: 0;
    top: 0;
    height: 100%;
    width: 110px !important;
  }
  @media (max-width: 960px) {
    margin-bottom: 0px;
    height: 20%;
    width: 90%;
    & img {
      height: auto;
      width: 50px;
      margin: 10px;
    }
    & h1 {
      margin-bottom: 20px;
      font-size: 39.48px;
    }
    & #new-custom-slide {
      display: none;
    }
    & .slider-parent {
      display: none;
    }
  }
`;

const Button = styled.div`
  display: inline-block;
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
  @media (max-width: 960px) {
    a  {
      padding: 20px 20px;
    }
  }
`;

const CreationsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 22px;
  overflow: hidden;
  @media (max-width: 960px) {
    margin-top: 40px;
  }
`;

const CreationWrapper = styled.a`
  width: calc((100vw - 15px) / 4);
  height: calc((100vw - 15px) / 4);
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 15.71px;
  text-align: center;
  font-style: normal;
  line-height: 21px;
  font-family: "Avenir Next";
  font-weight: 400;
  color: #fff;
  & > div {
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: opacity 0.2s ease;
  }
  & .instagram-client-link {
    font-size: 12px;
    font-family: "SackersGothicStd-Heavy";
    font-weight: 300;
    margin-top: 20px;
    color: #fff;
  }
  & button {
    background: #ffffff;
    border: 0.763296px solid #000000;
    width: 124px;
    height: 32px;
    font-style: normal;
    font-weight: 850;
    font-size: 7.34px;
    font-family: "Sackers Gothic Std";
    line-height: 9px;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
    cursor: pointer;
  }
  & #res-style {
    display: none;
  }
  &:hover div {
    opacity: 1;
  }
  .instabtnhover {
    margin-bottom: 10px;
  }
  span {
    width: 100%;
    display: block;
    text-transform: uppercase;
  }
  @media (max-width: 960px) {
    width: calc((100vw) / 2);
    height: calc((100vw) / 2);
    font-size: 18px;
    margin-bottom: 10px;
    &:hover div {
      opacity: 1;
    button {
      display: none;
    }
    .instagram-client-link{
      display:none;

    }
  }
`;

const Title = styled.h1`
  font-family: "Miller-Banner-Light";
  font-size: 34px;
  /* letter-spacing: 8px; */
  line-height: 1;
  /* text-transform: uppercase; */
  margin: 100px 0;
  @media (max-width: 960px) {
    font-size: 30px;
  }
`;
const PortfolioSlide = styled.div`
  margin-bottom: 5px;
  height: 50px;
  z-index: 1;
  /* @media (max-width: 960px) {
  height: 300px;
} */
`;

const ResWrapper = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: block;
    & h1 {
      width: 100%;
      display: block;
      font-family: "Avenir Next";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      text-transform: uppercase;
      line-height: 17px;
      text-align: center;
      color: #000000;
    }
    & button {
      background: #ffffff;
      border: 0.763296px solid #000000;
      width: 153px;
      height: 40px;
      padding: 16px;
      font-family: "Sackers Gothic Std";
      font-style: normal;
      font-weight: 850;
      font-size: 7.34px;
      line-height: 9px;
      text-align: center;
      text-transform: uppercase;
      color: #000000;
    }
    .instagrambtn {
      margin-bottom: 10px;
      margin-top: 5px;
      cursor: pointer;
    }
    .campaignbtn {
      margin-bottom: 37px;
      cursor: pointer;
    }
  }
`;
const CreationWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsButton = styled.div`
  position: sticky;
  top: 80px;
  background: #fff;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 30px;
  & button {
    font-family: "Avenir Next";
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border: none;
    color: #000000;
    background: none;
    padding: 1px 77px;
    // margin-left: 90px;
    cursor: pointer;
    text-transform: uppercase;
  }
  & label {
    display: none;
  }
  & select {
    display: none;
    // font-family: "Avenir Next";
    // font-style: normal;
    // font-size: 16px;
    // line-height: 22px;
    // // text-align: center;
    // color: #000000;
    // text-transform: uppercase;
    // background: none;
    // // margin-left:90px;
    // cursor: pointer;
    // width: 100%;
    // height: 45px;
    // outline: none;
    // appearance: none;
    // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    // background-repeat: no-repeat;
    // background-position: right 1rem center;
    // background-size: 1.4em;
  }
  & option {
    text-transform: none;
  }
  @media (max-width: 960px) {
    margin: 0px;

    & button {
      display: none;
    }
    & .select-wrapper {
      margin-top: 7%;
      position: relative;
    }
    & label {
      border: 1px solid black;
      position: relative;
      z-index: 2;
      text-transform: uppercase;
      font-family: "Avenir Next";
      font-style: normal;
      font-size: 16px;
      line-height: 22px;
      text-align: center !important;
      text-align: -moz-center !important;
      text-align: -webkit-center !important;
      color: #000000;
      background: none;
      cursor: pointer;
      width: 286px;
      height: 45px;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      // padding: 12px 90px;
      outline: none;
      -webkit-appearance: none !important;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.4em;
    }
    & select {
      position: absolute;
      top: 0;
      left: 0;
      visibility: none;
      display: inline;
      justify-content: center;
      border: 1px solid black;
      // margin-top: 7%;
      text-transform: uppercase;
      font-family: "Avenir Next";
      font-style: normal;
      font-size: 16px;
      // line-height: 22px;
      text-align: center !important;
      // text-align: -moz-center !important;
      // text-align: -webkit-center !important;
      color: #000000;
      background: none;
      cursor: pointer;
      width: 286px;
      height: 45px;
      // padding: 12px 90px;
      outline: none;
      -webkit-appearance: none !important;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.4em;
    }
  }
`;

const RadioButton = styled.div`
  display: none;
  height: 33vh;
  & .mySwiper {
    display: grid;
    grid-template-columns: auto auto;
    padding: 0px;
    max-width: 300px;
    column-gap: 85px;
    row-gap: 54px;
  }
  & .swiper {
    width: 100%;
    height: 27vh;
  }
  .grid-item {
    text-align: center;
    & img {
      width: 100px;
      filter: grayscale(100%);
    }
  }
  @media (max-width: 960px) {
    .swiper-slide {
      display: grid;
      width: 125px;
      height: 23vh;
    }
  }
  & .swiper-pagination {
    .swiper-pagination-bullet-active {
      background: black;
    }
  }
  @media (max-width: 960px) {
    display: flex;
    height: 100%;
  }
  .swaperimage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Creation = (props) => {
  let { creation, index, lang, setIsOpen, isOpen, setViewClient } = props;
  useEffect(() => {
    // console.log(index);
    // console.log(Math.round((index * 0.2 + 0.5) * 10) / 10);
    gsap.set(`#creation-wrapper-${index}`, {
      autoAlpha: 0,
      y: 200,
    });
    gsap.to(`#creation-wrapper-${index}`, 0.5, {
      autoAlpha: 1,
      y: 0,
      delay: () => {
        return Math.round((index * 0.1 + 1) * 10) / 10;
      },
    });
  }, []);
  return (
    <CreationWrapperContainer>
      <CreationWrapper
        // href={creation.instagram_link}
        // target="__blank"
        id={`creation-wrapper-${index}`}
        style={{
          backgroundImage: `url(${publicRuntimeConfig.API_URL}${creation.img.url})`,
          //   width: (window.innerWidth - 1) / 4,
          //   height: (window.innerWidth - 1) / 4
        }}
      >
        <div>
          <span>{creation.name.split(" x ")[0]}</span>
          <span>x</span>
          <span>{creation.name.split(" x ")[1]}</span>
          <span className="instagram-client-link">
            {/* {translations[lang].view_on_insta} */}
            <button
              className="instabtnhover"
              onClick={() => window.open(creation.instagram_link)}
            >
              {translations[lang].view_on_insta}
            </button>
            <br></br>
            <button
              className="campaignbtnonhover"
              onClick={() => {
                setIsOpen(true);
                setViewClient(creation);
              }}
            >
              {translations[lang].more_details}
            </button>
          </span>
        </div>
      </CreationWrapper>
      <ResWrapper>
        {/* <h1>{creation.name.split(" x ")[0]}</h1>
        <h1>x</h1>
        <h1>{creation.name.split(" x ")[1]}</h1> */}
        <button
          className="instagrambtn"
          onClick={() => window.open(creation.instagram_link)}
        >
          {translations[lang].view_on_insta}
        </button>
        <br></br>
        <button
          className="campaignbtn"
          onClick={() => {
            setIsOpen(true);
            setViewClient(creation);
          }}
        >
          {translations[lang].more_details}
        </button>
      </ResWrapper>
    </CreationWrapperContainer>
  );
};

const Clients = ({ clients, creations, lang, generalSetting, filterTabs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewClient, setViewClient] = useState({});
  const [tabCreation, seTabCreation] = useState(creations);
  const [selectedIndex, setSelectedIndex] = useState("all");
  const [activeImage, setActiveImage] = React.useState(0);
  const [position, setPosition] = React.useState(`${activeImage * 100}%`);

  const arr = filterTabs.map((tab, index) => {
    return {
      name: tab.name,
      name_fr: tab.name_fr,
      id: index,
    };
  });

  useEffect(() => {
    const item = arr.find(
      (itm) => itm.name === selectedIndex || itm.name_fr === selectedIndex
    );
    if (item) {
      if (lang === "fr") {
        setSelectedIndex(item.name_fr);
      } else {
        setSelectedIndex(item.name);
      }
    } else {
      setSelectedIndex(translations[lang].filter_all);
    }
  }, [lang]);

  console.log("tab", translations[lang].filter_all);
  useEffect(() => {
    let tl = gsap.timeline();
    tl.set("#logos-clients-wrapper", {
      autoAlpha: 0,
    });
    tl.to("#client-background-img", 0.5, {
      autoAlpha: 1,
      delay: 0.5,
    });
    tl.to("#logos-clients-wrapper", 0.5, {
      autoAlpha: 1,
      ease: "Expo.easeIn",
    });
  }, []);

  // useEffect(() => {
  //   console.log("setSelectedIndex==>", translations[lang].filter_all);
  //   setSelectedIndex(translations[lang].filter_all);
  //   console.log("selectedIndex===>2", selectedIndex);
  // }, [translations[lang].filter_all]);
  console.log("selectedIndex===>1", selectedIndex);

  const handleClick = (i) => {
    setActiveImage(i);
    setPosition(`-${i * 100}%`);
  };

  const perChunk = 2;

  const result = clients.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  console.log(result, "resultewwewewewe");
  if (clients && creations) {
    return (
      <>
        <Wrapper className="sliderclass">
          <ClientWrapper>
            <div>
              {/* <h1>{generalSetting?.client_heading_en}</h1> */}
              <h1>
                {lang === "fr"
                  ? generalSetting?.client_heading_fr
                  : generalSetting?.client_heading_en}
              </h1>
              {/* <h1> */}
              {/* <ReactMarkdown
                source={
                  lang === "fr"
                    ? generalSetting?.client_heading_fr
                    : generalSetting?.client_heading_en
                }
              /> */}
              {/* </h1> */}

              {/* <p>{generalSetting?.client_desc_en}</p> */}
              <ReactMarkdown
                source={
                  lang === "fr"
                    ? generalSetting?.client_desc_fr
                    : generalSetting?.client_desc_en
                }
              />
              <div className="slider-parent">
                <Slider
                  left={{ desktop: "0", mobile: "0" }}
                  arrowId="new-arrow-style"
                  sliderName="new-custom-slide"
                >
                  {clients.map((client) => (
                    <PortfolioSlide>
                      <img
                        src={`${publicRuntimeConfig.API_URL}${client.logo.url}`}
                        alt=""
                      />
                    </PortfolioSlide>
                  ))}
                </Slider>
              </div>
              <div></div>
            </div>
          </ClientWrapper>
          <RadioButton className="container-swiper">
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              spaceBetween={50}
              slidesPerView={2}
            >
              {result.map((el) => (
                <SwiperSlide className="grid-item">
                  {el.map((client) => (
                    <div className="swaperimage">
                      <img
                        src={`${publicRuntimeConfig.API_URL}${client?.logo?.url}`}
                      />
                    </div>
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          </RadioButton>
          <TabsButton>
            <div className="select-wrapper">
              <label>{selectedIndex}</label>
              <select
                onChange={(e) => {
                  setSelectedIndex(e.target.value);
                  seTabCreation(
                    creations.filter(
                      (f) =>
                        f.filter?.name === e.target.value ||
                        f.filter?.name_fr === e.target.value
                    )
                  );
                }}
              >
                <option
                  value={translations[lang].filter_all}
                  className="optiontext"
                >
                  {translations[lang].filter_all}
                </option>
                {arr?.map((tab, index) => {
                  return (
                    <option
                      value={lang === "fr" ? tab.name_fr : tab.name}
                      key={index}
                    >
                      {lang === "fr" ? tab.name_fr : tab.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              style={{
                textDecorationLine:
                  selectedIndex === "all" ? "underline" : "none",
                fontWeight: selectedIndex === "all" ? 700 : 400,
              }}
              id="all-tabs"
              onClick={() => setSelectedIndex("all")}
            >
              {translations[lang].filter_all}
            </button>
            {arr?.map((tab, index) => {
              return (
                <button
                  key={index}
                  style={{
                    textDecorationLine:
                      index === selectedIndex ? "underline" : "none",
                    fontWeight: index === selectedIndex ? 700 : 400,
                  }}
                  onClick={() => {
                    setSelectedIndex(index);
                    seTabCreation(
                      creations.filter(
                        (f) =>
                          f.filter?.name === tab.name ||
                          f.filter?.name_fr === tab.name_fr
                      )
                    );
                  }}
                >
                  {lang === "fr" ? tab.name_fr : tab.name}
                </button>
              );
            })}
          </TabsButton>

          <CreationsWrapper>
            {shuffle(selectedIndex === "all" ? creations : tabCreation)
              // .filter((item) => {
              //   return item.onClientPage === true;
              // })
              .map((creation, i) => {
                return (
                  <Creation
                    creation={creation}
                    lang={lang}
                    index={i}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    setViewClient={setViewClient}
                  ></Creation>
                );
              })}
          </CreationsWrapper>
        </Wrapper>
        {isOpen && (
          <CustomModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            clients={clients}
            creations={creations}
            viewClient={viewClient}
            lang={lang}
          />
        )}
      </>
    );
  }
};

export default Clients;
