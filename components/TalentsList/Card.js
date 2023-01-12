import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { nFormatter } from "../../utils";
import gsap from "gsap";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const Container = styled.div`
  width: 100%;
  height: calc(498 * (100vw / ${({ nbrCol }) => nbrCol}) / 360);
  flex-shrink: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform-origin: top center;
  a.link-wrapper-card {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 960px) {
    &:hover .cardTalentWrapper {
      transform: scale(0.8);
    }
  }
  @media (max-width: 960px) {
    margin-bottom: 50px;
  }
`;

const BlackBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 99;
  transition: opacity 0.1s ease-in;
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(498 * (100vw / ${({ nbrCol }) => nbrCol}) / 360);
  color: #fff;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  & p {
    z-index: 99;
  }
  & p.leftName {
    font-size: 30px;
    text-shadow: 0px 2px 28px rgba(0, 0, 0, 0.67);
    display: inline-block;
    width: calc(498 * (100vw / 4) / 360 - 50px);
    position: absolute;
    left: 10px;
    top: 100%;
    text-align: right;
    font-weight: 300;
    font-family: "Bodoni-Book";
    margin: 0;
    transform-origin: top left;
    transform: rotate(-90deg);
    pointer-events: none;
    opacity: 1;
    z-index: 99;
    transition: opacity 0.3s ease;
    .mobile-follow,
    .talent-lastname {
      display: none;
    }
  }
  @media (min-width: 960px) {
    &:hover p.leftName {
      opacity: 0;
    }
    &:hover p.talentName {
      opacity: 1;
    }
    &:hover p.talentFollowers {
      opacity: 1;
    }
    &:hover .talentListBg {
      opacity: 1;
    }
  }
  & p.talentName {
    font-size: 31px;
    text-align: right;
    font-weight: 300;
    font-family: "Bodoni-Book";
    margin: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  & p.talentFollowers {
    font-size: 24px;
    text-align: right;
    margin: 13px 0 0 0;
    font-weight: 300;
    font-family: "Avenir Next";
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  @media (max-width: 960px) {
    width: 90%;
    height: calc(498 * (90vw / ${({ nbrCol }) => nbrCol}) / 360);
    & p.leftName {
      top: 105%;
      text-shadow: none;
      transform: rotate(0deg);
      color: #000;
      left: 0;
      text-align: left;
      display: inline-block;
      /* justify-content: space-between;
      align-items: center; */
      width: 100%;
      .mobile-follow {
        /* color: rgba(87, 87, 87, 1); */
        font-size: 20px;
        line-height: 100%;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        height: 20px;
        right: 0;
      }
      .talent-lastname {
        display: inline;
      }
    }
  }
`;

const Placeholder = styled.div`
  width: 400px;
  height: 400px;
  background: #fff;
`;

const CardWrapper = (props) => {
  const { talent, nbrCol, colIndex, index } = props;
  useEffect(() => {
    gsap.set(`#talentCardContainer-${talent.id}`, {
      autoAlpha: 0,
      y: 200,
      x: -200,
      scale: 0.5,
    });
    gsap.to(`#talentCardContainer-${talent.id}`, 0.5, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      delay: 0.2,
    });
  }, []);
  return (
    <Container nbrCol={nbrCol} id={`talentCardContainer-${talent.id}`}>
      <Link
        href="/talents/[instagram_id]"
        as={`/talents/${talent.instagram_id}`}
      >
        <a className="link-wrapper-card">
          <Wrapper
            className="cardTalentWrapper"
            key={`talent-${talent.id}`}
            nbrCol={nbrCol}
            style={{
              backgroundImage:
                (talent.profile_pic &&
                  `url(${publicRuntimeConfig.API_URL}${talent.profile_pic.url}`) ||
                (talent.portfolio &&
                  talent.portfolio.length !== 0 &&
                  `url(${publicRuntimeConfig.API_URL}${talent.portfolio[0].url}`),

              backgroundColor: "#A1A1A1",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <BlackBg className="talentListBg"></BlackBg>
            <p className="leftName">
              {talent.firstname}{" "}
              <span className="talent-lastname"> {` ${talent.lastname}`}</span>
              <span className="mobile-follow">
                {" "}
                {nFormatter(talent.followers, 1)}
              </span>
            </p>

            <p className="talentName">
              {talent.firstname + " " + talent.lastname}
            </p>
            <p className="talentFollowers">{nFormatter(talent.followers, 1)}</p>
          </Wrapper>
        </a>
      </Link>
    </Container>
  );
};

const Card = (props) => {
  const { talent, nbrCol, index } = props;

  return (
    <LazyLoad
      height={400}
      width={(498 * (window && window.innerWidth / nbrCol)) / 360}
      key={talent.id}
      once
      // offset={[0, -100]}
      placeholder={<Placeholder />}
    >
      <CardWrapper {...props}></CardWrapper>
    </LazyLoad>
  );
};

export default Card;
