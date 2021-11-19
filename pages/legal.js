import React from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
export default function Legal(props) {
  return (
    <React.Fragment>
      <SEO {...props} />
      <div className="legal">
        <h1>Legal</h1>
        <ReactMarkdown
          className="content"
          rehypePlugins={[rehypeRaw]}
          children={props.legal.content}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
}
export async function getStaticProps() {
  const legal = await fetchAPI("/legal");
  const global = await fetchAPI("/settings");

  return {
    props: { legal, title: "Legal", global },
  };
}
