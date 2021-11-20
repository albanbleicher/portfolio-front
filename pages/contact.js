import { Fragment } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import Link from "next/link";
export default function Contact(props) {
  return (
    <Fragment>
      <SEO title="Contact" {...props} />
      <div className="contact-container">
        <h1>Contact</h1>
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
      <Footer />
    </Fragment>
  );
}
export async function getStaticProps() {
  const global = await fetchAPI("/settings");
  return {
    props: { title: "Contact", global },
  };
}
