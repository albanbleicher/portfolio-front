import React, { useLayoutEffect } from "react";
import Footer from "../components/footer";
import SEO from "../components/seo";
import { fetchAPI } from "../lib/api";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

export default function Resume(props) {
  const { resume } = props;
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
  useLayoutEffect(() => {
    gsap.to(".school-section", { opacity: 0, duration: 0 });
    gsap.to(".skills-section", { opacity: 0, duration: 0 });
    gsap.from("h1 span", {
      opacity: 0,
      y: 100,
      delay: props.loading ? 2 : 0,
      duration: 1.2,
    });
    gsap.from(".work-section h2, .work-section .resume-block", {
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      delay: props.loading ? 3 : 1,
    });
  }, []);
  useLayoutEffect(() => {
    if (schoolInView) {
      gsap.to(".school-section", { opacity: 1 });
      gsap.from(".school-section h2, .school-section .resume-block", {
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
      });
    }
  }, [schoolInView]);
  useLayoutEffect(() => {
    if (skillsInView) {
      gsap.to(".skills-section", { opacity: 1 });
      gsap.from(".skills-section h2, .skills-section .resume-block", {
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      });
    }
  }, [skillsInView]);

  useLayoutEffect(() => {
    if (bonjourInView) {
      console.log(true);
      gsap.fromTo(
        ".say-bonjour h2 span",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2 }
      );
      gsap.fromTo(
        ".say-bonjour a span",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, delay: 0.2, duration: 1.2 }
      );
    }
  }, [bonjourInView]);

  return (
    <React.Fragment>
      <SEO {...props} />
      <div className="resume-container">
        <div className="resume-left">
          <h1>
            <span>{resume.title}</span>
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
