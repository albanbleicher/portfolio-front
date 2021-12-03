import { fetchAPI } from "../../lib/api";
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import WorkCard from "../../components/work_card";
import gsap from "gsap";
export default function Work(props) {
  useLayoutEffect(() => {
    gsap.from(".work-card", {
      opacity: 0,
      stagger: 0.5,
      delay: props.loading ? 2 : 0.2,
    });
  }, []);
  return (
    <React.Fragment>
      <SEO {...props} />
      <div className={props.work.length ? "work" : "work no-work"}>
        {props.work.length ? (
          <div className="work-list">
            {props.work.map((item, i) => (
              <WorkCard {...item} index={i} key={i} />
            ))}
          </div>
        ) : (
          <Fragment>
            <h2>This is me right now</h2>
            <p>
              Working really fast to prepare everything I want to show you soon,
              so stay tuned.
            </p>
            <a target="_blank" href="https://github.com/albanbleicher">
              → Github
            </a>
          </Fragment>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
export async function getStaticProps() {
  const work = await fetchAPI("/projects?_sort=date:DESC");
  const global = await fetchAPI("/settings");
  return {
    props: { work, title: "Work", global },
  };
}
