import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm, useField, splitFormProps } from "react-form";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  display: none;
  visibility: hidden;
  width: calc(100% - 48px);
`;

const CustomSelect = styled.div`
  background-color: #fff;
  border-radius: 0;
  position: relative;
  height: 42px;

  transition: border 0.2s ease, height 0.2s ease;
  z-index: 110;
  cursor: pointer;
  & span {
    position: absolute;
    right: 25px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 4px 0 4px;
    border-color: #959595 transparent transparent transparent;
    transition: transform 0.2s ease-in-out, background-color 0.2s ease;
  }
  &:hover {
    z-index: 110;
    outline: none;
    span {
      border-color: #000 transparent transparent transparent;
    }
    > div {
      border: 1px solid #000;
      div {
        color: #000;
      }
    }
    /* border: 1px solid #959595; */
  }
  &:active {
  }
`;

const OptionsWrapper = styled.div`
  width: calc(100% - 1px);
  display: flex;
  overflow: hidden;
  background-color: #fff;
  flex-direction: column;
  border: 1px solid #959595;
  position: relative;
  transition: border 0.2s ease, height 0.2s ease;
  text-align: left;
  /* & div:nth-child(n + 2) {
    border-left: 1px solid #959595;
    border-bottom: 1px solid #959595;
    border-right: 1px solid #959595;
  } */
  &:hover {
  }
  & div {
    font-size: 13px;
    font-family: "SackersGothicStd-Heavy";
    font-weight: 500;
    padding: 13px 24px;
    color: #959595;
    transition: color 0.2s ease;
    &:hover {
    }
  }
`;

const SelectContainer = props => {
  const { options, lang, setLang, id } = props;
  const defaultLang = options.find(item => item.value === lang);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(lang);

  const handleOptionsClick = option => {
    setSelectValue(option.value);
    setLang(option.value);
  };

  useEffect(() => {
    var specifiedElement = document.getElementById(id);
    let clickHandler = event => {
      var isClickInside = specifiedElement.contains(event.target);
      if (!isClickInside) {
        setSelectOpen(false);
      }
    };
    //I'm using "click" but it works with any event
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <SelectWrapper>
      <CustomSelect>
        <OptionsWrapper
          onClick={() => setSelectOpen(!selectOpen)}
          style={{ height: selectOpen ? 84 : 42 }}
          id={id}
        >
          {options.map(option => (
            <div
              style={{
                pointerEvents: selectOpen ? "auto" : "none",
                order: selectValue === option.value ? 1 : 2
              }}
              onClick={() => handleOptionsClick(option)}
            >
              {option.text}
            </div>
          ))}
        </OptionsWrapper>
        <span
          onClick={() => setSelectOpen(!selectOpen)}
          style={{ transform: !selectOpen ? "rotate(0)" : "rotate(180deg)" }}
        ></span>
      </CustomSelect>
    </SelectWrapper>
  );
};

export default SelectContainer;
