import React, { Component } from "react";
import dynamic from "next/dynamic";
import Clients from "../components/Clients";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

const ClientsPage = (props) => {
  const { lang, setLang, clients, creations } = props;
  // console.log(creations, 'wdewewewe');
  return (
    <Layout
      title="Clients"
      description={`Daze Management crée des stratégies digitales & des activations adaptées aux besoin de nos clients, pour leurs permettre de se distinguer sur les réseaux sociaux et d'atteindre leurs objectifs.
Chez Daze MGMT, notre créativité est notre force ! Afin de délivrer le bon message nous, nous employons à rédiger des scénarios adaptés aux talents et aux marques. 
Nous nous assurons ainsi que le contenu délivré soit de qualité et perçu comme authentique, le côté promotionnel passe donc inaperçu et le message est ainsi mieux interprété et assimilé par les communautés.`}
      setLang={setLang}
      lang={lang}
    >
      <Clients {...props}></Clients>
    </Layout>
  );
};

ClientsPage.getInitialProps = async (ctx) => {
  const res = await fetch(`${publicRuntimeConfig.API_URL}/clients`);
  const resCreations = await fetch(
    `${publicRuntimeConfig.API_URL}/creations?_limit=1000`
  );
  const generalRes = await fetch(`${publicRuntimeConfig.API_URL}/general-settings`);
  const filterRes = await fetch(`${publicRuntimeConfig.API_URL}/filter`);
  return {
    clients: await res.json(),
    creations: await resCreations.json(),
    generalSetting: await generalRes.json(),
    filterTabs: await filterRes.json()
  };
};

export default ClientsPage;
