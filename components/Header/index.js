import React, { Component } from "react";
import styled from "styled-components";
import Link from "../Link";
import lottie from "lottie-web";
import gsap from "gsap";
import { LinkedinLogo, InstagramLogo } from "../Icons";
import Select from "../Footer/customSelect";

const Container = styled.div`
  width: 100%;
  height: 79px;
  border-top: 3px solid #000;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0px;
  z-index: 100000;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  & #burgerMenu {
    position: relative;
    display: none;
    z-index: 9999;
    cursor: pointer;
    width: 27px;
    height: 23px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto 0;
    @media (max-width: 960px) {
      display: block;
    }
  }
`;

const LinkWrapper = styled.div`
  position: absolute;
  height: 23px;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto 0;
  font-size: 13px;
  font-family: "SackersGothicStd-Heavy";
  text-transform: lowercase;

  a.active {
    color: #000;
  }
  a:hover {
    color: #484848;
  }
  & > a {
    color: #959595;
    margin: 0 15px;
    letter-spacing: 0.12px;
    text-decoration: none;
    vertical-align: middle;
    transition: color 0.2s ease;
    img {
      height: 23px;
      width: 23px;
    }
  }
  #icons-menu-desktop {
    & a {
      margin: 0 5px;
    }
  }
  @media (max-width: 960px) {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    top: 0;
    left: 100vw;
    font-size: 20px;
    z-index: 999;
    display: flex;
    bottom: auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    #icons-menu-desktop {
      display: none;
    }
    & > a {
      color: #959595;
      margin: 20px 25px;
      text-decoration: none;
      vertical-align: middle;
    }
    /* & > div {
      margin: 20px 0px;
    } */
  }
`;

const LogoContainer = styled.div`
  display: inline-block;
  width: 76px;
  height: 49px;
  position: fixed;
  height: 50px;
  z-index: 999;
  left: 60px;
  top: 12px;
  a {
    width: 76px;
    height: 49px;
    display: block;
  }
  @media (max-width: 960px) {
    left: 25px;
    top: 12px;
  }
`;

const SelectWrapper = styled.div`
  width: 140px;
  position: relative;
  margin-top: 50px;
`;

const TranslateWrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 25px;
  margin-top: 20px;
  width: 40%;
  & a {
    margin-right: 10px;
  }
  /* & > * {
    margin: 0 10px;
  } */
  @media (max-width: 960px) {
    display: flex;
  }
`;

class Header extends Component {
  state = {
    menuOpen: false
  };
  burgerAnim;
  componentDidMount() {
    const element = document.getElementById("burgerMenu");
    // gsap.set("#LogoContainerHome", { scale: 0.9 });
    // gsap.to("#LogoContainerHome", 0.5, { opacity: 1, delay: 0.5 });
    this.burgerAnim = lottie.loadAnimation({
      container: element, // the dom element that will contain the animation
      renderer: "svg",
      autoplay: false,
      path: "/assets/lottie/burger_menu.json" // the path to the animation json
    });
    // console.log(this.burgerAnim);
  }

  toggleMenu = () => {
    this.setState(
      {
        menuOpen: !this.state.menuOpen
      },
      () => {
        if (this.state.menuOpen) {
          this.burgerAnim.playSegments([0, 26], true);
          gsap.to(".linkWrapper", 0.7, {
            x: "-100vw",
            ease: "Power2.easeOut"
          });
        } else {
          this.burgerAnim.playSegments([26, 45], true);
          gsap.to(".linkWrapper", 0.7, {
            x: "100vw",
            ease: "Power1.easeOut"
          });
        }
      }
    );
  };
  render() {
    return (
      <Container id="HomeHeaderContainer">
        <LogoContainer id="LogoContainerHeader">
          <Link href="/">
            <a>
              <img src="/assets/svg/daze-icon.svg" alt="" />
            </a>
          </Link>
        </LogoContainer>
        <Wrapper>
          <div id="burgerMenu" onClick={this.toggleMenu}></div>
          <LinkWrapper className="linkWrapper">
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
            <div id="icons-menu-desktop">
              <a href="mailto:contact@daze-mgmt.com">
                <img src="/assets/svg/@.svg" alt="" />
              </a>
              <a href="https://www.instagram.com/dazemgmt/" target="__blank">
                {" "}
                <img src="/assets/svg/insta-icon.svg" alt="" />
              </a>
            </div>
            <TranslateWrapper>
              <div>
                <a
                  href="https://www.linkedin.com/company/daze-mgmt"
                  target="__blank"
                >
                  <LinkedinLogo />
                </a>
                <a href="https://www.instagram.com/dazemgmt/" target="__blank">
                  <InstagramLogo />
                </a>
              </div>
              <SelectWrapper>
                <Select
                  id="select-lang-header"
                  setLang={this.props.setLang}
                  lang={this.props.lang}
                  options={[
                    { text: "english", value: "en" },
                    { text: "français", value: "fr" }
                  ]}
                ></Select>
              </SelectWrapper>
            </TranslateWrapper>
          </LinkWrapper>
        </Wrapper>
      </Container>
    );
  }
}

export default Header;
