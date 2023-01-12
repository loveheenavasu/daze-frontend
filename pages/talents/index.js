// import Talents from "../components/TalentsList";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";
// import Query from "../../components/Query";

// const Layout = dynamic(() => import("../components/Layout"), { ssr: false });
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Talents = dynamic(() => import("../../components/TalentsList"), {
  ssr: false,
});

const Index = ({ setLang, lang, talents }) => {
  return (
    <Layout
      title="Talents"
      description={`Chez Daze MGMT, nous trouvons qu'une bonne campagne passe régulièrement par un casting de personnalités variées, dont l'ADN correspond à celui de la marque.
L’objectif ? Exister intelligemment, pour toucher des communautés par des biais différents, et s’offrir une omniprésence saine et virale.  

Pourquoi avoir fait le choix des mannequins influentes chez Daze management ?
Les mannequins incarnent le luxe, la mode, le lifestyle et sont souvent identifiées comme des ambassadrices des tendances à venir. N'étant pas influenceuses à plein temps, elles rassurent leur communauté sur l'authenticité des contenus qu'elles relayent,  perçus comme sincères et spontanés.

Professionnelles de l'image et de la mode, elles savent mettre les vêtements en valeur, et sont aussi suivies pour leurs conseils beauté et leurs routines sportives. Habituées aux timings serrés et aux exigences des campagnes, elles sont professionnelles et organisées.
Au-delà de leur style, bon nombre d'entre elles sont considérées comme des leaders d’opinions, et leurs communautés, pour la plupart internationales, sont aussi composées de célébrités, de femmes et d'hommes avec un pouvoir d'achat qui peut s’avérer élevé (évidemment variable selon les profils).

Les talents influents de chez Daze Management répondent à plusieurs critères:
- un ADN fort et clairement identifiable
- de 6000 à 125 000 000 abonnés
- un taux d'engagement de minimum 2%
- des communautés internationales`}
      lang={lang}
      setLang={setLang}
    >
      <Talents talents={talents} lang={lang}></Talents>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  const res = await fetch(`${publicRuntimeConfig.API_URL}/talents?_limit=1000`);
  return {
    talents: await res.json(),
  };
};

export default Index;
