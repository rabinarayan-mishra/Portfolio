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
      <div className="about-me">
        <div className="about-label">
          <span>01</span>
          <span>ABOUT ME</span>
        </div>

        <div className="about-line"></div>

        <h3 className="title">
          Turning <span>Data</span> Into
          <br />
          Meaningful <span>Insights</span>
        </h3>

        <div className="about-tabs-container">
          <div className="about-tabs">
            <button
              className={`tab-btn ${activeTab === "bio" ? "active" : ""}`}
              onClick={() => setActiveTab("bio")}
            >
              BIO
            </button>

            <button
              className={`tab-btn ${activeTab === "focus" ? "active" : ""}`}
              onClick={() => setActiveTab("focus")}
            >
              CORE FOCUS
            </button>

            <button
              className={`tab-btn ${
                activeTab === "achievements" ? "active" : ""
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              ACHIEVEMENTS
            </button>
          </div>
        </div>

        <div className="tab-content-wrapper">
          {activeTab === "bio" && (
            <div className="tab-pane">
              <p className="para">
                I'm <span className="highlight">Rabinarayan Mishra</span>, a
                B.Tech Computer Science and Engineering student and aspiring
                Data Analyst. I enjoy working with data to discover meaningful
                insights and create clear, interactive dashboards using
                Python, SQL, Excel, Power BI, and Tableau.
              </p>

              <div className="bio-grid">
                <div className="bio-item">
                  <span className="bio-label">CURRENT ROLE</span>
                  <span className="bio-value">Aspiring Data Analyst</span>
                </div>

                <div className="bio-item">
                  <span className="bio-label">COLLEGE</span>
                  <span className="bio-value">
                    Trident Academy of Technology
                  </span>
                </div>

                <div className="bio-item">
                  <span className="bio-label">ACADEMIC TRACK</span>
                  <span className="bio-value">
                    B.Tech Computer Science & Engineering
                  </span>
                </div>

                <div className="bio-item">
                  <span className="bio-label">GRADUATION</span>
                  <span className="bio-value">2026</span>
                </div>

                <div className="bio-item">
                  <span className="bio-label">LOCATION</span>
                  <span className="bio-value">
                    Ameerpet, Hyderabad, Telangana, India – 500016
                  </span>
                </div>

                <div className="bio-item">
                  <span className="bio-label">CORE SKILLS</span>
                  <span className="bio-value">
                    Python, MySQL, Excel, Power BI, Tableau
                  </span>
                </div>
              </div>

              <div className="bio-quote">
                <span>"</span>
                <p>
                  I turn raw data into meaningful insights that help
                  businesses understand their performance and make better
                  decisions.
                </p>
              </div>
            </div>
          )}

          {activeTab === "focus" && (
            <div className="tab-pane">
              <p className="para">
                My focus is on understanding raw data, cleaning and
                transforming it, finding patterns, and presenting insights
                through effective visualizations and dashboards.
              </p>

              <div className="focus-grid">
                <div className="focus-card">
                  <div className="focus-icon">01</div>
                  <div className="focus-info">
                    <h3>Python & MySQL</h3>
                    <p>
                      Data analysis, SQL queries, data handling, and
                      database-driven analysis.
                    </p>
                  </div>
                </div>

                <div className="focus-card">
                  <div className="focus-icon">02</div>
                  <div className="focus-info">
                    <h3>Data Cleaning & Analysis</h3>
                    <p>
                      Cleaning, transforming, exploring, and preparing data
                      for analysis.
                    </p>
                  </div>
                </div>

                <div className="focus-card">
                  <div className="focus-icon">03</div>
                  <div className="focus-info">
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
            <div className="tab-pane">
              <p className="para">
                I have worked on practical analytics and software projects
                while building hands-on experience with data analysis,
                visualization, and application development.
              </p>

              <div className="achievements-list">
                <div className="achievement-item">
                  <div className="achievement-badge">01</div>
                  <div className="achievement-info">
                    <h3 className="achievement-title">5+ Projects</h3>
                    <p className="achievement-subtitle">
                      Built projects covering Python, SQL, Excel, Power BI,
                      Tableau, and data analysis.
                    </p>
                  </div>
                </div>

                <div className="achievement-item">
                  <div className="achievement-badge">02</div>
                  <div className="achievement-info">
                    <h3 className="achievement-title">
                      NTPC Industrial Training
                    </h3>
                    <p className="achievement-subtitle">
                      Completed industrial training at NTPC Limited, Talcher,
                      Kanihan, working on Neural Style Transfer and
                      Convolutional Neural Networks.
                    </p>
                  </div>
                </div>

                <div className="achievement-item">
                  <div className="achievement-badge">03</div>
                  <div className="achievement-info">
                    <h3 className="achievement-title">Deloitte Australia</h3>
                    <p className="achievement-subtitle">
                      Completed the Deloitte Australia Data Analytics Job
                      Simulation through Forage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* JOURNEY / STATS — kept outside about-me so the original CSS
          can position it correctly */}
      <div className="about-stats">
        <div className="stats-header">
          <span>MY JOURNEY</span>
          <span>2026</span>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-number">0{stat.suffix}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="stats-footer">
          <span>DATA • ANALYSIS • INSIGHTS</span>
        </div>
      </div>
    </section>
  );
};

export default About;
