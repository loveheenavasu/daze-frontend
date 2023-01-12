import React, { useEffect, useState } from "react";
import "../assets/css/style.css";

import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

import "../public/css/fonts.css";

const App = ({ Component, pageProps }) => {
  const [lang, setLang] = useState(null);
  useEffect(() => {
    if (window.navigator.language.indexOf("fr") !== -1) {
      setLang("fr");
    } else {
      setLang("en");
    }
  }, []);
  const changeLang = (l) => {
    if (l === "fr") {
      setLang("fr");
    } else {
      setLang("en");
    }
  };
  if (lang !== null) {
    return <Component {...pageProps} lang={lang} setLang={changeLang} />;
  } else {
    return <div></div>;
  }
};

// Wraps all components in the tree with the data provider
App.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
export default App;
