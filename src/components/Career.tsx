import "./styles/Career.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.innerWidth <= 1024) return;

    // Animate the career timeline bar growing downward
    gsap.to(section.querySelector(".career-timeline"), {
      maxHeight: "100%",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section.querySelector(".career-info"),
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    // Animate each career-info-box sliding in
    const boxes =
      section.querySelectorAll(".career-info-box");

    boxes.forEach((box, i) => {
      gsap.fromTo(
        box,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 88%",
            toggleActions:
              "play none none reverse",
          },
        }
      );
    });

    // Animate the heading
    gsap.fromTo(
      section.querySelector("h2"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector("h2"),
          start: "top 85%",
          toggleActions:
            "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      className="career-section section-container"
      ref={sectionRef}
    >
      <div className="career-container">

        {/* SECTION HEADING */}
        <h2>
          My Education <span>&</span>
          <br /> Experience
        </h2>

        <div className="career-info">

          {/* TIMELINE */}
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* EDUCATION */}
          <div className="career-info-box">

            <div className="career-info-in">

              <div className="career-role">

                <h4>
                  B.Tech Computer Science &
                  Engineering
                </h4>

                <h5>
                  Trident Academy of Technology,
                  Bhubaneswar
                </h5>

              </div>

              <h3>2026</h3>

            </div>

            <p>
              Currently pursuing B.Tech in Computer
              Science and Engineering. Expected to
              graduate in <strong>2026</strong>, with a
              focus on programming, databases, data
              analytics, and software development.
            </p>

          </div>

          {/* NTPC EXPERIENCE */}
          <div className="career-info-box">

            <div className="career-info-in">

              <div className="career-role">

                <h4>
                  Industrial Training
                </h4>

                <h5>
                  NTPC Limited, Talcher, Kanihan
                </h5>

              </div>

              <h3>2025</h3>

            </div>

            <p>
              Completed industrial training at
              <strong> NTPC Limited</strong> from
              <strong> 2 June 2025 to 2 July 2025</strong>.
              Worked on a project titled
              <strong>
                {" "}Image Stylization Using Neural Style
                Transfer and Pre-trained Convolutional
                Neural Networks
              </strong>.
            </p>

          </div>

          {/* DATA ANALYTICS */}
          <div className="career-info-box">

            <div className="career-info-in">

              <div className="career-role">

                <h4>
                  Data Analytics
                </h4>

                <h5>
                  Projects & Practical Learning
                </h5>

              </div>

              <h3>NOW</h3>

            </div>

            <p>
              Building practical data analytics projects
              using <strong>Python, MySQL, Excel,
              Power BI, and Tableau</strong>. Working on
              data cleaning, data handling, SQL analysis,
              dashboards, visualization, and extracting
              meaningful business insights from real-world
              datasets.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;