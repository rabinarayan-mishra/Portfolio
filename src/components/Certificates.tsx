import "./styles/Certificates.css";
import { MdArrowOutward } from "react-icons/md";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HiSparkles } from "react-icons/hi2";
import { FaGraduationCap, FaAward } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const onlineCerts = [
  {
    name: "Data Analytics Job Simulation",
    platform: "Deloitte Australia – Forage",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a3f3ef2d73b9d1e337810ff_1782536402369_completion_certificate.pdf",
    icon: "forage",
  },
];

const PlatformIcon = ({ type }: { type: string }) => {
  if (type === "forage") return <FaGraduationCap />;
  return <FaGraduationCap />;
};

const Certificates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;
    if (window.innerWidth <= 1024) return;

    // Heading reveal with blur
    gsap.fromTo(
      section.querySelector(".cert-heading"),
      {
        y: 100,
        opacity: 0,
        filter: "blur(12px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stats badges
    gsap.fromTo(
      section.querySelectorAll(".cert-stat"),
      {
        y: 30,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Featured certificate entrance
    gsap.fromTo(
      section.querySelector(".cert-featured"),
      {
        y: 80,
        opacity: 0,
        scale: 0.92,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".cert-featured"),
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Featured image
    gsap.fromTo(
      section.querySelector(".cert-featured-img"),
      {
        x: -60,
        opacity: 0,
        scale: 0.9,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.querySelector(".cert-featured"),
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Featured information
    gsap.fromTo(
      section.querySelector(".cert-featured-info"),
      {
        x: 60,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.querySelector(".cert-featured"),
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Tags
    gsap.fromTo(
      section.querySelectorAll(".cert-tag"),
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: section.querySelector(".cert-featured"),
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Grid label
    gsap.fromTo(
      section.querySelector(".cert-grid-label"),
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".cert-grid-label"),
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cards
    const cards = section.querySelectorAll(".cert-card");

    gsap.fromTo(
      cards,
      {
        y: 50,
        opacity: 0,
        scale: 0.93,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: {
          each: 0.08,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".cert-grid"),
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  let gridHoverRaf: number | null = null;

  const handleGridMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (gridHoverRaf) {
      cancelAnimationFrame(gridHoverRaf);
    }

    gridHoverRaf = requestAnimationFrame(() => {
      const cards = document.querySelectorAll(".cert-card");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        (card as HTMLElement).style.setProperty(
          "--mouse-y",
          `${y}px`
        );
      });
    });
  };

  let featuredHoverRaf: number | null = null;

  const handleFeaturedMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const currentTarget = e.currentTarget;

    if (featuredHoverRaf) {
      cancelAnimationFrame(featuredHoverRaf);
    }

    featuredHoverRaf = requestAnimationFrame(() => {
      const card = currentTarget;
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -6;

      const rotateY =
        ((x - centerX) / centerX) * 6;

      card.style.transform = `
        perspective(1500px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.01, 1.01, 1.01)
      `;

      card.style.transition = "none";

      card.style.setProperty(
        "--mouse-x",
        `${x}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${y}px`
      );
    });
  };

  const handleFeaturedMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;

    card.style.transform = `
      perspective(1500px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;

    card.style.transition =
      "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
  };

  return (
    <div
      className="cert-section section-container"
      id="certificates"
      ref={sectionRef}
    >
      <div className="cert-container">

        {/* Header */}
        <div className="cert-heading">
          <h2>
            My <span>Certifications</span>
          </h2>

          <p className="cert-heading-sub">
            Professional credentials and practical learning achievements
          </p>
        </div>

        {/* Quick Stats */}
        <div className="cert-stats">

          <div className="cert-stat">
            <FaAward className="cert-stat-icon" />

            <div>
              <strong>2</strong>
              <span>Total</span>
            </div>
          </div>

          <div className="cert-stat">
            <FaGraduationCap className="cert-stat-icon" />

            <div>
              <strong>1</strong>
              <span>Forage</span>
            </div>
          </div>

          <div className="cert-stat">
            <FaAward className="cert-stat-icon" />

            <div>
              <strong>1</strong>
              <span>NTPC Training</span>
            </div>
          </div>

          <div className="cert-stat">
            <HiSparkles className="cert-stat-icon" />

            <div>
              <strong>1</strong>
              <span>Featured</span>
            </div>
          </div>

        </div>

        {/* Featured Certificate */}
        <div
          className="cert-featured"
          onMouseMove={handleFeaturedMouseMove}
          onMouseLeave={handleFeaturedMouseLeave}
        >
          <div className="cert-featured-glow"></div>

          <div className="cert-featured-img">
            <img
              src="/certificates/ntpc-certificate.jpg"
              alt="NTPC Industrial Training Certificate"
            />

            <div className="cert-shine"></div>
          </div>

          <div className="cert-featured-info">

            <div className="cert-badge">
              ⭐ Featured Achievement
            </div>

            <h3>
              Industrial Training at NTPC Limited
            </h3>

            <h4>
              NTPC Limited, Talcher, Kanihan
            </h4>

            <p>
              Successfully completed industrial training from
              2 June 2025 to 2 July 2025. The training focused on
              Image Stylization Using Neural Style Transfer and
              Pre-trained Convolutional Neural Networks.
            </p>

            <div className="cert-tags">

              <span className="cert-tag">
                NTPC
              </span>

              <span className="cert-tag">
                Computer Vision
              </span>

              <span className="cert-tag">
                Neural Style Transfer
              </span>

              <span className="cert-tag">
                Deep Learning
              </span>

            </div>

          </div>
        </div>

        {/* Grid Label */}
        <div className="cert-grid-label">

          <div className="cert-grid-line"></div>

          <span>
            Professional Certifications
          </span>

          <div className="cert-grid-line"></div>

        </div>

        {/* Online Certifications */}
        <div
          className="cert-grid"
          onMouseMove={handleGridMouseMove}
        >

          {onlineCerts.map((cert, index) => (

            <div
              className="cert-card"
              key={index}
            >

              <div className="cert-card-border"></div>

              <div className="cert-card-content">

                <div className="cert-card-top">

                  <div className="cert-card-platform-icon">
                    <PlatformIcon type={cert.icon} />
                  </div>

                  <div className="cert-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                </div>

                <div className="cert-card-body">

                  <h4>
                    {cert.name}
                  </h4>

                  <p>
                    {cert.platform}
                  </p>

                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="cert-card-link"
                >
                  <span>
                    View Credential
                  </span>

                  <MdArrowOutward className="cert-link-icon" />
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default Certificates;