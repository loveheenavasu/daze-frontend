// import Talents from "../components/TalentsList";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { shuffle, nFormatter } from "../../utils";
// import Query from "../../components/Query";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Layout = dynamic(() => import("../../components/Layout"), { ssr: false });

const Talent = dynamic(() => import("../../components/Talent"), {
  ssr: false,
});

const TalentPage = ({ lang, setLang, talent }) => {
  const router = useRouter();
  // console.log(talent);
  return (
    <Layout
      title={`${talent.firstname} ${talent.lastname}`}
      description={`${talent.firstname} ${talent.lastname} chez Daze MGMT
      Instagram: @${talent.instagram_id}
      Followers: ${nFormatter(talent.followers, 1)}
      `}
      lang={lang}
      setLang={setLang}
    >
      <Talent talent={talent} lang={lang} />
    </Layout>
  );
};

TalentPage.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `${publicRuntimeConfig.API_URL}/talents/${query.instagram_id}`
  );
  return {
    talent: await res.json(),
  };
};

export default TalentPage;
