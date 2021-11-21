import { Fragment, useEffect, useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import FluidImage from "../components/FluidImage";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import gsap from "gsap";
import SplitType from "split-type";

export default function Home(props) {
  useLayoutEffect(() => {
    const title = new SplitType(".home-content h2");
    const titleSecondSplit = new SplitType(title.chars);
    gsap.from(".text p", { opacity: 0, duration: 1.5, delay: 1.5 });

    gsap.from(titleSecondSplit.chars, {
      y: 50,
      opacity: 0,
      stagger: 0.06,
      delay: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
    });
  }, []);
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
          <FluidImage
            classElement={"avatar"}
            src={props.global.avatar.formats.medium.url}
          />
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
