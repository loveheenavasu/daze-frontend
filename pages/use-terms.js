import React  from "react";
import dynamic from "next/dynamic";
import UseTerm from "../components/TermCondition/index"
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const Layout = dynamic(() => import("../components/Layout"), { ssr: false });
const Terms = (props) =>{
    const { lang, setLang, clients, creations,term } = props;
    console.log("page",term)
    return(
        <Layout
      title="Clients"
      description={`Daze Management crée des stratégies digitales & des activations adaptées aux besoin de nos clients, pour leurs permettre de se distinguer sur les réseaux sociaux et d'atteindre leurs objectifs.
Chez Daze MGMT, notre créativité est notre force ! Afin de délivrer le bon message nous, nous employons à rédiger des scénarios adaptés aux talents et aux marques. 
Nous nous assurons ainsi que le contenu délivré soit de qualité et perçu comme authentique, le côté promotionnel passe donc inaperçu et le message est ainsi mieux interprété et assimilé par les communautés.`}
      setLang={setLang}
      lang={lang}
    >
      <UseTerm/>
    </Layout>
    )
};

Terms.getInitialProps = async (ctx) => {
    const termOfUse = await fetch(`${publicRuntimeConfig.API_URL}/term-of-use`);
  
    return {
      term: await termOfUse.json(),
    };
  };

export default Terms;