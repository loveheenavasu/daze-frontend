import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useForm, useField, splitFormProps } from "react-form";
import translations from "./locale";

import SelectField from "./customSelect";

const InputWrapper = styled.div`
  position: relative;
  width: 50%;
  & input[type="text"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
  }
  & textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
  }
`;

const Button = styled.button`
  display: inline-block;
  position: relative;
  border: 1px solid #000;
  align-self: center;
  background-color: #fff;
  display: inline-block;
  padding: 20px 40px;
  text-decoration: none;
  color: #000;
  font-family: "SackersGothicStd-Heavy";
  font-size: 14px;
  transition: color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
    /* transform: scale(1.05); */
  }
  @media (max-width: 960px) {
    margin: 50px 0;
  }
`;

const Input = styled.input`
  width: calc(100% - 48px);
  position: relative;
  font-size: 16px;
  font-family: "Avenir Next";
  font-weight: 400;
  margin: 0;
  line-height: 29px;
  padding: 13px 24px;
  border: 1px solid ${({ error }) => (error ? "#ff3f3f" : "#d2d2d2")};
  transition: border 0.2s ease;
  z-index: ${({ error }) => (error ? "99" : "9")};
  /* ::-webkit-input-placeholder,
  :-ms-input-placeholder, */
  ::placeholder {
    /* Edge */
    color: ${({ error }) => (error ? "#ff3f3f" : "#979797")};
  }
  &:focus {
    z-index: 9999;
    outline: none;
    border: 1px solid #000;
    ::placeholder {
      /* Edge */
      color: #979797;
    }
  }
`;

const TextArea = styled.textarea`
  width: calc(100% - 48px);
  resize: vertical;
  height: 226px;
  min-height: 226px;
  position: relative;
  font-size: 16px;
  font-family: "Avenir Next";
  font-weight: 400;
  line-height: 29px;
  padding: 13px 24px;
  border: 1px solid ${({ error }) => (error ? "#ff3f3f" : "#d2d2d2")};
  transition: border 0.2s ease;
  z-index: ${({ error }) => (error ? "99" : "9")};
  /* ::-webkit-input-placeholder,
  :-ms-input-placeholder, */
  ::placeholder {
    /* Edge */
    color: ${({ error }) => (error ? "#ff3f3f" : "#979797")};
  }
  &:focus {
    z-index: 9999;
    outline: none;
    border: 1px solid #000;
    ::placeholder {
      /* Edge */
      color: #979797;
    }
  }
`;

const Error = styled.div`
  position: absolute;
  bottom: -17px;
  left: 5px;
  text-align: left;
  font-size: 10px;
  font-family: "Avenir Next";
  font-weight: 400;
  color: #ff3f3f;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
    & > div:nth-child(0n + 2) {
      margin-top: 20px;
    }
  }
`;

const sendEmail = async (data) => {
  let postUrl = "https://api.daze-mgmt.com/email";
  let emailDeffault = "contact@daze-mgmt.com";
  // let emailDeffault = "";
  let html = "";
  let body = "";
  data.body.split("\n").map((item) => (body = body + `<p>${item}</p>`));
  // console.log(data.body.split("\n"));
  if (data.isBrand) {
    html = `<h1>${data.firstname} ${data.lastname} de ${
      data.brand_name
    } vous a contacté .</h1>
      <p>Email: ${data.email}</p>
      ${data.phonenumber ? `<p>Telephone: ${data.phonenumber}</p>` : ""}
      <h3>Message: </h3>
      ${body}
      `;
  } else if (!data.isBrand) {
    html = `<h1>${data.firstname} ${data.lastname} vous a contacté .</h1>
      <p>instagram: <a href="https://www.instagram.com/${data.instagram_id}">${
      data.instagram_id
    }</a></p> 
      <p>Location: ${data.location}</p>
      <p>Email: ${data.email}</p>
      ${data.phonenumber ? `<p>Telephone: ${data.phonenumber}</p>` : ""}
      <h3>Message: </h3>
      ${body}
  `;
  }
  const dataToSend = {
    replyTo: data.email,
    to: emailDeffault,
    from: emailDeffault,
    subject: data.subject,
    html: html,
  };
  // console.log(dataToSend);
  let response = await axios.post(postUrl, dataToSend);
  return new Promise((resolve, reject) => {
    resolve(response);
  });
};

async function sendToFakeServer(values) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return values;
}

function validateEmailField(value, lang) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return translations[lang].errorMail;
  }
  return false;
}

function validateInputField(value, error) {
  // console.log(value);
  if (!value) {
    return " ";
  }
  return false;
}

function InputField(props) {
  const {
    placeholder,
    name,
    errorText,
    type,
    required,
    style,
    lang,
    subject,
  } = props;
  const options = required
    ? {
        validate:
          name === "email"
            ? (a) => validateEmailField(a, lang)
            : validateInputField,
      }
    : {};
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(name, options);
  return (
    <InputWrapper style={style}>
      <Input
        {...getInputProps()}
        error={required ? error : false}
        type={type}
        placeholder={placeholder}
        type="text"
        value={subject}
      />{" "}
      {required && isTouched && error ? <Error>{error}</Error> : null}
    </InputWrapper>
  );
}

function TextAreaField(props) {
  const { placeholder, name, errorText, type, required, style } = props;
  const options = required
    ? {
        validate: (name) => validateInputField(name, errorText),
      }
    : {};
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(name, options);
  return (
    <InputWrapper style={style}>
      <TextArea
        {...getInputProps()}
        error={required ? error : false}
        placeholder={placeholder}
      />{" "}
      {required && isTouched && error ? <Error>{error}</Error> : null}
    </InputWrapper>
  );
}

const MyForm = ({ lang, subject }) => {
  const [isBrand, setIsBrand] = useState(true);
  const [sendingError, setSendingError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(null);
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      await sendEmail(values)
        .then((res) => {
          console.log("mail issend");
          setIsSubmit(true);
        })
        .catch((err) => setSendingError(err));

      // console.log("Huzzah!");
    },
    // debugForm: trueus
  });
  useEffect(() => {
    console.log("error: ", sendingError);
  }, [sendingError]);
  return (
    <Form>
      <Row style={{ marginBottom: 45 }}>
        <SelectField
          field="isBrand"
          setIsBrand={setIsBrand}
          options={[
            { text: translations[lang].brand, value: true },
            { text: translations[lang].talent, value: false },
          ]}
          validate={(value) => (!value ? "This is required!" : false)}
        ></SelectField>
        {isBrand ? (
          <InputField
            placeholder={`${translations[lang].brand_name}*`}
            name="brand_name"
            required
            errorText="Brand Name is required !"
          />
        ) : (
          <InputField
            placeholder={`${translations[lang].talent_insta}*`}
            name="instagram_id"
            required
            errorText="Instagram Handle is required !"
          />
        )}
      </Row>
      <Row>
        <InputField
          placeholder={`${translations[lang].firstname}*`}
          name="firstname"
          required
          errorText="First Name is required !"
        />{" "}
        <InputField
          placeholder={`${translations[lang].lastname}*`}
          name="lastname"
          required
          errorText="Last Name is required !"
        />
      </Row>
      <Row>
        <InputField
          placeholder={`${translations[lang].email}*`}
          name="email"
          lang={lang}
          required
          errorText="Email is required !"
        />{" "}
        <InputField
          placeholder={`${translations[lang].phone}`}
          name="phonenumber"
        />
      </Row>
      {!isBrand && (
        <Row>
          <InputField
            placeholder={`${translations[lang].location}`}
            name="location"
            required
            errorText="Location is required !"
            instagramId
            style={{ width: "100%" }}
          />
        </Row>
      )}
      <Row>
        <InputField
          placeholder={`${translations[lang].subject}*`}
          name="subject"
          required
          subject={subject}
          errorText="Subject is required !"
          style={{ width: "100%" }}
        />
      </Row>
      <Row>
        <TextAreaField
          placeholder={`${
            isBrand
              ? translations[lang].message_brand
              : translations[lang].message_talent
          }*`}
          name="body"
          required
          errorText="Subject is required !"
          style={{ width: "100%" }}
        />
      </Row>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button type="submit" disabled={!canSubmit}>
          {isSubmitting
            ? translations[lang].submitting
            : translations[lang].submit}
          <Error style={{ textAlign: "center", left: 0, top: "140%" }}>
            {sendingError ? translations[lang].errorSendingEmail : null}
          </Error>
        </Button>
      </div>

      <div style={{ marginTop: 25 }}>
        <em>{isSubmit ? translations[lang].isSubmit : null}</em>
      </div>
      {/* <div>
        <em>{sendingError ? "error" : null}</em>
      </div> */}
    </Form>
  );
};

export default MyForm;
