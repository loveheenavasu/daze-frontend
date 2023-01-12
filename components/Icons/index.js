import React from "react";
import gsap from "gsap";

export const LinkedinLogo = props => {
  const mouseEnter = e => {
    e.preventDefault();
    gsap.to(".linkedin-fill", 0.2, {
      fill: "#000"
    });
  };
  const mouseLeave = e => {
    e.preventDefault();
    gsap.to(".linkedin-fill", 0.2, {
      fill: "#959595"
    });
  };
  return (
    <svg
      width={19}
      height={19}
      {...props}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <path
        className="linkedin-fill"
        d="M17.1 0H1.9C.855 0 0 .855 0 1.9v15.2C0 18.145.855 19 1.9 19h15.2c1.045 0 1.9-.855 1.9-1.9V1.9C19 .855 18.145 0 17.1 0zM5.7 16.15H2.85V7.6H5.7v8.55zM4.275 5.985c-.95 0-1.71-.76-1.71-1.71s.76-1.71 1.71-1.71 1.71.76 1.71 1.71-.76 1.71-1.71 1.71zM16.15 16.15H13.3v-5.035c0-.76-.665-1.425-1.425-1.425s-1.425.665-1.425 1.425v5.035H7.6V7.6h2.85v1.14c.475-.76 1.52-1.33 2.375-1.33 1.805 0 3.325 1.52 3.325 3.325v5.415z"
        fill="#959595"
        fillRule="nonzero"
      />
    </svg>
  );
};

export const InstagramLogo = props => {
  const mouseEnter = e => {
    e.preventDefault();
    gsap.to(".insta-stroke", 0.2, {
      stroke: "#000"
    });
    gsap.to(".insta-fill", 0.2, {
      fill: "#000"
    });
  };
  const mouseLeave = e => {
    e.preventDefault();
    gsap.to(".insta-stroke", 0.2, {
      stroke: "#959595"
    });
    gsap.to(".insta-fill", 0.2, {
      fill: "#959595"
    });
  };
  return (
    <svg
      width={20}
      height={21}
      {...props}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <g
        stroke="#959595"
        transform="translate(1 1.5)"
        fill="none"
        fillRule="evenodd"
      >
        <rect
          className="insta-stroke"
          strokeWidth={1.782}
          width={17.865}
          height={17.982}
          rx={4.632}
        />
        <ellipse
          className="insta-stroke"
          strokeWidth={1.782}
          cx={8.958}
          cy={9.07}
          rx={4.271}
          ry={4.324}
        />
        <ellipse
          className="insta-fill"
          fill="#959595"
          cx={14.193}
          cy={3.691}
          rx={1.25}
          ry={1.266}
        />
      </g>
    </svg>
  );
};
