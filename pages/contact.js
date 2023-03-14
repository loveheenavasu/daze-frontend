import React, { Component } from "react";
import dynamic from "next/dynamic";
import ContactPage from "../components/Contact";
import { useRouter } from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

const Contact = ({ lang, setLang,contactApiData }) => {
  const router = useRouter();
  return (
    <Layout
      title="Contact"
      description={`Après plusieurs années dans le domaine du luxe, de l'événementiel et du conseil, nous avons mis en place de nombreux leviers innovants et pertinents visant à assurer une réelle visibilité, un engagement optimal et une valorisation visible et mesurable de votre marque.
Une question ? Un nouveau lancement de campagne ?
Nous nous tenons bien évidemment à votre entière disposition pour évoquer plus en détails les services de notre agence et vous proposer des cas pratiques pouvant être adaptés à vos objectifs.`}
      lang={lang}
      setLang={setLang}
    >
      <ContactPage lang={lang} subject={router.query.subject} contactApiData={contactApiData}></ContactPage>
    </Layout>
  );
};

Contact.getInitialProps = async (ctx) => {
  const contactData = await fetch(`${publicRuntimeConfig.API_URL}/contact-team-members`);

  return {
    contactApiData: await contactData.json(),
  };
};

export default Contact;
