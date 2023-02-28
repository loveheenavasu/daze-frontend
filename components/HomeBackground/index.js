import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import gsap from "gsap";
import { shuffle } from "../../utils";
const ReactMarkdown = require("react-markdown");

const Wrapper = styled.div`
  width: 100%;
  min-height: 150vh;
  position: fixed;
  z-index: 1;
  overflow: visible;
  top: 0;
  & .bg-img,
  .bg-points  {
    position: absolute;
    opacity: 0;
  }
  & .bg-img {
    width: 278px;
    height: 496px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(1);
    @media (max-width: 960px) {
      transform-origin: left top;
      transform: scale(0.7);
    }
    

  }
  & .bg-img-1 {
    opacity:0.534 !important;
  }
  & .bg-img-4 {
    opacity:0.534 !important;
  }
  & .bg-img-2 {
    opacity:0.534 !important;
  }

  /* & .bg-img-1 {
    left: 20vw;
    top: -18vh;
  }
  & .bg-img-2 {
    left: 70vw;
    top: 20vh;
  }
  & .bg-img-3 {
    left: 85vw;
    top: 50vh;
  }
  & .bg-img-4 {
    left: 13vw;
    top: 80vh;
  }
  & .bg-img-5 {
    left: -10vw;
    top: 30vh;
  } */
  & .bg-img-6,
  .bg-img-7 {
    display: none;
  }
  & .bg-points-1 {
    left: 15vw;
    top: 25vh;
  }
  & .bg-points-2 {
    left: 65vw;
    top: 60vh;
  }
  & .bg-points-3 {
    left: -5vw;
    top: 295vh;
  }
  & .bg-points-4 {
    left: 90vw;
    top: 505vh;
  }
  @media (max-width: 960px) {
    /* & .bg-img-1 {
      display: none;
    } */
    & .bg-img-2 {
      display: none;
    }
    /* & .bg-img-3 {
      left: 55vw;
      top: 60vh;
    } */
    & .bg-img-4 {
      display: none;
    }
    /* & .bg-img-5 {
      display: none;
    } */
    & .bg-points-1 {
      left: -15vw;
      top: 35vh;
    }
    & .bg-points-2 {
      left: 50vw;
      top: 10vh;
    }
    & .bg-points-3 {
      left: -5vw;
      top: 295vh;
    }
    & .bg-points-4 {
      left: 70vw;
      top: 605vh;
    }
    & .bg-points {
      transform: scale(0.7);
    }
  }
`;

const LogoContainer = styled.div`
  display: inline-block;
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
  opacity: 0;
  & img {
    transform: scale(2.4);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

  }
  .imgdowntext {
    font-size: 23.27px;
    position: absolute;
    line-height:31px;
    font-family: "SVN-Miller Banner";
    color: #000;
    text-align:center;
    left: 37%;
    top:58%;
  }

  @media (max-width: 425px) {
    .imgdowntext{
      width: 205px;
      left: 25%;
    }
  }
`;

const ScrollWrapper = styled.div`
  position: fixed;
  top: calc(100vh - 170px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  p {
    font-size: 13px;
    font-family: "SackersGothicStd-Heavy";
    text-transform: lowercase;
    color: #d8d8d8;
  }
  img  {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

function random(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

const setRanPosition = i => {
  let arr = [
    {
      x: { min: 100 * 0.1, max: 100 * 0.4 },
      y: { min: -100 * 0.1, max: 0 }
    },
    {
      x: { min: 100 * 0.6, max: 100 * 0.7 },
      y: { min: 100 * 0.2, max: 100 * 0.4 }
    },
    {
      x: { min: 100 * 0.7, max: 100 * 0.9 },
      y: { min: 100 * 0.5, max: 100 * 0.7 }
    },
    {
      x: { min: 100 * 0.1, max: 100 * 0.3 },
      y: { min: 100 * 0.7, max: 100 * 0.9 }
    },
    {
      x: { min: -100 * 0.1, max: -100 * 0.01 },
      y: { min: 100 * 0.2, max: 100 * 0.4 }
    }
    // {
    //   x: { min: 100 * 0.6, max: 100 * 0.7 },
    //   y: { min: 100 * 0.2, max: 100 * 0.4 }
    // },
    // {
    //   x: { min: 100 * 0.6, max: 100 * 0.7 },
    //   y: { min: 100 * 0.2, max: 100 * 0.4 }
    // }
  ];
  // console.log(arr[i]);
  let ranX = random(arr[i].x.min, arr[i].x.max),
    ranY = random(arr[i].y.min, arr[i].y.max);
  return {
    x: ranX,
    y: ranY
  };
};

function getTranslate(item) {
  var transArr = [];

  if (!window.getComputedStyle) return;
  var style = getComputedStyle(item),
    transform =
      style.transform ||
      style.webkitTransform ||
      style.mozTransform ||
      style.msTransform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(", ")[13]);

  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(", ")[4])) : transArr.push(0);
  mat ? transArr.push(parseFloat(mat[1].split(", ")[5])) : transArr.push(0);

  return transArr;
}

function setImg() {}
function parallax(defaultPos) {
  if (window) {
    let scrollY = window.scrollY;
    if (scrollY >= 0) {
      // if (scrollY < window.innerHeight * 1.5)
      {
        let imgs = [...document.getElementsByClassName("bg-img")];
        gsap.to(imgs, 1, {
          ease: "Power2.easeOut",
          translateY: function(i) {
            // if (
            //   imgs[i].getBoundingClientRect().top + imgs[i].offsetHeight > 0 ||
            //   scrollY <= window.innerHeight * 2
            // ) {
            return -scrollY * 0.2 * (i + 5);
          }
          // }
        });
        gsap.to("#LogoContainerHome", 1, {
          ease: "Power2.easeOut",
          translateY: function(i) {
            return -scrollY * 0.2 * 4;
          }
        });
        gsap.to("#scroll-line", 0.5, {
          translateY: function(i) {
            return -scrollY * 0.5;
          }
        });
        // }
        let points = [...document.getElementsByClassName("bg-points")];
        gsap.to(points, 0.5, {
          translateY: function(i) {
            return -scrollY * 0.17 * (i + 1);
          }
        });
      }
    }
  }
}
function getDefaultPosition() {
  let arr = [];
  let elements = [...document.getElementsByClassName("bg-img")];
  elements.map(item => {
    arr.push({
      x: getTranslate(item)[0],
      y: getTranslate(item)[1]
    });
  });
  return arr;
}

const HomeBackground = (props) => {
  const {  page, lang } = props;
  // console.log("page111",page)
  // const [imgIndex, setImgIndex] = useState([]);
  // let [isImageArray, setIsImageArray] = useState(false);
  // let [img1, setImg1] = useState(null);
  // let ranImgIndex = length => {
  //   if (imgIndex.length <= length) {
  //     let ranIndex;
  //     do {
  //       ranIndex = Math.round(Math.random() * 20);
  //       setImgIndex([...imgIndex, ranIndex]);
  //     } while (imgIndex.findIndex(elem => elem === ranIndex) !== -1);
  //   }
  // };

  let [animActive, setAnimActive] = useState(false);
// const [imageUrl, setimageUrl]= useState(page.home_images);
console.log("image",page.home_images)
  useEffect(() => {
    let imgs = [...document.getElementsByClassName("bg-img")];
    // imgs = imgs.map(r => ({html}))
    // let imgs = [...page.home_images];
    let imgIndex = [];
    let timelines = [];
    imgs.forEach(img => {
      let ranNum = Math.round(Math.random() * page.home_images.length);
      while (imgIndex.findIndex(item => item === ranNum) !== -1) {
        ranNum = Math.round(Math.random() * page.home_images.length);
      }
      imgIndex.push(ranNum);
      img.style.backgroundImage = `url("https://api.daze-mgmt.com${page.home_images[ranNum]?.url }")`;
    });
    gsap.set(imgs, {
      left: 0,
      top: 0
      // x: i => setRanPosition(i).x,
      // y: i => setRanPosition(i).y
    });
    gsap.to([".bg-points"], 0.5, {
      autoAlpha: 1,
      delay: 0.7
    });
    imgs.forEach((img, index) => {
      let tl = gsap
        .timeline({ repeat: -1 })
        .to(img, 0.1, {
          left: setRanPosition(index).x + "vw",
          top: setRanPosition(index).y + "vh",
          onComplete: () => {
            let ranNum = Math.round(Math.random() * page.home_images.length);
            while (imgIndex.findIndex(item => item === ranNum) !== -1) {
              ranNum = Math.round(Math.random() * page.home_images.length);
            }
            imgIndex[index] = ranNum;
            // setImgIndex(indexArray);
            img.style.backgroundImage = `url("https://api.daze-mgmt.com${page.home_images[ranNum]?.url }")`;
          }
        })
        .to(img, 0.5, {
          autoAlpha: 1,
          // delay: 1
        })
        .to(
          img,
          0.5,
          {
            delay: i => Math.round(Math.random() * 30) / 10,
            autoAlpha: 0
            // onCompleteParams: [imgIndex, index],
          },
          ">"
        )

        .to(img, 0.1, {
          left: setRanPosition(index).x + "vw",
          top: setRanPosition(index).y + "vh",
          onComplete: () => {
            let ranNum = Math.round(Math.random() *  page.home_images.length);
            while (imgIndex.findIndex(item => item === ranNum) !== -1) {
              ranNum = Math.round(Math.random() *  page.home_images.length);
            }
            imgIndex[index] = ranNum;
            // setImgIndex(indexArray);
             img.style.backgroundImage = `url("https://api.daze-mgmt.com${page.home_images[ranNum]?.url }")`;
          }
        })
        .to(img, 0.5, {
          autoAlpha: 1,
          delay: 0.5
        })
        .to(
          img,
          0.5,
          {
            delay: i => Math.round(Math.random() * 30) / 10 + 3,
            autoAlpha: 0
            // onCompleteParams: [imgIndex, index],
          },
          ">"
        );
      timelines.push(tl);
    });
    return () => {
      timelines.forEach(tl => {
        tl.pause();
        // console.log(tl.paused());
      });
    };
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const onScroll = e => {
    e.preventDefault();
    // animateImage();
    if (window.scrollY > window.innerHeight * 0.3) {
      setScrolled(true);
      // gsap.to("#LogoContainerHome", 0.5, {
      //   ease: "Power2.easeOut",
      //   autoAlpha: 0
      // });
      gsap.to("#LogoContainerHeader", 0.5, {
        ease: "Power2.easeOut",
        autoAlpha: 1
      });
      gsap.to("#scroll-line", 0.7, {
        ease: "Power2.easeOut",
        autoAlpha: 0
      });
      gsap.to("#HomeHeaderContainer", 0.7, {
        ease: "Power2.easeOut",
        background: "rgba(255,255,255,1)"
      });
    } else if (window.scrollY <= window.innerHeight * 0.3) {
      setScrolled(false);
      // gsap.to("#LogoContainerHome", 0.5, {
      //   ease: "Power2.easeOut",
      //   autoAlpha: 1
      // });
      gsap.to("#LogoContainerHeader", 0.5, {
        ease: "Power2.easeOut",
        autoAlpha: 0
      });
      gsap.to("#scroll-line", 0.7, {
        ease: "Power2.easeOut",
        autoAlpha: 1
      });
      gsap.to("#HomeHeaderContainer", 0.7, {
        ease: "Power2.easeOut",
        background: "rgba(255,255,255,0)"
      });
    } else if (window.scrollY !== 0) {
    } else if (window.scrollY === 0) {
    }
  };

  // useEffect(() => {
  //   let imgs = [...document.getElementsByClassName("bg-img")];
  //   let tl = gsap.timeline({ repeat: -1 });
  //   console.log(scrolled)
  //   if (!scrolled) {
  //     tl.to(imgs, 2, {
  //       y: -20
  //       // duration: function(i) {
  //       //   return i * 100 + 1000;
  //       //
  // };
  //     });
  //     tl.to(imgs, 2, {
  //       y: 0
  //       // duration: function(i) {
  //       //   return i * 100 + 1000;
  //       // }
  //     });
  //   } else {
  //     tl.pause();
  //   }
  // }, [scrolled]);

  useEffect(() => {
    let imgs = [...document.getElementsByClassName("bg-img")];
    // imgs.forEach((img, i) => {
    //   img.style.backgroundImage = `url("/assets/images/home_background/Photo HP${Math.round(
    //     Math.random() * 20
    //   )}.jpg")`;
    // });
    // setImg();
    const throttled = e =>
      requestAnimationFrame(() => {
        e.preventDefault();
        parallax();
      });
    // const throttled = () => parallax();
    gsap.set(imgs, {
      left: i => `${setRanPosition(i).x}vw`,
      top: i => `${setRanPosition(i).y}vh`
    });
    gsap.set("#HomeHeaderContainer", {
      ease: "Power2.easeOut",
      background: "rgba(255,255,255,0)"
    });
    gsap.to("#LogoContainerHeader", 0.5, { autoAlpha: 0, delay: 0.5 });
    gsap.to("#LogoContainerHome", 0.5, { autoAlpha: 1, delay: 0.5 });

    gsap.to("#scroll-line", 0.5, {
      autoAlpha: 1,
      delay: 0.5
    });

    window.addEventListener("scroll", throttled);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", throttled);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <Wrapper>
      <img
        className="bg-points-1 bg-points "
        src="/assets/images/square-points.png"
        alt=""
      />
      <img
        className="bg-points-2 bg-points"
        src="/assets/images/square-points.png"
        alt=""
      />
      <img
        className="bg-points-3 bg-points"
        src="/assets/images/square-points.png"
        alt=""
      />
      <img
        className="bg-points-4 bg-points"
        src="/assets/images/square-points.png"
        alt=""
      />
      <div
        className="bg-img bg-img-1"
        // style={{
        //   backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[0]}.jpg")`
        // }}
        alt=""
      />
      <div
        className="bg-img bg-img-2"
        // style={{
        //   backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[1]}.jpg")`
        // }}
        alt=""
      />
      <div
        className="bg-img bg-img-3"
        // style={{
        //   backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[2]}.jpg")`
        // }}
        alt=""
      />
      <div
        className="bg-img bg-img-4"
        // style={{
        //   backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[3]}.jpg")`
        // }}
        alt=""
      />
      <div
        className="bg-img bg-img-5"
        // style={{
        //   backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[4]}.jpg")`
        // }}
        alt=""
      />
      {/* <div
        className="bg-img bg-img-6"
        style={{
          backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[5]}.jpg")`
        }}
        alt=""
      />
      <div
        className="bg-img bg-img-7"
        style={{
          backgroundImage: `url("/assets/images/home_background/Photo HP${imgIndex[6]}.jpg")`
        }}
        alt=""
      /> */}
      <LogoContainer id="LogoContainerHome">
        <img src="/assets/svg/daze-icon.svg" alt="" />
        {/* <p>Data</p> */}
        <p className="imgdowntext">
          <ReactMarkdown source={lang === 'en' ? page.home_title_en : page.home_title_fr} />
          </p>
      </LogoContainer>
      <ScrollWrapper id="scroll-line">
        <p>scroll down</p>
        <img src="/assets/svg/scroll-line.svg" alt="" />
      </ScrollWrapper>
    </Wrapper>
  );
};

export default HomeBackground;
