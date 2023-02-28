import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import HomeBackground from "../components/HomeBackground";
import Home from "../components/Home";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

const HomePage = (props) => {
  let { lang, setLang, page } = props;
  console.log("page123===>", page);
  return (
    <Layout
      title="HOME"
      description={`Daze MGMT est une agence de marketing digital représentant et travaillant avec plus de 180 mannequins professionnelles et talents influents à travers le monde. Daze management est spécialisée dans la création de campagnes sur-mesure sur les réseaux sociaux.
Nous mettons en place des stratégies marketing et d'acquisitions innovantes en identifiant des ambassadeurs forts, correspondant à l’ADN et à l'image de votre marque.
Chez Daze management, nous, nous engageons à raconter une histoire sincère, pertinente et pérenne, pour faire de nos campagnes, un succès incontestable & mesurable.`}
      lang={lang}
      setLang={setLang}
    >
      <HomeBackground page={page} lang={lang}/>
      <Home lang={lang} page={page} />
    </Layout>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const res = await fetch(`${publicRuntimeConfig.API_URL}/home-page`);

  return {
    page: await res.json(),
  };
};

export default HomePage;
