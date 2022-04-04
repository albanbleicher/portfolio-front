import React, { useLayoutEffect } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import SplitType from "split-type";
import { useState } from "react";

export default function Resume(props) {
  const { resume } = props;
  const [topSeen, setTopSeen] = useState(false);
  const [school, schoolInView] = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });
  const [skills, skillsInView] = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });
  const [bonjour, bonjourInView] = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });
  const timeline = gsap.timeline();
  useLayoutEffect(() => {
    gsap.to(".school-section", { opacity: 0, duration: 0 });
    gsap.to(".skills-section", { opacity: 0, duration: 0 });
    const title = new SplitType("h1 span");
    gsap.from(title.chars, {
      y: 50,
      opacity: 0,
      stagger: 0.06,
      delay: props.loading ? 2.5 : 0,
      duration: 1.5,
      ease: "back.out(1.7)",
    });
    timeline
      .from(".work-section h2, .work-section .resume-block", {
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        delay: props.loading ? 2.8 : 0.8,
      })
      .then(() => {
        setTopSeen(true);
      });
  }, []);
  useLayoutEffect(() => {
    if (schoolInView && topSeen) {
      gsap.to(".school-section", { opacity: 1, duration: 0 });
      timeline.from(
        ".school-section h2, .school-section .resume-block",
        {
          opacity: 0,
          stagger: 0.2,
          duration: 1.5,
        },
        ">"
      );
    }
  }, [schoolInView, topSeen]);
  useLayoutEffect(() => {
    if (skillsInView) {
      timeline.to(".skills-section", { opacity: 1 });
      timeline.from(".skills-section h2, .skills-section .resume-block", {
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      });
    }
  }, [skillsInView]);

  useLayoutEffect(() => {
    if (bonjourInView) {
      timeline.fromTo(
        ".say-bonjour h2 span",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.7 }
      );
      timeline.fromTo(
        ".say-bonjour a span",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, delay: 0.2, duration: 0.7 }
      );
    }
  }, [bonjourInView]);

  return (
    <React.Fragment>
      <SEO {...props} />
      <div className="resume-container">
        <div className="resume-left">
          <h1>
            <span>Resume</span>
          </h1>
        </div>
        <div className="resume-right">
          <div className="work-section resume-section">
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
                  {item.EndYear
                    ? new Date(item.StartYear).getFullYear() +
                      " - " +
                      new Date(item.EndYear).getFullYear()
                    : "Since " + new Date(item.StartYear).getFullYear()}
                </span>
              </div>
            ))}
          </div>
          <div ref={school} className="resume-section school-section">
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
          <div ref={skills} className="resume-section skills-section">
            <h2>Skills</h2>
            {resume.Skills.map((item) => (
              <div key={item.Domain} className="resume-block">
                <h4>{item.Domain}</h4>
                <span>{item.List}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={bonjour} className="say-bonjour">
        <h2>
          <span>Say bonjour !</span>
        </h2>
        <a target="_blank" href={"mailto:" + props.global.mail}>
          <span>{props.global.mail}</span>
        </a>
      </div>
      <Footer loading={props.loading} />
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
