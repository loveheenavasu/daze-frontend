import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm, useField, splitFormProps } from "react-form";

const SelectWrapper = styled.div`
  position: relative;
  width: 50%;
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
  height: 55px;

  transition: border 0.2s ease, height 0.2s ease;
  z-index: 110;
  cursor: pointer;
  & span {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 5px 0 5px;
    border-color: #000 transparent transparent transparent;
    transition: transform 0.2s ease-in-out;
  }
  &:hover {
    z-index: 110;
    outline: none;
    /* border: 1px solid #000; */
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
  border: 1px solid #000;
  position: relative;
  transition: border 0.2s ease, height 0.2s ease;
  text-align: left;
  /* & div:nth-child(n + 2) {
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
  } */
  &:hover {
    border: 1px solid #000;
  }
  & div {
    font-size: 16px;
    font-family: "Avenir Next";
    font-weight: 400;
    line-height: 29px;
    padding: 13px 24px;
    &:hover {
    }
  }
`;

const Error = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  font-size: 14px;
  font-family: "Avenir Next";
  font-weight: 400;
  color: #ff3f3f;
`;

const SelectContainer = props => {
  const [field, fieldOptions, { options, ...rest }] = splitFormProps(props);
  const [selectValue, setSelectValue] = useState(options[0]);
  const [selectOpen, setSelectOpen] = useState(false);

  function validateSelectField(value) {
    if (!value) {
      return error;
    }
    return false;
  }
  const {
    value = "",
    setValue,
    meta: { error, isTouched }
  } = useField(field, { ...fieldOptions, validate: validateSelectField });

  const handleSelectChange = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleOptionsClick(selectValue);
  }, []);

  const handleOptionsClick = option => {
    setSelectValue(option);
    props.setIsBrand(option.value);
    setValue(option.value);
  };

  useEffect(() => {
    var specifiedElement = document.getElementById("custom-select");
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
    <SelectWrapper style={props.style}>
      <Select {...rest} value={selectValue.value} onChange={handleSelectChange}>
        {options.map(option => (
          <option key={option.text} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>{" "}
      <CustomSelect>
        <OptionsWrapper
          onClick={() => setSelectOpen(!selectOpen)}
          style={{ height: selectOpen ? 112 : 55 }}
          id="custom-select"
        >
          {options.map(option => (
            <div
              style={{
                pointerEvents: selectOpen ? "auto" : "none",
                order: selectValue.value === option.value ? 1 : 2
              }}
              onClick={() => handleOptionsClick(option)}
            >
              {option.text}
            </div>
          ))}
        </OptionsWrapper>
        <span
          style={{ transform: !selectOpen ? "rotate(0)" : "rotate(180deg)" }}
        ></span>
      </CustomSelect>
      {isTouched && error ? <Error>{error}</Error> : null}
    </SelectWrapper>
  );
};

export default SelectContainer;
