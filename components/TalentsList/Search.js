import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { nFormatter } from "../../utils";
import translations from "./locale";
import { useRouter } from "next/router";

import Filter from "./Filter";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  top: 79px;
  z-index: 9999;
  background: #fff;
  /* padding: 10px 100px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 960px) {
    padding: 0px 20px;
    width: calc(100% - 40px);
    height: 100px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
  @media (max-width: 960px) {
    margin-left: 0;
  }
`;

const Input = styled.input`
  width: 350px;
  border: none;
  font-size: 30px;
  font-family: "Avenir Next";
  font-weight: 300;
  outline: none;
  margin-left: 15px;
  color: #959595;
`;

const FilterWrapper = styled.div`
  display: flex;
  margin-right: 100px;

  @media (max-width: 960px) {
    display: flex;
    justify-content: space-between;
    margin-right: 0;
    width: 100%;
  }
`;

const FilterButton = styled.div`
  position: relative;
  line-height: 1;
  color: #000;
  display: flex;
  align-items: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  &#sort-button {
    cursor: pointer;
    font-family: "SackersGothicStd-Heavy";
    font-size: 14px;
  }
  & img {
    margin-right: 10px;
  }
  & div#filter-button {
    cursor: pointer;
    font-family: "Avenir Next";
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    span {
      font-family: "SackersGothicStd-Heavy";
      font-size: 14px;
      text-transform: lowercase;
    }
  }

  & #triangle {
    position: absolute;
    right: -10px;
    top: 0;
    bottom: 0;
    width: 0;
    margin: auto 0;
    height: 0;
    border-style: solid;
    border-width: 4px 3px 0 3px;
    border-color: #000000 transparent transparent transparent;
  }
`;
let lastScrollY = 0;
const searchToTop = () => {
  if (window) {
    let scrollY = window.scrollY;
    // console.log(scrollY);
    if ((scrollY > 0 && scrollY < lastScrollY) || scrollY === 0) {
      gsap.to("#search-wrapper", 0.2, {
        translateY: 0,
        ease: "Power.easeIn",
      });
      gsap.to("#HomeHeaderContainer", 0.2, {
        translateY: 0,
        ease: "Power.easeIn",
      });
    } else if (scrollY > lastScrollY && scrollY > 0) {
      gsap.to("#search-wrapper", 0.2, {
        translateY: -79,
        ease: "Power.easeIn",
      });
      gsap.to("#HomeHeaderContainer", 0.2, {
        translateY: -79,
        ease: "Power.easeIn",
      });
    }
    lastScrollY = scrollY;
  }
};

const Search = (props) => {
  const router = useRouter();
  const { lang, search } = props;
  const handleClickSort = () => {
    // console.log(props.sortAlph);
    // props.setAlphabetically();
    if (props.sortAlph === null || props.sortAlph === false) {
      props.setSort(true);
    } else if (props.sortAlph === true) {
      props.setSort(false);
    }
  };

  const [filterOpen, setFilterOpen] = useState(false);
  useEffect(() => {
    // console.log(filterOpen);
    if (filterOpen) {
      gsap.to("#FilterBox", 0.2, {
        autoAlpha: 1,
        ease: "Power.easeIn",
      });
    } else if (!filterOpen) {
      gsap.to("#FilterBox", 0.2, {
        autoAlpha: 0,
        ease: "Power.easeIn",
      });
    }
  }, [filterOpen]);

  const handleClick = () => {
    if (filterOpen) {
      setFilterOpen(false);
    } else if (!filterOpen) {
      setFilterOpen(true);
    }
  };

  useEffect(() => {
    const throttled = (e) =>
      requestAnimationFrame(() => {
        e.preventDefault();
        searchToTop();
      });
    window.addEventListener("scroll", throttled);
    return () => {
      window.removeEventListener("scroll", throttled);
    };
  });

  return (
    <Wrapper id="search-wrapper">
      <InputWrapper>
        <img src="/assets/svg/search.svg" alt="" />
        <Input
          placeholder={translations[lang].search}
          onChange={(e) => props.setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (event.keyCode === 13) {
              e.target.blur();
            }
          }}
          value={search}
        ></Input>
      </InputWrapper>
      <FilterWrapper>
        <FilterButton
          style={{
            opacity: props.sortAlph === null ? 0.5 : 1,
            marginRight: 30,
          }}
          onClick={handleClickSort}
          id="sort-button"
        >
          <img
            style={{
              transform:
                props.sortAlph === false ? "rotate(180deg)" : "rotate(0)",
            }}
            src="/assets/svg/arrow-down.svg"
            alt=""
          />
          <span>a-z</span>
        </FilterButton>
        <FilterButton id="filter">
          <div
            id="filter-button"
            style={{ pointerEvents: filterOpen ? "none" : "auto" }}
            onClick={handleClick}
          >
            {props.filter.min === null && props.filter.max === null ? (
              <span>{translations[lang].filter}</span>
            ) : props.filter.min !== null && props.filter.max === null ? (
              nFormatter(props.filter.min) + " >"
            ) : props.filter.min === null && props.filter.max !== null ? (
              "> " + nFormatter(props.filter.max)
            ) : (
              nFormatter(props.filter.min) +
              " - " +
              nFormatter(props.filter.max)
            )}
            <div id="triangle" />
          </div>
          <Filter
            setFilter={props.setFilter}
            filter={props.filter}
            setFilterOpen={(bool) => setFilterOpen(bool)}
          ></Filter>
        </FilterButton>
      </FilterWrapper>
    </Wrapper>
  );
};

export default Search;
