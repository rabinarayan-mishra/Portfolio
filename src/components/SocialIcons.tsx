import {
  FaGithub,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import gsap from "gsap";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    if (!social) return;

    const spans = social.querySelectorAll("span");

    // Pre-calculate all defaults
    const iconData = Array.from(spans).map((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      const rect = elem.getBoundingClientRect();

      const defaultX = rect.width / 2;
      const defaultY = rect.height / 2;

      link.style.setProperty(
        "--siLeft",
        `${defaultX}px`
      );

      link.style.setProperty(
        "--siTop",
        `${defaultY}px`
      );

      return {
        elem,
        link,
        rect,
        defaultX,
        defaultY,
        xTo: gsap.quickTo(
          link,
          "--siLeft",
          {
            duration: 0.3,
            ease: "power3.out",
          }
        ),
        yTo: gsap.quickTo(
          link,
          "--siTop",
          {
            duration: 0.3,
            ease: "power3.out",
          }
        ),
      };
    });

    // Single listener for all icons
    const onMouseMove = (e: MouseEvent) => {
      iconData.forEach(
        ({
          rect,
          defaultX,
          defaultY,
          xTo,
          yTo,
        }) => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (
            x < 40 &&
            x > 10 &&
            y < 40 &&
            y > 5
          ) {
            xTo(x);
            yTo(y);
          } else {
            xTo(defaultX);
            yTo(defaultY);
          }
        }
      );
    };

    document.addEventListener(
      "mousemove",
      onMouseMove
    );

    return () => {
      document.removeEventListener(
        "mousemove",
        onMouseMove
      );
    };
  }, []);

  return (
    <div className="icons-section">
      <div
        className="social-icons"
        id="social"
      >

        {/* GITHUB */}
        <span>
          <a
            href="https://github.com/rabinarayan-mishra"
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </span>

        {/* LINKEDIN */}
        <span>
          <a
            href="https://www.linkedin.com/in/rabi-12bb32371/"
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>

        {/* TELEGRAM */}
        <span>
          <a
            href="https://t.me/Rabinarayano1"
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
            aria-label="Telegram"
          >
            <FaTelegram />
          </a>
        </span>

      </div>

      {/* RESUME BUTTON */}
      <a
        className="resume-button"
        href="/Rabinarayan_Mishra_Resume.pdf"
        target="_blank"
      >
        <HoverLinks text="RESUME" />

        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;