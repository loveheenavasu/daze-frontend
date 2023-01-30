import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CloseIcon } from "../Icons";
import getConfig from "next/config";
import { shuffle } from "../../utils";
import Slider from "../Slider/sliderTalent";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

const CustomModal = (props) => {
  const { clients, setIsOpen, creations, isOpen, viewClient, lang } = props;
  const { publicRuntimeConfig } = getConfig();

  const ClientWrapper = styled.div`
    width: 100%;
    gap: 50px;
    overflow: hidden;
    position: relative;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    & > div {
    }
    & #new-custom-slidecss {
      & img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    & #new-arrow-style {
      // background: none;
      // box-shadow: none;
      box-shadow: none;
      background-color: white;
      border-radius: 0px;
      margin: 0;
      top: 0;
      height: 100%;
      width: 40px !important;
    }

    // @media (min-width: 2560px) {
    //   width: 100%;
    // }
    // @media (min-width: 1440px) {
    //   width: 70%;
    //   max-width: 100%;
    // }
    @media (max-width: 1440px) {
      width: 86%;
      max-width: 100%;
    }
    @media (max-width: 1024px) {
      width: 100%;
      max-width: 100%;
    }
    @media (min-width: 1442px) {
      width: 90%;
      max-width: 100%;
    }
    @media (min-width: 960px) {
      .campaignMobile {
        display: none;
      }
    }
    @media (max-width: 960px) {
      display: none;
      width: 90%;
      gap: 20px;
      max-height: 600px;
      position: absolute;
      top: 30px;
      flex-direction: column;
      & img {
        width: 100%;
        height: 100%;
      }
      .campaignName {
        display: none;
      }
    }
    .modalbacground {
      top: 5px;
      max-height: 100%;
    }
  `;
  const ClientDescMobile = styled.div`
    & h1 {
      font-family: "SVN-Miller Banner";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      text-align: center;
      margin-top: 0px;
      color: #000000;
      margin-bottom: 0px;
    }
    
    }
  `;

  const ClientDesc = styled.div`
    width: 100%;

    margin-right: 60px;
    & h1 {
      font-family: "SVN-Miller Banner";
      font-style: normal;
      font-weight: 400;
      font-size: 37.27px;
      line-height: 50px;
      text-align: center;
      color: #000000;
      margin-bottom: 0px;
    }
    & p {
      font-family: "SVN-Miller Banner";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: #000000;
      max-height: 200px;
      overflow: scroll;
    }
    @media (min-width: 2560px) {
      & h1 {
        font-size: 47.27px;
      }
      & p {
        font-size: 20px;
      }
    }
    @media (max-width: 960px) {
      width: 100%;
      margin-right: 0px;
      & p {
        font-size: 14px;
        padding-top: 0px;
        padding-bottom: 0px;
        margin-top: 5px;
        padding: 0px 20px;
      }
    }
  `;

  const PortfolioSlides = styled.div`
    width: 330px;
    height: 335px;
    z-index: 1;
    /* @media (max-width: 960px) {
            height: 300px;
        } */
    &img {
      width: 100%;
      heigth: 100%;
      object-fit: contain;
    }
    @media (max-width: 960px) {
      width: 100%;
      height: 329px;
      z-index: 1;
      &img {
        width: 100%;
        heigth: 100%;
        object-fit: contain;
      }
    }
    @media (min-width: 2560px) {
      width: 636px;
      height: 529px;
    }
    @media (max-width: 1024px) {
      width: 100%;
    }
    @media (min-width: 1440px) {
      width: 422px;
    }
  `;

  const PortfolioSlide = styled.div`
    width: 395px;
    height: 371px;
    z-index: 1;
    /* @media (max-width: 960px) {
            height: 300px;
        } */
    &img {
      width: 100%;
      heigth: 100%;
      object-fit: contain;
    }
    @media (max-width: 960px) {
      width: 100%;
      z-index: 1;
      &img {
        width: 100%;
        heigth: 100%;
        object-fit: contain;
      }
    }
    @media (min-width: 2560px) {
      width: 636px;
      height: 529px;
    }
    @media (max-width: 1440px) {
      width: 415px;
    }
  `;

  const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0 0 0 / 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    @media (max-width: 960px) {
      margin-top: 5rem;
      height: 100%;
    }
  `;

  const ModalContent = styled.div`
    min-width: 90%;
    min-height: 35%;
    height: 54vh;
    background-color: white;
    position: relative;
    & button {
      cursor: pointer;
      border: none;
      background: transparent;
      position: absolute;
      right: 1%;
      top: 3%;
      align-self: flex-end;
      z-index: 1;
    }
    @media (min-width: 2560px) {
      min-width: 60%;
    }
    @media (max-width: 1440px) {
      min-width: 79%;
    }
    @media (max-width: 1024px) {
      min-width: 88%;
    }
    @media (max-width: 960px) {
      height: 82%;
      margin: 0px 5px;
      position: absolute;
      top: 50px;
      overflow: scroll;
    }
  `;
  const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const Modal = ({ children, shown, close }) => {
    return shown ? (
      <ModalBackdrop
        onClick={() => {
          close();
        }}
      >
        <ModalContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <StyledModalOverlay className="modalbacground">
            <button onClick={close}>
              <CloseIcon />
            </button>
            {children}
          </StyledModalOverlay>
        </ModalContent>
      </ModalBackdrop>
    ) : null;
  };
  return (
    <Modal
      shown={isOpen}
      close={() => {
        setIsOpen(false);
      }}
    >
      <ClientWrapper>
        <Slider
          left={{ desktop: "0", mobile: "0" }}
          sliderName="new-custom-slidecss"
          arrowId="new-arrow-style"
          overflowType="hidden"
        >
          {viewClient?.campaign_portfolio?.map((client) => (
            <PortfolioSlide>
              <img src={`${publicRuntimeConfig.API_URL}${client.url}`} alt="" />
            </PortfolioSlide>
          ))}
        </Slider>
        <ClientDesc>
          <h1 className="campaignName">
            {lang === "fr"
              ? viewClient?.campaign_name_fr
              : viewClient?.campaign_name}
          </h1>
          <p>
            {lang === "fr"
              ? viewClient?.campaign_portfolio_desc_fr
              : viewClient?.campaign_portfolio_desc}
          </p>
        </ClientDesc>
      </ClientWrapper>
      <div class="swiper-mobile">
        <ClientDescMobile>
          <h1 className=" campaignMobile">{viewClient?.campaign_name}</h1>
        </ClientDescMobile>

        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Pagination]}
          slidesPerView={1}
          className="client-mobile-swiper"
        >
          {viewClient?.campaign_portfolio?.map((client) => (
            <SwiperSlide>
              <PortfolioSlides>
                <img
                  src={`${publicRuntimeConfig.API_URL}${client.url}`}
                  alt=""
                />
              </PortfolioSlides>
            </SwiperSlide>
          ))}
        </Swiper>
        <ClientDesc>
          {/* <h1 className="campaignName">{viewClient?.campaign_name}</h1> */}
          <p>{viewClient?.campaign_portfolio_desc}</p>
        </ClientDesc>
      </div>
    </Modal>
  );
};

export default CustomModal;
