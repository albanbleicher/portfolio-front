import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { fetchAPI } from "../../lib/api";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import WorkImage from "../../components/work_image";

export default function SingleWork(props) {
  return (
    <React.Fragment>
      <SEO {...props} />
      <div className="single-work">
        <div className="single-work-header">
          <motion.h2
            initial="initial"
            animate="final"
            variants={{
              initial: {
                opacity: 0,
                y: 50,
              },
              final: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 0.5,
            }}
            className="title"
          >
            {props.title}
          </motion.h2>
          <motion.span
            initial="initial"
            animate="final"
            variants={{
              initial: {
                opacity: 0,
                y: 50,
              },
              final: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 1,
            }}
          >
            {new Date(props.date).getFullYear()} — {props.type}
          </motion.span>
        </div>
        <motion.div
          initial="initial"
          animate="final"
          variants={{
            initial: {
              opacity: 0,
            },
            final: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 2,
          }}
          className="single-work-content"
        >
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
        </motion.div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export async function getStaticProps(context) {
  const work = await fetchAPI("/projects/?slug=" + context.params.slug);
  const global = await fetchAPI("/settings");
  if (work.length) return { props: { ...work[0], global, blurred } };
  else return { notFound: true };
}
export async function getStaticPaths() {
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
}
