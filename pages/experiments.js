import { Fragment, useLayoutEffect } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import Card from "../components/card";
import gsap from "gsap";
import SplitType from "split-type";

export default function Experiments(props) {
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
    gsap.from("h1 + span", {
      opacity: 0,
      delay: props.loading ? 3 : 1,
    });
    gsap.from(".card", {
      opacity: 0,
      stagger: 0.5,
      delay: props.loading ? 3.5 : 1.5,
    });
  }, []);
  return (
    <Fragment>
      <SEO {...props} />
      <div className="experiments-container">
        <h1>
          <span>Experiments</span>
        </h1>
        <span>
          History of small stuff I made for fun at home or at school :)
        </span>

        <div className="experiments-list">
          {props.experiments.map((item, i) => (
            <Card {...item} index={i} key={i} origin="experiment" />
          ))}
        </div>
      </div>
      <Footer loading={props.loading} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const experiments = await fetchAPI("/experiments?_sort=published_at:DESC");
  const global = await fetchAPI("/settings");
  return {
    props: { experiments, title: "Experiments", global },
  };
}
