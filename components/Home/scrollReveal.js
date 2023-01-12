import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { nFormatter } from "../../utils";

let myObject = {
  totalValue: 0
};

const ScrollReveal = props => {
  const ref = useRef(null);
  let [defaultNumber, setNumber] = useState(0);
  let [reveal, setReveal] = useState(false);
  let scrollHandler = e => {
    let elem = document.getElementById(props.id);
    e.preventDefault();
    // console.log(window.scrollY);
    if (
      elem.getBoundingClientRect().top -
        window.innerHeight +
        elem.offsetHeight <
        0 &&
      reveal === false
    ) {
      setReveal(true);
    }
  };
  useEffect(() => {
    if (reveal === true) {
      gsap.to(myObject, 1, {
        totalValue: props.number,
        roundProps: "totalValue",
        onUpdate: () => {
          setNumber(myObject.totalValue);
        },
        esae: "Power2.easeOut"
      });
    }
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [reveal]);
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    // return () => ;
  }, []);
  return nFormatter(defaultNumber, props.digit);
};

export default ScrollReveal;
