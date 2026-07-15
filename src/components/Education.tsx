import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Education.css";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "Bachelor of Arts (B.A.)",
    grade: "Second Division",
    institution: "University of Sindh, Jamshoro",
    board: "University of Sindh",
    year: "2016 - 2018",
    description:
      "Completed my graduation with a focus on arts and humanities, building strong communication and analytical skills.",
  },
  {
    degree: "Intermediate in Pre-Medical",
    grade: "",
    institution: "Higher Secondary School, Mirpur Sakro, Thatta",
    board: "BISE Hyderabad",
    year: "2012 - 2014",
    description:
      "Studied Pre-Medical group including Biology, Chemistry and Physics at the higher secondary level.",
  },
  {
    degree: "Matriculation in Science",
    grade: "",
    institution: "High School, Mirpur Sakro, Thatta",
    board: "BISE Hyderabad",
    year: "2010 - 2012",
    description:
      "Completed Secondary School Certificate in Science, laying the foundation for further studies.",
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".edu-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="education-section" id="education" ref={sectionRef}>
      <div className="edu-container section-container">
        <h2 className="edu-heading">
          My <span>Education</span>
        </h2>
        <p className="edu-sub">
          A timeline of my academic journey and qualifications.
        </p>

        <div className="edu-grid">
          {education.map((item, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-year">{item.year}</div>
              <h3 className="edu-degree">
                {item.degree}
                {item.grade && <span className="edu-grade"> — {item.grade}</span>}
              </h3>
              <h4 className="edu-institution">{item.institution}</h4>
              <p className="edu-board">{item.board}</p>
              <p className="edu-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
