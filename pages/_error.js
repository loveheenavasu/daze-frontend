import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  text-align: right;
  h1 {
    font-family: "Bodoni-Book";
    margin: 10px 0;
  }
  h2 {
    font-family: "Avenir Next";
    font-weight: 300;
    font-size: 25px;
  }
`;

const Clients = ({ lang, setLang }) => {
  return (
    <Layout title="404 - Not Found" lang={lang} setLang={setLang}>
      <Wrapper>
        <Text>
          <h1>404</h1>
          <h2>Not found</h2>
        </Text>
      </Wrapper>
    </Layout>
  );
};

export default Clients;
