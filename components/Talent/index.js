import styled from "styled-components";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
// import { Container } from "../components/Defaults";
import { nFormatter } from "../../utils";
import Router from "next/router";
import Link from "next/link";
import Layout from "../Layout";
import Slider from "../Slider/sliderTalent";
import gsap from "gsap";
import translations from "./locale";
import getConfig from "next/config";
import PlayButton from "./components/PlayButton";
import PlayButtonDeskTop from "./components/PlayButtonDesktop";
import CreationsPlay from "./components/CreationsPlay";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// const Layout = dynamic(() => import("../Layout"), { ssr: false });

const Wrapper = styled.div`
  text-align: left;
  .sliderWrapper {
    margin: 50px 0;
    h3 {
      margin: 20px 10%;
      @media (max-width: 960px) {
        margin-left: 5%;
      }
    }
    h3 > a {
      font-size: 12px;
      font-family: "Avenir Next";
      text-transform: uppercase;
      color: #959595;
      letter-spacing: 2.5px;
      font-weight: bold;
    }
    .instagram_pic_list {
      margin: 0 10%;
      display: flex;
      flex-wrap: wrap;
      .overlay-instagram-pic {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: calc(100% - 14px);
        height: calc(100% - 14px);
        font-size: 12px;
        font-weight: bold;
        font-family: "SackersGothicStd-Heavy";
        text-transform: uppercase;
        color: #fff;
        text-decoration: none;
        text-align: center;
        vertical-align: middle;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease;
      }
      a {
        position: relative;
      }
      a:hover {
        .overlay-instagram-pic {
          opacity: 1;
        }
      }
      .instagram_pic {
        width: calc(80vw / 4 - 20px);
        height: calc(80vw / 4 - 20px);
        margin: 7px 7px;
        @media (max-width: 960px) {
          width: calc(60vw);
          height: calc(60vw);
        }
      }
      @media (max-width: 960px) {
        overflow-x: scroll;
        flex-wrap: nowrap;
        margin: 0;
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
    }
  }
`;

const PortfolioWrapper = styled.div`
  overflow-x: scroll;
  display: flex;
  flex-wrap: no-wrap;
  & > div {
    flex-shrink: 0;
  }
  & img {
    height: 690px;
    @media (max-width: 960px) {
      height: 300px;
      margin: 0 5px;
    }
  }
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
`;

const TalentInfos = styled.div`
  padding: 25px 9%;
  // position: relative;
  background: #f6f6f6;

  h1 {
    font-family: "Bodoni-Book";
    font-size: 35px;
    font-weight: 300;
    color: #000;
    margin-bottom: 20px;
  }
  .button-wrapper {
    // position: relative;
    margin: 10px;
    padding-left: 2rem;
    line-height: 22px;
    // right: 0;
    @media (max-width: 960px) {
      padding: 0;
      align-self: center;
      margin-top: 28px;
    }
  }
  .infos {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      .instagram_id {
        margin-right: 50px;
        a {
          font-size: 26px;
          font-family: "Bodoni-Book";
          color: #000;
          margin: 0;
          text-decoration: none;
          @media (max-width: 960px) {
            font-size: calc(3vw + 10px);
          }
        }
      }
      h2 {
        font-size: 12px;
        font-family: "Avenir Next";
        text-transform: uppercase;
        color: #959595;
        letter-spacing: 2.5px;
        font-weight: bold;
        margin: 6px 0;
      }
      p {
        font-size: 26px;
        font-family: "Bodoni-Book";
        color: #000;
        margin: 0;
        text-decoration: none;
        // text-transform: uppercase;
        @media (max-width: 960px) {
          font-size: calc(3vw + 10px);
        }
      }
    }
  }
  @media (max-width: 960px) {
    padding: 50px 5% 0 5%;
    .infos {
      flex-direction: column;
      & > div {
        // flex-direction: column;
        .instagram_id {
          margin-bottom: 35px;
        }
      }
    }
  }
`;

const BackButton = styled.div`
  /* width: 50px;
  height: 50px; */
  position: absolute;
  top: 110px;
  left: 25px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ececec; */
  transform: rotate(-90deg);
  cursor: pointer;
  &:hover {
    & > #scroll-button-bg {
      opacity: 1;
    }
    & > img {
      transform: translateY(-3px);
    }
  }
  & > #scroll-button-bg {
    background-color: #ececec;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    border-radius: 100%;
    transition: opacity 0.4s ease;
  }
  & > img {
    width: 20px;
    height: 20px;
    z-index: 99999;
    transform: translateY(0px);
    /* transform: translateY(0) scaleX(1); */
    transition: transform 0.5s ease;
  }
  @media (max-width: 960px) {
    display: none;
    top: 20px;
    left: 5%;
    & > #scroll-button-bg {
      opacity: 1;
    }
  }
`;

const PortfolioSlide = styled.div`
  margin-bottom: 5px;
  height: 552px;
  width: 100%;
  z-index: 1;
  @media (max-width: 960px) {
    overflow: hidden;
    height: 100%;
    & img {
      object-fit: contain;
    }
  }
  @media (max-width: 320px) {
    width:100%;
    & img {
      width: 100%;
      object-fit: cover;
    }   
    }

  }
`;

const SocielLink = styled.a`
  color: #000;
`;

const TalentName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    & a {
      opacity: 1;
    }
  }
  center {
    width: 100%;
    height: 100%;
  }
  .overlay-instagram-pic {
    margin-top: 20px;
    font-size: 12px;
    font-weight: bold;
    font-family: "SackersGothicStd-Heavy";
    text-transform: uppercase;
    color: #fff;
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
    width: 225px;
    height: 225px;
    margin: 0 5px;
    a  {
      h4 {
        font-size: 18px;
      }
    }
    & > div {
      pointer-events: none;
    }
    &:active > a  {
      pointer-events: auto;
    }
    &:hover > a {
      opacity: 0;
    }
  }
`;

const Creations = styled.div`
  h3  {
    font-size: 12px;
    font-family: "Avenir Next";
    text-transform: uppercase;
    color: #959595;
    letter-spacing: 2.5px;
    font-weight: bold;

    margin: 20px 10px;
    left: 10%;
    position: relative;
  }
  @media (max-width: 960px) {
    h3 {
      left: 0%;
      margin: 20px 5px;
    }
  }
`;

const Button = styled.div`
  display: inline-block;
  border: 1px solid #000;
  align-self: center;
  background-color: #f6f6f6;
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

const MobileCrause = styled.div`
  display: none;
  @media (max-width: 960px) {
    height: 80vh;
    display: flex;
  }
  @media (max-width: 425px) {
    height: 77vh;
  }
  @media (max-width: 378px) {
    height: 77vh;
  }
`;

const DestopWrapper = styled.div`
  display: flex;
  @media (max-width: 960px) {
    display: none;
  }
`;
const MobileWrapper = styled.div`
  display: none !important;
  @media (max-width: 960px) {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
`;

const Name = styled.h1`
  & span {
    display: block;
    font-family: "Sackers Gothic Std";
    font-style: normal;
    font-weight: 850;
    font-size: 11px;
    line-height: 13px;
    color: #000000;
    margin-bottom: 0px;
    text-transform: uppercase;
    padding-top: 8px;
  }
  @media (max-width: 960px) {
    margin-top: -10px;
  }
`;

const SocialHandles = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  @media (max-width: 960px) {
  }
`;

const Client = ({ client, lang }) => {
  console.log(client, "CLIENTTTTTT");
  return (
    <ClientWrapper
      style={{
        overflow: "hidden",
        zIndex: 0,
        backgroundImage: `url(${publicRuntimeConfig.API_URL}${
          client.img && client.img.url
        })`,
      }}
    >
      {client.img.mime === "video/mp4" ? (
        <center style={{ alignItems: "center", zIndex: 1 }}>
          <CreationsPlay item={client.img} />
        </center>
      ) : (
        <center>
          <a href={client.instagram_link} target="__blank">
            <h4>
              <span>{client.name.split(" x ")[0]}</span>
              <span>x</span>
              <span>{client.name.split(" x ")[1]}</span>
            </h4>
            <div className="overlay-instagram-pic">
              {translations[lang].view_on_insta}
            </div>
          </a>
        </center>
      )}
    </ClientWrapper>
  );
};

const Talent = ({ talent, lang }) => {
  console.log(talent, "wewewewewe");
  // const [isDown, setIsDown] = useState(false)
  // const [startX, setStartX] = useState(0)
  // let router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [playButton, setPlayButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  function playPause() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlayButton(false);
      // video.play();
    } else {
      // video.pause();
      videoRef.current.pause();
      setPlayButton(true);
    }
  }

  const handleMouseDown = (e) => {
    let PortfolioWrapper = document.getElementById("portfolio-wrapper");
    isDown = true;
    startX = e.pageX - PortfolioWrapper.offsetLeft;
    scrollLeft = PortfolioWrapper.scrollLeft;
  };
  const handleMouseLeave = (e) => {
    isDown = false;
  };
  const handleMouseMove = (e) => {
    let PortfolioWrapper = document.getElementById("portfolio-wrapper");
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - PortfolioWrapper.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    PortfolioWrapper.scrollLeft = scrollLeft - walk;
  };
  const replaceSlashN = (str) => {
    return str?.replace(/\n/g,'<br />');
  }

  const descText = (lang === "fr" ? replaceSlashN(talent?.description_fr) : replaceSlashN(talent?.description ) )

  // console.log("dataaaa",descText)
  return (
    <Wrapper>
      <MobileCrause>
        <Slider
          left={{ desktop: "0", mobile: "0" }}
          sliderName="slider-talent-profile-mobile"
        >
          {talent.portfolio.map((item) => (
            <PortfolioSlide>
              {item?.mime === "video/mp4" ? (
                <div
                  style={{
                    position: "relative",
                    height: "80vh",
                    overflow: "hidden",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PlayButton item={item} />
                </div>
              ) : (
                <img
                  style={{
                    height: "100%",
                  }}
                  src={`${publicRuntimeConfig.API_URL}${item.url}`}
                  alt=""
                />
              )}
            </PortfolioSlide>
          ))}
        </Slider>
      </MobileCrause>
      <TalentInfos>
        {/* <BackButton onClick={() => history.back()}> */}
        {/* <div id="scroll-button-bg"></div> */}
        {/* <img src="/assets/svg/arrowScrollTop.svg" alt="" /> */}
        {/* </BackButton> */}
        <TalentName>
          <Name className="talent-name">
            {talent.firstname + " " + talent.lastname}
            <span>{lang === "fr" ? talent?.talent_fr : talent?.talent}</span>
          </Name>

          <DestopWrapper>
            <Button>
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    subject: `Media Kit - ${talent.firstname} ${talent.lastname}`,
                  },
                }}
                // as="/contact"
              >
                <a
                // href={`mailto:contact@daze-mgmt.com?subject=Request media kit for ${talent.firstname} ${talent.lastname}`}
                >
                  {translations[lang].media_kit}
                </a>
              </Link>
            </Button>
          </DestopWrapper>
        </TalentName>

        <div className="infos">
          <SocialHandles>
            <div className="instagram_id">
              <h2>instagram</h2>
              <a
                target="__blank"
                href={`https://www.instagram.com/${talent.instagram_id}`}
              >{`@${talent.instagram_id}`}</a>
              <p className="nfollowers">{nFormatter(talent.followers, 1)}</p>
              <p>ER: {talent?.instragram_ER}%</p>
            </div>
            <div className="followers">
              <h2>Tiktok</h2>
              <p>
                <SocielLink
                  target="__blank"
                  href={`https://www.tiktok.com/@${talent?.tiktok_id}`}
                >{`@${talent?.tiktok_id}`}</SocielLink>
              </p>
              <p className="nfollowers">
                {nFormatter(talent.tiktok_followers, 1)}
              </p>
              <p>ER: {talent?.tiktok_ER}%</p>
            </div>
          </SocialHandles>
          <MobileWrapper>
            <Button>
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    subject: `Media Kit - ${talent.firstname} ${talent.lastname}`,
                  },
                }}
                // as="/contact"
              >
                <a
                // href={`mailto:contact@daze-mgmt.com?subject=Request media kit for ${talent.firstname} ${talent.lastname}`}
                >
                  {translations[lang].media_kit}
                </a>
              </Link>
            </Button>
          </MobileWrapper>
          {/* <div className="preContainer" > */}
          <p className="button-wrapper" style={{display: 'block'}} dangerouslySetInnerHTML={{__html: descText}} />
          {/* <pre className="button-wrapper"  dangerouslySetInnerHTML={{__html: lang === "fr" ? talent?.description_fr : talent?.description}}></pre> */}
          {/* </div> */}
          {/* <p className="button-wrapper">
            {lang === "fr" ? talent?.description_fr : talent?.description} */}
            {/* <Button>
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    subject: `Media Kit - ${talent.firstname} ${talent.lastname}`,
                  },
                }}
                // as="/contact"
              >
                <a
                // href={`mailto:contact@daze-mgmt.com?subject=Request media kit for ${talent.firstname} ${talent.lastname}`}
                >
                  {translations[lang].media_kit}
                </a>
              </Link>
            </Button> */}
          {/* </p> */}
        </div>
      </TalentInfos>
      <DestopWrapper>
        <Slider
          left={{ desktop: "0", mobile: "0" }}
          sliderName="slider-talent-profile"
        >
          {talent.portfolio.map((item) => (
            <PortfolioSlide>
              {item.mime === "video/mp4" ? (
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    overflow: "hidden",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PlayButtonDeskTop item={item} />
                </div>
              ) : (
                <img
                  style={{
                    width: "auto",
                    height: "100%",
                    display: "block",
                  }}
                  src={`${publicRuntimeConfig.API_URL}${item.url}`}
                  alt=""
                />
              )}
            </PortfolioSlide>
          ))}
        </Slider>
      </DestopWrapper>

      {/* {talent.portfolio.length !== 0 && (
          <PortfolioWrapper
            id="portfolio-wrapper"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {talent.portfolio.map(item => (
              <div
                style={{
                  marginBottom: 5
                }}
              >
                <img
                  style={{
                    width: "auto",
                    display: "block"
                  }}
                  src={`${publicRuntimeConfig.API_URL}${item.url}`}
                  alt=""
                />
              </div>
            ))}
          </PortfolioWrapper>
        )} */}
      {talent.creations.reverse().length !== 0 && (
        <Creations>
          <h3>{translations[lang].lastcreation}</h3>
          <Slider
            left={{ desktop: "10%", mobile: "0" }}
            sliderName="slide-client"
          >
            {talent.creations.map((item, i) => {
              return <Client client={item} lang={lang}></Client>;
            })}
          </Slider>
        </Creations>
      )}
      {/* {talent.instagram_last_pics.length !== 0 && (
        <div className="sliderWrapper">
          <h3>
            <a
              target="__blank"
              href={`https://www.instagram.com/${talent.instagram_id}`}
            >{`@${talent.instagram_id}`}</a>
          </h3>
          <div className="instagram_pic_list">
            {talent.instagram_last_pics
              .sort((a, b) => {
                if (a.date > b.date) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .slice(0, 8)
              .map((item) => (
                <a href={item.url} target="__blank">
                  <div
                    className="instagram_pic"
                    style={{
                      backgroundImage: `url(${publicRuntimeConfig.API_URL}${item.img.url})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="overlay-instagram-pic">
                      {translations[lang].view_on_insta}
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      )} */}
    </Wrapper>
  );
};

export default Talent;
