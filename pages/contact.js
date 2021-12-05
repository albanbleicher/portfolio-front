import { Fragment, useLayoutEffect } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import Link from "next/link";
import gsap from "gsap";
import SplitType from "split-type";

export default function Contact(props) {
  useLayoutEffect(() => {
    const title = new SplitType("h1 span");
    gsap.from(title.chars, {
      y: 50,
      opacity: 0,
      stagger: 0.06,
      delay: props.loading ? 2.5 : 0,
      duration: 1.5,
      ease: "back.out(1.7)",
    });
    gsap.from(".contact-wrapper a", {
      opacity: 0,
      stagger: 0.5,
      delay: props.loading ? 3.5 : 1.5,
    });
  }, []);
  return (
    <Fragment>
      <SEO title="Contact" {...props} />
      <div className="contact-container">
        <h1>
          <span>Contact</span>
        </h1>
        <div className="contact-wrapper">
          <Link href={props.global.github} passHref={true} shallow={true}>
            <a target="_blank">
              <div className="contact-item">
                <h2>
                  <span>Github</span>
                  <span>Github</span>
                </h2>
                <span className="arrow">↗</span>
              </div>
            </a>
          </Link>
          <Link href={props.global.linkedin} passHref={true} shallow={true}>
            <a target="_blank">
              <div className="contact-item">
                <h2>
                  <span>LinkedIn</span>
                  <span>LinkedIn</span>
                </h2>
                <span className="arrow">↗</span>
              </div>
            </a>
          </Link>
          <Link
            href={"mailto:" + props.global.mail}
            passHref={true}
            shallow={true}
          >
            <a target="_blank">
              <div className="contact-item">
                <h2>
                  <span>Mail</span>
                  <span>Mail</span>
                </h2>
                <span className="arrow">↗</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
      <Footer loading={props.loading} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const global = await fetchAPI("/settings");
  return {
    props: { title: "Contact", global },
  };
}
