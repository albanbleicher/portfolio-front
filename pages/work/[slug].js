import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { fetchAPI } from "../../lib/api";
import React, { use, useLayoutEffect } from "react";
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import WorkImage from "../../components/work_image";
import gsap from "gsap";
import SplitType from "split-type";
export default function SingleWork(props) {
  useLayoutEffect(() => {
    gsap.from(".content_layout", { opacity: 0, duration: 1.5 });
    const title = new SplitType(".title", { types: "lines" });
    const secondSplit = new SplitType(title.lines, {
      types: "lines",
      splitClass: "inner-title",
    });
    gsap
      .from(".inner-title", {
        y: 100,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "circ",
      })
      .then(() => {
        secondSplit.revert();
        title.revert();
      });

    const span = new SplitType(".single-work-header span", {
      types: "lines",
    });
    const secondSplitSpan = new SplitType(span.lines, {
      types: "lines",
      splitClass: "inner-span",
    });
    gsap
      .from(".inner-span", {
        y: 100,
        stagger: 0.02,
        duration: 1.5,
        delay: 1.3,
        ease: "easeInOut",
      })
      .then(() => {
        secondSplitSpan.revert();
        span.revert();
      });
    gsap.from(".single-work-content", {
      opacity: 0,
      duration: 1.4,
      delay: 2.8,
      ease: "easeInOut",
    });
  }, []);
  return (
    <React.Fragment>
      <SEO {...props} />
      <div className="single-work">
        <div className="single-work-header">
          <h2 className="title">{props.title}</h2>
          <span>
            {new Date(props.date).getFullYear()} — {props.type}
          </span>
        </div>
        <div className="single-work-content">
          <ReactMarkdown
            linkTarget="_target"
            className="long-description"
            rehypePlugins={[rehypeRaw]}
            children={props.description}
          />
          {props.link && (
            <p className="go-to-site">
              — <a href={props.link}>View project</a>
            </p>
          )}
          <div className="main-and-args">
            <WorkImage
              data={props.medias[1].formats.large.provider_metadata.public_id}
              big={props.medias[1].formats.large.provider_metadata.public_id}
            />
            {props.portfolio_element && (
              <div className="args">
                {props.portfolio_element.map((item) => (
                  <div key={item.label} className="args-element">
                    <h3>{item.label}</h3>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="credits-and-gallery">
            <ReactMarkdown
              linkTarget="_target"
              className="credits"
              rehypePlugins={[rehypeRaw]}
              children={props.credits}
            />
            <div className="gallery">
              {props.medias.map(
                (item, i) =>
                  i > 1 && (
                    <WorkImage
                      data={item.formats.thumbnail.provider_metadata.public_id}
                      big={item.formats.large.provider_metadata.public_id}
                      key={item.formats.thumbnail.url}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export const getStaticProps = async (context) => {
  const work = await fetchAPI("/projects/?slug=" + context.params.slug);
  const global = await fetchAPI("/settings");
  if (work.length) return { props: { ...work[0], global } };
  else return { notFound: true };
};
export const getStaticPaths = async () => {
  const work = await fetchAPI("/projects?_sort=date:DESC");
  let paths = [];
  if (work.length) {
    paths = work.map((post) => ({
      params: { slug: post.slug },
    }));
  }
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
};
