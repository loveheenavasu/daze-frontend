import React from "react";
import gsap from "gsap";

export const LinkedinLogo = (props) => {
  const mouseEnter = (e) => {
    e.preventDefault();
    gsap.to(".linkedin-fill", 0.2, {
      fill: "#000",
    });
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    gsap.to(".linkedin-fill", 0.2, {
      fill: "#959595",
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

export const InstagramLogo = (props) => {
  const mouseEnter = (e) => {
    e.preventDefault();
    gsap.to(".insta-stroke", 0.2, {
      stroke: "#000",
    });
    gsap.to(".insta-fill", 0.2, {
      fill: "#000",
    });
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    gsap.to(".insta-stroke", 0.2, {
      stroke: "#959595",
    });
    gsap.to(".insta-fill", 0.2, {
      fill: "#959595",
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

export const TwitterLogo = (props) => {
  const mouseEnter = (e) => {
    e.preventDefault();
    gsap.to(".twitter-fill", 0.2, {
      fill: "#000",
    });
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    gsap.to(".twitter-fill", 0.2, {
      fill: "#959595",
    });
  };
  return (
    <svg
      width="15"
      {...props}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="twitter-fill"
        d="M12.536 3.63656C12.4245 3.57724 12.316 3.51222 12.2108 3.44173C11.9049 3.2336 11.6244 2.98836 11.3754 2.7113C10.7525 1.97768 10.5198 1.23344 10.4341 0.712363H10.4376C10.366 0.279844 10.3956 0 10.4 0H7.56265V11.2922C7.56265 11.4439 7.56265 11.5937 7.55645 11.7418C7.55645 11.7602 7.55473 11.7772 7.5537 11.797C7.5537 11.8052 7.5537 11.8137 7.55198 11.8222C7.55198 11.8243 7.55198 11.8264 7.55198 11.8286C7.52207 12.2337 7.39588 12.6251 7.1845 12.9683C6.97313 13.3115 6.68305 13.596 6.33979 13.7967C5.98203 14.0062 5.5774 14.116 5.1658 14.1155C3.84381 14.1155 2.77239 13.006 2.77239 11.6359C2.77239 10.2657 3.84381 9.15622 5.1658 9.15622C5.41604 9.15598 5.66475 9.19651 5.90268 9.2763L5.90612 6.30287C5.18382 6.20684 4.45002 6.26592 3.75101 6.47639C3.052 6.68685 2.40296 7.04413 1.84483 7.52568C1.35578 7.96302 0.944626 8.48484 0.629883 9.06766C0.510109 9.2802 0.0582045 10.1343 0.00348027 11.5204C-0.0309375 12.3071 0.198629 13.1222 0.308077 13.4591V13.4662C0.376913 13.6645 0.64365 14.3415 1.07835 14.9122C1.42887 15.3699 1.843 15.772 2.3074 16.1056V16.0985L2.31429 16.1056C3.6879 17.0662 5.21088 17.0032 5.21088 17.0032C5.47452 16.9922 6.35768 17.0032 7.36062 16.514C8.473 15.9717 9.10628 15.1637 9.10628 15.1637C9.51086 14.6809 9.83256 14.1307 10.0576 13.5367C10.3143 12.842 10.4 12.0089 10.4 11.6759V5.68509C10.4345 5.70634 10.8929 6.01842 10.8929 6.01842C10.8929 6.01842 11.5534 6.45413 12.5838 6.73787C13.3231 6.93978 14.3192 6.98229 14.3192 6.98229V4.08325C13.9702 4.12221 13.2615 4.00886 12.536 3.63656Z"
        fill="#959595"
      />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="31.3535"
        y1="2.06642"
        x2="1.06629"
        y2="32.3536"
        stroke="black"
        stroke-width="1.20655"
        stroke-linecap="round"
      />
      <line
        x1="0.853161"
        y1="1"
        x2="31.1404"
        y2="31.2872"
        stroke="black"
        stroke-width="1.20655"
        stroke-linecap="round"
      />
    </svg>
  );
};
