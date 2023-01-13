import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CloseIcon } from "../Icons";
import getConfig from "next/config";
import { shuffle } from "../../utils";
import Slider from "../Slider/sliderTalent";

const CustomModal = (props) => {
    const { clients, setIsOpen, creations, isOpen, viewClient } = props
    const { publicRuntimeConfig } = getConfig();

    const ClientWrapper = styled.div`
        width: 100%;
        gap:50px;
        overflow:hidden;
        position: relative;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content:space-around;
        & > div{
            max-width:380px;
        }
        & #new-custom-slidecss{
            &  img{
                height:100%;  
                max-height:400px;
                width:380px;
            }
        }
         & #new-arrow-style{
            // background: none;
            // box-shadow: none;
            box-shadow: none;
            background-color:white;
            border-radius:0px;
            margin:0;
            top: 0;
            height:100%;
            width:40px!important;
          }
        @media (max-width: 960px) {
            width: 90%;
            gap:20px;
            max-height:600px;
            flex-direction:column;
            & img {
            width: 50px;
            margin: 10px;
            }
        }
    `;

    const ClientDesc = styled.div`
            width:100%;
            margin-right:20px;
            & h1 {
                font-family: 'SVN-Miller Banner';
                font-style: normal;
                font-weight: 400;
                font-size: 37.27px;
                line-height: 50px;
                text-align: center;
                color: #000000;
                margin-bottom:0px;
              }
              & p {
                font-family: 'SVN-Miller Banner';
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
                width:100%;
              }
`;

    const PortfolioSlide = styled.div`
        z-index: 1;
        /* @media (max-width: 960px) {
            height: 300px;
        } */
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
           margin-top:5rem;
        }
`;

    const ModalContent = styled.div`
    min-width: 80%;
    min-height:50%;
    background-color: white;
    padding: 25px;
    position: relative;
    & button {
        cursor: pointer;
        border: none;
        background: transparent;
        position: absolute;
        right: 0%;
        top: 0%;
        align-self: flex-end;
        z-index:1;
    }
    @media (max-width: 960px) {
        height:85%;
        max-height: 600px;
        overflow: scroll;
    } 
  `;


    const Modal = ({ children, shown, close }) => {
        return shown ? (
            <ModalBackdrop
                onClick={() => {
                    close();
                }}
            >
                <ModalContent
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    <button onClick={close}>
                        <CloseIcon />
                    </button>
                    {children}
                </ModalContent>
            </ModalBackdrop>
        ) : null;
    }
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
                    arrowId='new-arrow-style'
                    overflowType='hidden'
                >
                    {viewClient?.campaign_portfolio?.map((client) => (
                        <PortfolioSlide>
                            <img
                                src={`${publicRuntimeConfig.API_URL}${client.url}`}
                                alt=""
                            />
                        </PortfolioSlide>
                    ))}
                </Slider>
                <ClientDesc>
                    <h1>
                        {viewClient?.campaign_name}
                    </h1>
                    <p>
                        {viewClient?.campaign_portfolio_desc}
                    </p>
                </ClientDesc>
            </ClientWrapper>
        </Modal>
    );
};

export default CustomModal;