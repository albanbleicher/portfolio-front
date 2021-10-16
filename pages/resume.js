import { motion } from "framer-motion";
import React from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
export default function Resume(props) {
  const { resume } = props;
  return (
    <React.Fragment>
      <SEO {...props} />
      <motion.div className="resume-container">
        <div className="resume-left" data-scroll-section>
          <h1 data-scroll data-scroll-position="top" data-scroll-speed="1">
            {resume.title}
          </h1>
        </div>
        <div className="resume-right">
          <div className="resume-section">
            <h2>Experiences</h2>
            {resume.Experience.map((item) => (
              <div key={item.Company} className="resume-block">
                <h4>{item.Role}</h4>
                <p>
                  <a target="_blank" href={item.companyWebsite}>
                    {item.Company}
                  </a>
                </p>
                <span>
                  {new Date(item.StartYear).getFullYear()} -{" "}
                  {item.EndYear ? new Date(item.EndYear).getFullYear() : "now"}
                </span>
              </div>
            ))}
          </div>
          <div className="resume-section">
            <h2>Instruction</h2>
            {resume.Instruction.map((item) => (
              <div key={item.Diploma} className="resume-block">
                <h4>{item.Diploma}</h4>
                <p>{item.SchoolName}</p>
                <span>
                  {new Date(item.StartYear).getFullYear()} -{" "}
                  {item.EndYear ? new Date(item.EndYear).getFullYear() : "now"}
                </span>
              </div>
            ))}
          </div>
          <div data-scroll-section className="resume-section">
            <h2 data-scroll data-scroll-speed="2">
              Skills
            </h2>
            {resume.Skills.map((item) => (
              <div key={item.Domain} className="resume-block">
                <h4>{item.Domain}</h4>
                <span>{item.List}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="say-bonjour">
        <motion.h2>Say bonjour !</motion.h2>
        <a target="_blank" href={"mailto:" + props.global.mail}>
          {props.global.mail}
        </a>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export async function getStaticProps() {
  const resume = await fetchAPI("/resume");
  const global = await fetchAPI("/settings");

  return {
    props: { resume, title: "Resume", global },
  };
}
