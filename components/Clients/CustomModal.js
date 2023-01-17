import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CloseIcon } from "../Icons";
import getConfig from "next/config";
import { shuffle } from "../../utils";
import Slider from "../Slider/sliderTalent";

const CustomModal = (props) => {
  const { clients, setIsOpen, creations, isOpen, viewClient } = props;
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
      max-width: 380px;
    }
    & #new-custom-slidecss {
      & img {
        height: 100%;
        max-height: 400px;
        width: 380px;
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
    @media (min-width: 960px) {
      .campaignMobile {
        display: none;
      }
    }
    @media (max-width: 960px) {
      width: 90%;
      gap: 20px;
      max-height: 600px;
      position: absolute;
      top: 30px;
      flex-direction: column;
      & img {
        width: 50px;
        margin: 10px 1px;
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
      font-size: 37.27px;
      text-align: center;
      margin-top: 0px;
      color: #000000;
      margin-bottom: 0px;
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
    @media (max-width: 960px) {
      width: 100%;
    }
  `;

  const PortfolioSlide = styled.div`
    z-index: 1;
    /* @media (max-width: 960px) {
            height: 300px;
        } */
    &img {
      object-fit: contain;
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
    min-width: 60%;
    min-height: 35%;
    height: 54vh;
    background-color: white;
    padding: 25px;
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
    @media (max-width: 960px) {
      height: 66vh;
      position: absolute;
      top: 50px;
      max-height: 600px;
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
        <ClientDescMobile>
          <h1 className=" campaignMobile">{viewClient?.campaign_name}</h1>
        </ClientDescMobile>
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
          <h1 className="campaignName">{viewClient?.campaign_name}</h1>
          <p>{viewClient?.campaign_portfolio_desc}</p>
        </ClientDesc>
      </ClientWrapper>
    </Modal>
  );
};

export default CustomModal;
