import React, { Component, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import translations from "./locale";
import { nFormatter } from "../../utils";

const Wrapper = styled.div`
  width: 307px;
  height: 369px;
  position: absolute;
  top: 25px;
  right: 0;
  z-index: 9999;
  display: flex;
  opacity: 0;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  & span {
    width: 10px;
    height: 0;
    margin: 35px 7.5px;
    border-top: 1px solid #d7d7d7;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  & p {
    pointer-events: none;
  }
  & input[name="min"] + #list-min {
    p {
      pointer-events: none;
    }
  }
  /* & input:focus[name="min"] + #list-min {
    opacity: 1;
  }
  & input:focus[name="max"] + #list-max {
    opacity: 1;
  } */
`;

const List = styled.div`
  position: relative;
  color: #000;
  /* opacity: 0; */
  transition: opacity 0.2s ease;
  & p {
    text-align: left;
    margin: 0;
    cursor: pointer;
    line-height: 32px;
    text-transform: uppercase;
    font-family: "Avenir Next";
    font-weight: 600;
    font-size: 12px;
  }
`;

const Input = styled.input`
  width: 113px;
  height: 39px;
  margin: 14px 0;
  border: 1px solid #d7d7d7;
  border-radius: 0;
  box-shadow: none;
  padding-left: 10px;
  font-family: "Avenir Next";
  font-weight: 600;
  font-size: 12px;
  outline: none;
  @media (max-width: 960px) {
    font-size: 16px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 51px);
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  background: #fff;
  border-left: 1px solid #d7d7d7;
  border-top: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
`;

const EraseCross = styled.div`
  cursor: pointer;
  width: 9px;
  height: 39px;
  background-image: url("/assets/svg/cross-input.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  right: 10px;
  top: 16px;
`;

const Submit = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #d7d7d7;
  background: #fff;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  font-family: "SackersGothicStd-Heavy";
  font-size: 14px;
  color: #000;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border 0.2s ease;
  &:hover {
    color: #fff;
    border: 1px solid #000;
    background: #000;
  }
`;

const Filter = (props, lang) => {
  const FilterBox = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const listFilter = [10000, 20000, 40000, 50000, 100000, 250000, 500000];

  const handleClick = (e) => {
    if (
      FilterBox.current.contains(e.target) &&
      e.target.id !== "filter-button"
    ) {
      return props.setFilterOpen(true);
    }
    props.setFilterOpen(false);
  };
  // const [min, setMin] = useState(props.filter.min || null);
  // const [max, setMax] = useState(props.filter.max || null);
  // const [filter, setFilter] = useState({ min: null, max: null });

  const max = props.filter.max,
    min = props.filter.min;

  const setMin = (n) => {
    props.setFilter({
      min: n,
      max: props.filter.max,
    });
  };
  const setMax = (n) => {
    props.setFilter({
      max: n,
      min: props.filter.min,
    });
  };

  useEffect(() => {
    // console.log("minUpdate: ", min, max);
    if (min === "" || min === undefined) {
      setMin(null);
    }
    // if (min > max && min !== "" && min !== null && max !== null && max !== "") {
    //   setMin(max - 10000);
    // }
  }, [min]);

  useEffect(() => {
    // console.log("maxUpdate: ", min, max);
    if (max === "" || max === undefined) {
      setMax(null);
    }
    // if (min > max && max !== "" && max !== null && min !== "" && min !== null) {
    //   setMax(min);
    // }
  }, [max]);

  const handleSubmit = () => {
    // console.log(min, max);
    props.setFilterOpen(false);
    return props.setFilter({
      min: min,
      max: max,
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "min") {
      if (
        e.target.value === "" ||
        e.target.value === undefined ||
        e.target.value === null
      ) {
        setMin(null);
      } else {
        setMin(Number(e.target.value));
      }
    } else if (e.target.name === "max") {
      if (
        e.target.value === "" ||
        e.target.value === undefined ||
        e.target.value === null
      ) {
        setMax(null);
      } else {
        setMax(Number(e.target.value));
      }
    }
  };

  const handleKeyPressed = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
      e.target.blur();
    }
  };

  return (
    <Wrapper id="FilterBox" ref={FilterBox}>
      <Content>
        <InputContainer>
          <InputWrapper>
            <Input
              autoComplete="off"
              placeholder="MIN"
              type="number"
              pattern="\d*"
              name="min"
              value={min || ""}
              onChange={handleChange}
              onKeyDown={handleKeyPressed}
            />
            {min !== null && (
              <EraseCross onClick={() => setMin("")}></EraseCross>
            )}

            <List id="list-min">
              {listFilter.map((item) => (
                <p
                  style={{
                    opacity: min && min !== item ? 0.5 : 1,
                    pointerEvents: max && max <= item ? "none" : "auto",
                  }}
                  onClick={() => setMin(item)}
                  className="choice-min"
                >{`${nFormatter(item)}+`}</p>
              ))}
            </List>
          </InputWrapper>
          <span></span>
          <InputWrapper>
            <Input
              autoComplete="off"
              placeholder="MAX"
              type="number"
              pattern="\d*"
              name="max"
              value={max || ""}
              onChange={handleChange}
              onKeyDown={handleKeyPressed}
            />
            {max !== null && (
              <EraseCross onClick={() => setMax("")}></EraseCross>
            )}

            <List id="list-max">
              {listFilter.map((item) => (
                <p
                  style={{
                    opacity: max && max !== item ? 0.5 : 1,
                    pointerEvents: min && min >= item ? "none" : "auto",
                  }}
                  onClick={() => setMax(item)}
                  className="choice-max"
                >{`${nFormatter(item)}`}</p>
              ))}
            </List>
          </InputWrapper>
        </InputContainer>
      </Content>
      <Submit onClick={handleSubmit}>{translations[props.lang].donebtn}</Submit>
    </Wrapper>
  );
};

export default Filter;
