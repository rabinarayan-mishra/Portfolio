import "./styles/About.css";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 5, suffix: "+", label: "Projects Built", decimals: 0 },
  { target: 2, suffix: "", label: "Certifications", decimals: 0 },
  { target: 1, suffix: "", label: "NTPC Internship", decimals: 0 },
  { target: 6, suffix: "+", label: "Analytics Skills", decimals: 0 },
  { target: 2026, suffix: "", label: "Graduation Year", decimals: 0 },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<
    "bio" | "focus" | "achievements"
  >("bio");

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.innerWidth > 1024) {
      gsap.fromTo(
        section.querySelector(".about-me"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        section.querySelector(".about-stats"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const statElements = section.querySelectorAll(".stat-number");

    statElements.forEach((element, index) => {
      const stat = stats[index];
      if (!stat) return;

      const obj = { value: 0 };

      gsap.to(obj, {
        value: stat.target,
        duration: 2,
        delay: index * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          element.textContent =
            obj.value.toFixed(stat.decimals || 0) + stat.suffix;
        },
      });
    });
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="about-container">
        <div className="about-me">
          <div className="section-label">
            <span>01</span>
            <span>ABOUT ME</span>
          </div>

          <h2 className="about-title">
            Turning <span>Data</span> Into
            <br />
            Meaningful <span>Insights</span>
          </h2>

          <div className="about-tabs">
            <button
              className={activeTab === "bio" ? "active" : ""}
              onClick={() => setActiveTab("bio")}
            >
              BIO
            </button>

            <button
              className={activeTab === "focus" ? "active" : ""}
              onClick={() => setActiveTab("focus")}
            >
              CORE FOCUS
            </button>

            <button
              className={activeTab === "achievements" ? "active" : ""}
              onClick={() => setActiveTab("achievements")}
            >
              ACHIEVEMENTS
            </button>
          </div>

          <div className="about-content">
            {activeTab === "bio" && (
              <div className="tab-content">
                <p className="about-description">
                  I'm <strong>Rabinarayan Mishra</strong>, a B.Tech Computer
                  Science and Engineering student and aspiring Data Analyst. I
                  enjoy working with data to discover meaningful insights and
                  create clear, interactive dashboards using Python, SQL,
                  Excel, Power BI, and Tableau.
                </p>

                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">CURRENT ROLE</span>
                    <span className="info-value">Aspiring Data Analyst</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">COLLEGE</span>
                    <span className="info-value">
                      Trident Academy of Technology
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">ACADEMIC TRACK</span>
                    <span className="info-value">
                      B.Tech Computer Science & Engineering
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">GRADUATION</span>
                    <span className="info-value">2026</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">LOCATION</span>
                    <span className="info-value">
                      Ameerpet, Hyderabad, Telangana, India – 500016
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">CORE SKILLS</span>
                    <span className="info-value">
                      Python, MySQL, Excel, Power BI, Tableau
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "focus" && (
              <div className="tab-content">
                <p className="about-description">
                  My focus is on understanding raw data, cleaning and
                  transforming it, finding patterns, and presenting insights
                  through effective visualizations and dashboards.
                </p>

                <div className="focus-list">
                  <div className="focus-item">
                    <span className="focus-number">01</span>
                    <div>
                      <h3>Python & MySQL</h3>
                      <p>
                        Data analysis, SQL queries, data handling, and
                        database-driven analysis.
                      </p>
                    </div>
                  </div>

                  <div className="focus-item">
                    <span className="focus-number">02</span>
                    <div>
                      <h3>Data Cleaning & Analysis</h3>
                      <p>
                        Cleaning, transforming, exploring, and preparing data
                        for analysis.
                      </p>
                    </div>
                  </div>

                  <div className="focus-item">
                    <span className="focus-number">03</span>
                    <div>
                      <h3>Excel, Power BI & Tableau</h3>
                      <p>
                        Interactive dashboards, KPIs, reports, charts, and
                        business insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="tab-content">
                <p className="about-description">
                  I have worked on practical analytics and software projects
                  while building hands-on experience with data analysis,
                  visualization, and application development.
                </p>

                <div className="achievements-list">
                  <div className="achievement-item">
                    <span className="achievement-icon">01</span>
                    <div>
                      <h3>5+ Projects</h3>
                      <p>
                        Built projects covering Python, SQL, Excel, Power BI,
                        Tableau, and data analysis.
                      </p>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <span className="achievement-icon">02</span>
                    <div>
                      <h3>NTPC Industrial Training</h3>
                      <p>
                        Completed industrial training at NTPC Limited, Talcher,
                        Kanihan, working on Neural Style Transfer and
                        Convolutional Neural Networks.
                      </p>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <span className="achievement-icon">03</span>
                    <div>
                      <h3>Deloitte Australia</h3>
                      <p>
                        Completed the Deloitte Australia Data Analytics Job
                        Simulation through Forage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="about-quote">
            <span className="quote-mark">"</span>
            <p>
              I turn raw data into meaningful insights that help businesses
              understand their performance and make better decisions.
            </p>
          </div>
        </div>

        <div className="about-stats">
          <div className="stats-header">
            <span>MY JOURNEY</span>
            <span>2026</span>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-number">
                  0{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="stats-footer">
            <span>DATA • ANALYSIS • INSIGHTS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
