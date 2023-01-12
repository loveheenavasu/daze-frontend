import React, { useEffect } from "react";
import styled from "styled-components";
import { shuffle } from "../../utils";
import gsap from "gsap";
import Link from "next/link";
import translations from "./locale";
import getConfig from "next/config";
import { useState } from "react";
import CustomModal from "./CustomModal";
import Slider from "../Slider/sliderTalent";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 10px;
`;

const ClientWrapper = styled.div`
  width: 100%;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 960px;
  min-height: 360px;
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
  & #new-custom-slide{
    height:70px;
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
    font-family: 'SVN-Miller Banner';
    font-style: normal;
    font-weight: 400;
    font-size: 57.2727px;
    line-height: 77px;
    text-align: center;
    color: #000000;
    margin-bottom:60px
  }
  & p {
    font-family: 'SVN-Miller Banner';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #000000;
  }
   & #new-arrow-style{
    // background: none;
    box-shadow: none;
    background-color:white;
    border-radius:0px;
    margin: 0;
    top: 0;
    height:100%;
    width:110px!important;
  }
  @media (max-width: 960px) {
    margin-bottom: 40px;
    width: 90%;
    & img {
      height: auto;
      width: 50px;
      margin: 10px;
    }
    & h1{
      margin-bottom:20px
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
  margin-top: 35px;
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
  font-size: 30px;
  font-family: "Bodoni-Book";
  font-weight: 300;
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
    margin-top: 50px;
    color: #fff;
  }
  & button{
    background: #FFFFFF;
    border: 0.763296px solid #000000;
    width: 124px;
    height: 32px;
    font-style: normal;
    font-weight: 850;
    font-size: 7.34px;
    line-height: 9px;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
    cursor:pointer;
  }
  & #res-style{
    display:none;
  }
  &:hover div {
    opacity: 1;
  }
  span {
    width: 100%;
    display: block;
  }
  // & #res-style{
  //   display:none;
  //   @media (max-width: 960px) {
  //     display:block;
  //     opacity: 1;
  //   }
  // }
  @media (max-width: 960px) {
    width: calc((100vw) / 2);
    height: calc((100vw) / 2);
    font-size: 18px;
    margin-bottom:10px;
    div {
      opacity: 0;
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
display:none;
@media (max-width: 960px) {
  display:block;
  &  h1 {
    width: 100%;
    display: block;
    font-family: 'Avenir Next';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    text-align: center;
    color: #000000;
  }
  & button{
    background: #FFFFFF;
    border: 0.763296px solid #000000;
    width: 153px;
    height: 40px;
    padding:16px;
    font-family: 'Sackers Gothic Std';
    font-style: normal;
    font-weight: 850;
    font-size: 8px;
    line-height: 9px;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
    margin-bottom:40px;
  }
}
`
const CreationWrapperContainer = styled.div`
display:flex;
flex-direction:column;
`

const TabsButton = styled.div`
      display:flex;
      justify-content: center;
    & button{
        font-family: 'Avenir Next';
        font-style: normal;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        border:none;
        color: #000000;
        background: none;
        margin-left:90px;
        cursor:pointer;
    }
    & select{
      display:none;
      font-family: 'Avenir Next';
      font-style: normal;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: #000000;
      background: none;
      // margin-left:90px;
      cursor:pointer;
      width: 286px;
      height: 45px;
      outline:none;
    }
    @media (max-width: 960px) {
      & button{
        display:none
      }
      & select{
        display:block;
        font-family: 'Avenir Next';
        font-style: normal;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #000000;
        background: none;
        cursor:pointer;
        width: 286px;
        height: 45px;
        outline:none;
      }
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
        onClick={() => { setIsOpen(true); setViewClient(creation) }}
      >
        <div>
          <span>{creation.name.split(" x ")[0]}</span>
          <span>x</span>
          <span>{creation.name.split(" x ")[1]}</span>
          <span className="instagram-client-link">
            {/* {translations[lang].view_on_insta} */}
            <button onClick={() => window.open(creation.instagram_link)}>
              VIEW ON INSTAGRAM
            </button>
          </span>
        </div>
      </CreationWrapper>
      <ResWrapper>
        <h1>{creation.name.split(" x ")[0]}</h1>
        <h1>x</h1>
        <h1>{creation.name.split(" x ")[1]}</h1>
        <button onClick={() => window.open(creation.instagram_link)}>
          VIEW ON INSTAGRAM
        </button>
      </ResWrapper>
    </CreationWrapperContainer>
  );
};

const Clients = ({ clients, creations, lang, generalSetting, filterTabs }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [viewClient, setViewClient] = useState({})
  const [tabCreation, seTabCreation] = useState(creations)
  const [selectedIndex, setSelectedIndex] = useState('all')

  const arr = filterTabs.map((tab, index) => {
    return {
      name: tab.name, id: index
    }
  })

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

  if (clients && creations) {
    return (
      <>
        <Wrapper>
          <ClientWrapper>
            <div>
              <h1>
                {generalSetting?.client_heading_en}
              </h1>
              <p>
                {generalSetting?.client_desc_en}
              </p>
              <Slider
                left={{ desktop: "0", mobile: "0" }}
                arrowId='new-arrow-style'
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
              <div>
              </div>
            </div>
          </ClientWrapper>

          <TabsButton>
            <div>
              <select
                onChange={(e) => {
                  setSelectedIndex(e.target.value)
                  seTabCreation(creations.filter(f => f.filter?.name === e.target.value))
                }}
              >
                <option value="all">All</option>
                {
                  arr?.map((tab, index) => {
                    return <option
                      value={tab.name} key={index}
                    >{tab.name}</option>
                  })
                }
              </select>
            </div>
            <button style={{
              textDecorationLine: selectedIndex === 'all' ? "underline" : 'none',
              fontWeight: selectedIndex === 'all' ? 700 : 400,
            }} id='all-tabs' onClick={() => setSelectedIndex('all')}>
              All
            </button>
            {
              arr?.map((tab, index) => {
                return (
                  <button key={index} style={{
                    textDecorationLine: index === selectedIndex ? "underline" : 'none',
                    fontWeight: index === selectedIndex ? 700 : 400,
                  }} onClick={() => { setSelectedIndex(index); seTabCreation(creations.filter(f => f.filter?.name === tab.name)) }}>
                    {tab.name}
                  </button>
                )
              })
            }
          </TabsButton>

          {/* <center>
          <Button>
            <Link
              href={{
                pathname: "contact",
                query: {
                  subject: translations[lang].button_subject,
                },
              }}
            >
              <a>{translations[lang].case_studies}</a>
            </Link>
          </Button>
        </center> */}
          {/* <center>
          <Title>{translations[lang].some_creations}</Title>
        </center> */}
          <CreationsWrapper>
            {shuffle(selectedIndex === 'all' ? creations : tabCreation)
              // .filter((item) => {
              //   return item.onClientPage === true;
              // })
              .map((creation, i) => {
                return (
                  <Creation creation={creation} lang={lang} index={i} setIsOpen={setIsOpen} isOpen={isOpen} setViewClient={setViewClient}></Creation>
                );
              })}
          </CreationsWrapper>
        </Wrapper>
        {isOpen &&
          <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} clients={clients} creations={creations} viewClient={viewClient} />
        }
      </>
    );
  }
};

export default Clients;
