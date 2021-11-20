import { Fragment } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import Link from "next/link";
export default function Contact(props) {
  return (
    <Fragment>
      <SEO {...props} />
      <div className="experiments-container">
        <h1>Experiments</h1>
      </div>
      <Footer />
    </Fragment>
  );
}
export async function getStaticProps() {
  const global = await fetchAPI("/settings");
  return {
    props: { title: "Experiments", global },
  };
}
