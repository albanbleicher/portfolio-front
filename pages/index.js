import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import FluidImage from "../components/FluidImage";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import { Curtains } from "react-curtains";

export default function Home(props) {
  return (
    <Fragment>
      <SEO {...props} />

      <div className="home-container">
        <div className="home-content">
          <div className="text">
            <h2>Bonjour,</h2>
            <ReactMarkdown
              linkTarget="_blank"
              rehypePlugins={[rehypeRaw]}
              children={props.global.website_baseline}
            />
          </div>
          <Curtains pixelRatio={Math.min(1.5, 2)}>
            <FluidImage
              classElement={"avatar"}
              src={props.global.avatar.formats.medium.url}
            />
          </Curtains>
        </div>
      </div>
    </Fragment>
  );
}
export async function getStaticProps() {
  const global = await fetchAPI("/settings");

  return {
    props: { global },
  };
}
