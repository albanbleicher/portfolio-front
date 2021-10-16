import { fetchAPI } from "../../lib/api";
import React, { Fragment, useEffect, useState } from "react";
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import WorkCard from "../../components/work_card";
export default function Work(props) {
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
