import React, { useEffect } from "react";
import styled from "styled-components";
import { shuffle } from "../../utils";
import gsap from "gsap";
import Link from "next/link";
import translations from "./locale";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 70px;
`;

const ClientWrapper = styled.div`
  width: 100%;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 960px;

  margin-bottom: 100px;
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
  @media (max-width: 960px) {
    margin-bottom: 100px;
    width: 90%;
    & img {
      height: auto;
      width: 50px;
      margin: 10px;
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
  margin-top: 100px;
  overflow: hidden;
  @media (max-width: 960px) {
    margin-top: 100px;
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
  &:hover div {
    opacity: 1;
  }
  span {
    width: 100%;
    display: block;
  }
  @media (max-width: 960px) {
    width: calc((100vw) / 2);
    height: calc((100vw) / 2);
    font-size: 18px;
    div {
      opacity: 1;
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

const Creation = (props) => {
  let { creation, index, lang } = props;
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
    <CreationWrapper
      href={creation.instagram_link}
      target="__blank"
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
          {translations[lang].view_on_insta}
        </span>
      </div>
    </CreationWrapper>
  );
};

const Clients = ({ clients, creations, lang }) => {
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
      <Wrapper>
        <ClientWrapper>
          <div
            id="client-background-img"
            style={{
              backgroundImage:
                lang == "fr"
                  ? 'url("/assets/svg/client_catch_fr.svg")'
                  : 'url("/assets/svg/client_catch_en.svg")',
            }}
          ></div>
          <div id="logos-clients-wrapper">
            {clients.map((client) => {
              return (
                <img
                  src={`${publicRuntimeConfig.API_URL}${client.logo.url}`}
                  alt=""
                />
              );
            })}
          </div>
        </ClientWrapper>
        <center>
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
        </center>
        <center>
          <Title>{translations[lang].some_creations}</Title>
        </center>
        <CreationsWrapper>
          {shuffle(creations)
            .filter((item) => {
              /* console.log(item); */
              return item.onClientPage === true;
            })
            .map((creation, i) => {
              return (
                <Creation creation={creation} lang={lang} index={i}></Creation>
              );
            })}
        </CreationsWrapper>
      </Wrapper>
    );
  }
};

export default Clients;
