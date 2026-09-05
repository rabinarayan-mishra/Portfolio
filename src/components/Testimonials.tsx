import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "Data Analytics",
    role: "Python • SQL • Excel",
    text: "I enjoy working with data to clean, analyze, and transform raw information into meaningful insights that can support better business decisions.",
    initials: "DA",
    color: "#ff6b6b",
  },
  {
    id: 2,
    name: "Business Intelligence",
    role: "Power BI • Tableau",
    text: "My focus is on creating interactive dashboards and clear visualizations that make complex data easier to understand and help communicate key business trends.",
    initials: "BI",
    color: "#4ecdc4",
  },
  {
    id: 3,
    name: "Continuous Learning",
    role: "Projects • Practical Learning",
    text: "Through projects and practical learning, I continue to improve my skills in data cleaning, SQL analysis, visualization, statistics, and exploratory data analysis.",
    initials: "CL",
    color: "#c2a4ff",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title
      gsap.fromTo(
        ".testimonials-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 80%",
          },
        }
      );

      // Animate the cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testimonials-section",
              start: "top 70%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="testimonials-section section-container"
      id="testimonials"
      ref={containerRef}
    >
      <h2 className="testimonials-title">
        What I <span>Focus On</span>
      </h2>

      <div className="testimonials-grid">
        {testimonialsData.map((t, i) => (
          <div
            key={t.id}
            className="testimonial-card"
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
          >
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>

            <p className="testimonial-text">
              "{t.text}"
            </p>

            <div className="testimonial-author">
              <div
                className="author-initials"
                style={{
                  backgroundColor:
                    t.color || "var(--accentColor)",
                }}
              >
                {t.initials}
              </div>

              <div className="author-info">
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;