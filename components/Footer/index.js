import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "../Link";

import { LinkedinLogo, InstagramLogo, TwitterLogo } from "../Icons";

import Select from "./customSelect";

const Container = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 380px;
  background: #fff;
  border-top: 1px solid #ebebeb;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const LinkWrapper = styled.div`
  height: 23px;
  font-family: "SackersGothicStd-Heavy";
  text-transform: lowercase;
  a.active {
    color: #000;
  }
  a:hover {
    color: #484848;
  }
  a {
    color: #959595;
    margin: 0 25px;
    font-size: 13px;
    text-decoration: none;
    vertical-align: middle;
    transition: color 0.2s ease;
    img {
      height: 23px;
    }
  }
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    height: auto;
    a {
      margin: 10px 0;
    }
  }
`;

const LogoContainer = styled.div`
  margin: 50px 0 0 0;
  height: 50px;
  img {
  }
`;

const SelectWrapper = styled.div`
  width: 140px;
  position: relative;
`;

const TranslateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    margin: 0 10px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  height: 50px;
  &,
  a {
    font-family: "Avenir Next";
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(151, 151, 151);
  }
  & div:nth-child(1) {
    margin-left: 50px;
  }
  & div:nth-child(2) {
    margin-right: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  a {
    margin: 0 10px;
  }
  @media (max-width: 960px) {
    display: flex;
    & div:nth-child(2) {
      margin-right: 5px;
    }
    & div:nth-child(1) {
      margin-left: 15px;
    }
  }
`;

const Footer = (props) => {
  const { lang, setLang } = props;
  return (
    <Wrapper>
      <LogoContainer>
        <img src="/assets/svg/daze-icon.svg" alt="" />
      </LogoContainer>
      <LinkWrapper>
        <Link href="/">
          <a>HOME</a>
        </Link>
        <Link href="/talents">
          <a>TALENTS</a>
        </Link>
        <Link href="/clients">
          <a>CLIENTS</a>
        </Link>
        <Link href="/contact">
          <a>CONTACT</a>
        </Link>
      </LinkWrapper>
      <TranslateWrapper>
        <a href="https://www.tiktok.com/@dazemgmt" target="__blank">
          <TwitterLogo />
        </a>
        <a href="https://www.linkedin.com/company/daze-mgmt" target="__blank">
          <LinkedinLogo />
        </a>
        <a href="https://www.instagram.com/dazemgmt/" target="__blank">
          <InstagramLogo />
        </a>
        <SelectWrapper>
          <Select
            setLang={setLang}
            id="select-lang-footer"
            lang={lang}
            options={[
              { text: "english", value: "en" },
              { text: "français", value: "fr" },
            ]}
          ></Select>
        </SelectWrapper>
      </TranslateWrapper>
      <Bottom>
        <div>© 2020 Daze MGMT</div>
        <div>
          <Link href="/use-terms">
            <a>Term Of Use</a>
          </Link>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
        </div>
      </Bottom>
    </Wrapper>
  );
};

export default Footer;
