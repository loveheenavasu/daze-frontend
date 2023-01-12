import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
// import { useForm, useField, splitFormProps } from "react-form";

import Form from "./form.js";
import translations from "./locale.js";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 70px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  position: relative;

  /* left: 50%;
  transform: translateX(-50%); */
  /* & * {
    text-align: left;
  } */
`;

const Button = styled.button`
  display: inline-block;
  position: relative;
  border: 1px solid #000;
  align-self: center;
  background-color: #fff;
  display: inline-block;
  padding: 13px 30px;
  text-decoration: none;
  color: #000;
  font-family: "SackersGothicStd-Heavy";
  font-size: 14px;
  transition: color 0.2s ease, background-color 0.2s ease;
  margin: 20px 0;
  cursor: pointer;
  & a {
    color: inherit;
  }
  &:hover {
    background-color: #000;
    color: #fff;
    /* transform: scale(1.05); */
  }
  @media (max-width: 960px) {
    margin: 50px 0;
  }
`;

const ButtonContact = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid #000;
  align-self: center;
  background-color: #fff;
  display: inline-block;
  padding: 13px 30px;
  text-decoration: none;
  color: #000;
  font-family: "SackersGothicStd-Heavy";
  font-size: 14px;
  transition: color 0.2s ease, background-color 0.2s ease;
  margin: 20px 0;
  cursor: pointer;
  & a {
    color: inherit;
  }
  &:hover {
    background-color: #000;
    color: #fff;
    /* transform: scale(1.05); */
  }
  @media (max-width: 960px) {
    margin: 50px 0;
  }
`;

const TeamWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TeamContact = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  & h3 {
    color: #000;
    font-size: 19px;
    font-family: "SackersGothicStd-Heavy";
    margin: 10px 0;
  }
  & p {
    color: #000;
    font-size: 16px;
    font-family: "Avenir Next";
    margin: 5px 0;
    min-height: 18px;
    & span {
      font-size: 14px;
      margin-bottom: 10px;
      color: #959595;
    }
  }
`;

const Title = styled.h1`
  font-family: "Miller-Banner-Light";
  font-size: 34px;
  @media (max-width: 960px) {
    font-size: 25px;
  }
`;

const Title2 = styled.h2`
  font-family: "Miller-Banner-Light";
  font-size: 34px;
  margin-top: 80px;
`;

const FormWrapper = styled.div`
  width: 650px;
  max-width: 90%;
`;

const ContactPage = (props) => {
  const router = useRouter();
  const { lang } = props;
  // useEffect(() => {
  //   console.log("subject", lang, translations[lang]);
  // }, []);
  return (
    <Container>
      <Title>{translations[lang].h1}</Title>
      <Wrapper>
        <center>
          <FormWrapper>
            <Form {...props}></Form>
          </FormWrapper>
        </center>
        <center style={{ marginTop: 80 }}>
          <img src="/assets/svg/scroll-line.svg" alt="" />
        </center>
        <center>
          <Title2>The Team</Title2>
          <TeamWrapper>
            <TeamContact>
              <h3>lola de la villéjegu</h3>
              <p>Director</p>
              <p>
                <span>(Dior, Louis Vuitton, Lunched Bumble in France)</span>
              </p>
              <a href="mailto:lola@daze-mgmt.com">
                <ButtonContact>contact</ButtonContact>
              </a>
            </TeamContact>
            <TeamContact>
              <h3>alice de labriffe</h3>
              <p>Project & Talents Manager</p>
              <p>
                <span>(BNP, Groupe ETAM)</span>
              </p>
              <a href="mailto:alice@daze-mgmt.com">
                <ButtonContact>contact</ButtonContact>
              </a>
            </TeamContact>
            <TeamContact>
              <h3>thomas de la villejégu</h3>
              <p>Content Creation & Strategy</p>
              <p>
                <span>
                  (Founder of Entourage Paris, launched Tinder in France)
                </span>
              </p>
              <a href="mailto:thomas@daze-mgmt.com">
                <ButtonContact>contact</ButtonContact>
              </a>
            </TeamContact>
            <TeamContact>
              <h3>jules naquet</h3>
              <p>Business Development</p>
              <p>
                <span>(Founder of Entourage Paris)</span>
              </p>
              <a href="mailto:jules@daze-mgmt.com">
                <ButtonContact>contact</ButtonContact>
              </a>
            </TeamContact>
            <TeamContact>
              <h3>justin prinz</h3>
              <p>Video Maker / Photographer</p>
              <p>
                <span>(Content and production)</span>
              </p>
              <a href="mailto:justin@daze-mgmt.com">
                <ButtonContact>contact</ButtonContact>
              </a>
            </TeamContact>
            <TeamContact>
              <h3>jule comar</h3>
              <p>Artistic Production</p>
              <p>
                <span></span>
              </p>
              <a href="mailto:julecomar@me.com">
                <ButtonContact>contact</ButtonContact>
              </a>
            </TeamContact>
          </TeamWrapper>
        </center>
      </Wrapper>
    </Container>
  );
};

export default ContactPage;
